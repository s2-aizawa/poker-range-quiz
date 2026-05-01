'use client'

import { RANKS, HAND_LEVELS, LEVEL_INFO, getHandForGrid } from '@/data/ranges'
import { useState } from 'react'

export default function RangeChart() {
  const [hoveredHand, setHoveredHand] = useState<string | null>(null)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(LEVEL_INFO).map(([level, info]) => (
            <div key={level} className={`px-2 py-1 rounded text-xs font-bold ${info.bgClass} ${info.textClass} ${info.borderClass ?? ''}`}>
              {level}: {info.description}
            </div>
          ))}
        </div>

        {/* Hovered hand info */}
        <div className="h-6 mb-2 text-sm font-mono text-gray-300">
          {hoveredHand && (
            <span>
              {hoveredHand} → レベル {HAND_LEVELS[hoveredHand]}: {LEVEL_INFO[HAND_LEVELS[hoveredHand]]?.description}
            </span>
          )}
        </div>

        {/* Grid */}
        <div className="inline-grid" style={{ gridTemplateColumns: `repeat(14, minmax(0, 1fr))` }}>
          {/* Header row */}
          <div className="w-8 h-8" />
          {RANKS.map((r) => (
            <div key={r} className="w-10 h-8 flex items-center justify-center text-xs font-bold text-gray-300">
              {r}
            </div>
          ))}

          {/* Data rows */}
          {RANKS.map((rowRank, row) => (
            <>
              <div key={`row-${row}`} className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-300">
                {rowRank}
              </div>
              {RANKS.map((_, col) => {
                const hand = getHandForGrid(row, col)
                const level = HAND_LEVELS[hand] ?? 9
                const info = LEVEL_INFO[level]
                return (
                  <div
                    key={`${row}-${col}`}
                    onMouseEnter={() => setHoveredHand(hand)}
                    onMouseLeave={() => setHoveredHand(null)}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-bold cursor-default rounded-sm m-px
                      ${info.bgClass} ${info.textClass} ${info.borderClass ?? ''}`}
                    title={`${hand}: レベル${level} ${info.description}`}
                  >
                    {hand}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
