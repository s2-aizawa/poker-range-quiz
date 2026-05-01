'use client'

import { useState, useEffect, useCallback } from 'react'
import { ALL_HANDS, HAND_LEVELS } from '@/data/ranges'

interface HandStat {
  correct: number
  wrong: number
  weight: number
}

interface QuizState {
  currentHand: string
  answered: boolean
  selectedLevel: number | null
  stats: Record<string, HandStat>
  totalCorrect: number
  totalAttempts: number
}

const STORAGE_KEY = 'poker-range-quiz-stats'

function loadStats(): Record<string, HandStat> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return {}
}

function saveStats(stats: Record<string, HandStat>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // ignore
  }
}

function initStat(): HandStat {
  return { correct: 0, wrong: 0, weight: 1 }
}

function pickWeightedRandom(stats: Record<string, HandStat>): string {
  const weights = ALL_HANDS.map((h) => stats[h]?.weight ?? 1)
  const total = weights.reduce((a, b) => a + b, 0)
  let rand = Math.random() * total
  for (let i = 0; i < ALL_HANDS.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return ALL_HANDS[i]
  }
  return ALL_HANDS[0]
}

export function useQuiz() {
  const [stats, setStats] = useState<Record<string, HandStat>>({})
  const [currentHand, setCurrentHand] = useState<string>('')
  const [answered, setAnswered] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  useEffect(() => {
    const loaded = loadStats()
    setStats(loaded)
    setCurrentHand(pickWeightedRandom(loaded))
  }, [])

  const answer = useCallback(
    (level: number) => {
      if (answered || !currentHand) return
      const correct = HAND_LEVELS[currentHand] === level
      setSelectedLevel(level)
      setAnswered(true)

      setStats((prev) => {
        const stat = prev[currentHand] ?? initStat()
        const updated: HandStat = correct
          ? { ...stat, correct: stat.correct + 1, weight: Math.max(0.5, stat.weight - 0.5) }
          : { ...stat, wrong: stat.wrong + 1, weight: stat.weight + 2 }
        const next = { ...prev, [currentHand]: updated }
        saveStats(next)
        return next
      })

      setTotalAttempts((n) => n + 1)
      if (correct) setTotalCorrect((n) => n + 1)
    },
    [answered, currentHand]
  )

  const next = useCallback(() => {
    setStats((prev) => {
      setCurrentHand(pickWeightedRandom(prev))
      return prev
    })
    setAnswered(false)
    setSelectedLevel(null)
  }, [])

  const resetStats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setStats({})
    setTotalCorrect(0)
    setTotalAttempts(0)
    setCurrentHand(pickWeightedRandom({}))
    setAnswered(false)
    setSelectedLevel(null)
  }, [])

  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null

  return {
    currentHand,
    answered,
    selectedLevel,
    correctLevel: currentHand ? HAND_LEVELS[currentHand] : null,
    totalCorrect,
    totalAttempts,
    accuracy,
    stats,
    answer,
    next,
    resetStats,
  }
}
