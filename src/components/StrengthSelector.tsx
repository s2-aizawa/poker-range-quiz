import { LEVEL_INFO } from '@/data/ranges'

interface StrengthSelectorProps {
  onSelect: (level: number) => void
  selectedLevel: number | null
  correctLevel: number | null
  answered: boolean
}

export default function StrengthSelector({
  onSelect,
  selectedLevel,
  correctLevel,
  answered,
}: StrengthSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((level) => {
        const info = LEVEL_INFO[level]
        const isSelected = selectedLevel === level
        const isCorrect = correctLevel === level

        let ring = ''
        if (answered) {
          if (isCorrect) ring = 'ring-4 ring-yellow-400 scale-105'
          else if (isSelected && !isCorrect) ring = 'ring-4 ring-red-500 opacity-70'
        }

        return (
          <button
            key={level}
            onClick={() => !answered && onSelect(level)}
            disabled={answered}
            className={`
              rounded-lg py-2 px-1 font-bold text-sm transition-all duration-150
              ${info.bgClass} ${info.textClass} ${info.borderClass ?? ''}
              ${ring}
              ${!answered ? 'hover:brightness-90 active:scale-95 cursor-pointer' : 'cursor-default'}
            `}
          >
            <div className="text-base">{level}</div>
            <div className="text-xs font-normal leading-tight">{info.description}</div>
          </button>
        )
      })}
    </div>
  )
}
