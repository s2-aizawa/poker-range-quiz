import Link from 'next/link'
import RangeChart from '@/components/RangeChart'

export default function RangePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-3">
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/"
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          ← 戻る
        </Link>
        <h1 className="text-base font-bold">レンジ表（トーナメント用）</h1>
        <a
          href="https://light-three.com/hand-range-yokosawa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors ml-auto whitespace-nowrap"
        >
          元チャート ↗
        </a>
      </div>
      <RangeChart />
    </main>
  )
}
