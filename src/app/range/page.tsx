import Link from 'next/link'
import RangeChart from '@/components/RangeChart'

export default function RangePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
        >
          ← クイズに戻る
        </Link>
        <h1 className="text-xl font-bold">レンジ表（トーナメント用）</h1>
        <a
          href="https://light-three.com/hand-range-yokosawa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors ml-auto"
        >
          元チャートを見る ↗
        </a>
      </div>
      <RangeChart />
    </main>
  )
}
