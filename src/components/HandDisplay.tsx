interface CardProps {
  rank: string
  suit: '♠' | '♥' | '♦' | '♣'
}

function Card({ rank, suit }: CardProps) {
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div className="w-16 h-24 rounded-xl border-2 border-gray-300 bg-white shadow-xl flex flex-col items-center justify-center gap-0.5 select-none">
      <span className={`text-3xl font-bold ${isRed ? 'text-red-600' : 'text-gray-900'}`}>{rank}</span>
      <span className={`text-2xl leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>{suit}</span>
    </div>
  )
}

interface HandDisplayProps {
  hand: string
}

export default function HandDisplay({ hand }: HandDisplayProps) {
  if (!hand) return null

  const isPair = hand.length === 2 && hand[0] === hand[1]
  const isSuited = hand.endsWith('s')

  let rank1: string
  let rank2: string

  if (isPair) {
    rank1 = hand[0]
    rank2 = hand[1]
  } else {
    rank1 = hand[0]
    rank2 = hand[1]
  }

  const suit1: '♠' | '♥' | '♦' | '♣' = '♠'
  const suit2: '♠' | '♥' | '♦' | '♣' = isPair ? '♥' : isSuited ? '♠' : '♥'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-3">
        <Card rank={rank1} suit={suit1} />
        <Card rank={rank2} suit={suit2} />
      </div>
      <div className="text-xl font-bold text-gray-700">
        {hand}
        <span className="ml-2 text-sm font-normal text-gray-400">
          {isPair ? 'ペア' : isSuited ? 'スーテッド' : 'オフスート'}
        </span>
      </div>
    </div>
  )
}
