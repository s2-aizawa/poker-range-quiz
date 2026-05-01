'use client'

import Link from 'next/link'
import HandDisplay from '@/components/HandDisplay'
import StrengthSelector from '@/components/StrengthSelector'
import ScoreBoard from '@/components/ScoreBoard'
import { useQuiz } from '@/hooks/useQuiz'
import { LEVEL_INFO } from '@/data/ranges'

export default function QuizPage() {
  const { currentHand, answered, selectedLevel, correctLevel, totalCorrect, totalAttempts, accuracy, answer, next, resetStats } = useQuiz()

  const isCorrect = answered && selectedLevel === correctLevel

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">

        {/* Header */}
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-bold">ポーカーレンジクイズ</h1>
          <Link
            href="/range"
            className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
          >
            レンジ表を見る
          </Link>
        </div>

        {/* ScoreBoard */}
        <ScoreBoard
          totalCorrect={totalCorrect}
          totalAttempts={totalAttempts}
          accuracy={accuracy}
          onReset={resetStats}
        />

        {/* Hand Display */}
        <div className="bg-gray-800 rounded-2xl p-8 w-full flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">このハンドのレベルは？</p>
          <HandDisplay hand={currentHand} />
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`w-full rounded-xl p-4 text-center font-bold text-lg transition-all ${isCorrect ? 'bg-green-700' : 'bg-red-700'}`}>
            {isCorrect ? '正解！' : '不正解'}
            <div className="text-base font-normal mt-1">
              正解: <span className="font-bold">レベル {correctLevel}</span>
              {correctLevel && (
                <span className={`ml-2 px-2 py-0.5 rounded text-sm ${LEVEL_INFO[correctLevel].bgClass} ${LEVEL_INFO[correctLevel].textClass} ${LEVEL_INFO[correctLevel].borderClass ?? ''}`}>
                  {LEVEL_INFO[correctLevel].description}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Selector */}
        <StrengthSelector
          onSelect={answer}
          selectedLevel={selectedLevel}
          correctLevel={correctLevel}
          answered={answered}
        />

        {/* Next button */}
        {answered && (
          <button
            onClick={next}
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors"
          >
            次のハンド →
          </button>
        )}
      </div>
    </main>
  )
}
