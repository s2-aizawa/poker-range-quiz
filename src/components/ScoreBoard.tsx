interface ScoreBoardProps {
  totalCorrect: number
  totalAttempts: number
  accuracy: number | null
  onReset: () => void
}

export default function ScoreBoard({ totalCorrect, totalAttempts, accuracy, onReset }: ScoreBoardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-2 text-white w-full max-w-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">スコア</span>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-white underline"
        >
          リセット
        </button>
      </div>
      <div className="flex justify-around">
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">{totalCorrect}</div>
          <div className="text-xs text-gray-400">正解</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{totalAttempts}</div>
          <div className="text-xs text-gray-400">出題数</div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold ${accuracy !== null && accuracy >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
            {accuracy !== null ? `${accuracy}%` : '---'}
          </div>
          <div className="text-xs text-gray-400">正答率</div>
        </div>
      </div>
    </div>
  )
}
