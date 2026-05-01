'use client'

import { RANKS, HAND_LEVELS, LEVEL_INFO, getHandForGrid } from '@/data/ranges'
import { useState } from 'react'

const CELL = 26

export default function RangeChart() {
  const [selectedHand, setSelectedHand] = useState<string | null>(null)

  return (
    <div>
      {/* Legend */}
      <div className="grid grid-cols-3 gap-1 mb-2">
        {Object.entries(LEVEL_INFO).map(([level, info]) => (
          <div
            key={level}
            className={`px-1 py-0.5 rounded text-[9px] font-bold text-center ${info.bgClass} ${info.textClass} ${info.borderClass ?? ''}`}
          >
            {level}: {info.description}
          </div>
        ))}
      </div>

      {/* Selected hand info */}
      <div className="h-5 mb-1 text-[11px] font-mono text-center text-gray-300">
        {selectedHand
          ? `${selectedHand} → Lv${HAND_LEVELS[selectedHand]}: ${LEVEL_INFO[HAND_LEVELS[selectedHand]]?.description}`
          : 'セルをタップ → ハンド情報'}
      </div>

      {/* Grid */}
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: `repeat(13, ${CELL}px)` }}
      >
        {/* Data rows */}
        {RANKS.map((_, row) => (
          <>
            {RANKS.map((_, col) => {
              const hand = getHandForGrid(row, col)
              const level = HAND_LEVELS[hand] ?? 9
              const info = LEVEL_INFO[level]
              const isSelected = selectedHand === hand
              return (
                <div
                  key={`${row}-${col}`}
                  onClick={() => setSelectedHand(isSelected ? null : hand)}
                  style={{ width: CELL, height: CELL }}
                  className={`flex items-center justify-center text-[7px] font-bold cursor-pointer rounded-sm
                    ${info.bgClass} ${info.textClass} ${info.borderClass ?? ''}
                    ${isSelected ? 'ring-2 ring-yellow-400 z-10 relative' : ''}`}
                >
                  {hand}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
