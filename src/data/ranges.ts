export interface LevelInfo {
  description: string
  bgClass: string
  textClass: string
  borderClass?: string
}

export const LEVEL_INFO: Record<number, LevelInfo> = {
  1: { description: '8人(強)', bgClass: 'bg-blue-950', textClass: 'text-white' },
  2: { description: '8人(中)', bgClass: 'bg-red-700', textClass: 'text-white' },
  3: { description: '8人(弱)', bgClass: 'bg-orange-500', textClass: 'text-white' },
  4: { description: '6〜7人', bgClass: 'bg-green-600', textClass: 'text-white' },
  5: { description: '4〜5人', bgClass: 'bg-cyan-400', textClass: 'text-gray-900' },
  6: { description: '3人', bgClass: 'bg-white', textClass: 'text-gray-800', borderClass: 'border border-gray-400' },
  7: { description: '2人', bgClass: 'bg-purple-300', textClass: 'text-gray-900' },
  8: { description: 'BBのみ(BTNコール)', bgClass: 'bg-pink-300', textClass: 'text-gray-800' },
  9: { description: 'フォールド', bgClass: 'bg-gray-400', textClass: 'text-white' },
}

// ※ 画像(c世界のヨコサワ トーナメント用チャート)から読み取った値
// 修正は HAND_LEVELS の数値(1-9)を変えてください
export const HAND_LEVELS: Record<string, number> = {
  // --- Pocket Pairs ---
  AA: 1, KK: 1, QQ: 1, JJ: 2, TT: 2,
  '99': 2, '88': 3, '77': 3, '66': 4,
  '55': 4, '44': 5, '33': 5, '22': 5,

  // --- Suited Aces ---
  AKs: 1, AQs: 2, AJs: 2, ATs: 2,
  A9s: 4, A8s: 4, A7s: 4, A6s: 4,
  A5s: 4, A4s: 4, A3s: 4, A2s: 4,

  // --- Offsuit Aces ---
  AKo: 1, AQo: 2, AJo: 3, ATo: 4,
  A9o: 5, A8o: 6, A7o: 6, A6o: 7,
  A5o: 8, A4o: 8, A3o: 8, A2o: 8,

  // --- Suited Kings ---
  KQs: 2, KJs: 3, KTs: 4, K9s: 4,
  K8s: 6, K7s: 6, K6s: 6, K5s: 6,
  K4s: 6, K3s: 6, K2s: 6,

  // --- Offsuit Kings ---
  KQo: 3, KJo: 4, KTo: 5, K9o: 6,
  K8o: 8, K7o: 8, K6o: 8, K5o: 8,
  K4o: 9, K3o: 9, K2o: 9,

  // --- Suited Queens ---
  QJs: 3, QTs: 4, Q9s: 5,
  Q8s: 6, Q7s: 6, Q6s: 6, Q5s: 7,
  Q4s: 7, Q3s: 7, Q2s: 7,

  // --- Offsuit Queens ---
  QJo: 5, QTo: 6, Q9o: 6,
  Q8o: 8, Q7o: 8, Q6o: 9, Q5o: 9,
  Q4o: 9, Q3o: 9, Q2o: 9,

  // --- Suited Jacks ---
  JTs: 3, J9s: 5, J8s: 6,
  J7s: 6, J6s: 7, J5s: 8, J4s: 8,
  J3s: 8, J2s: 8,

  // --- Offsuit Jacks ---
  JTo: 5, J9o: 6, J8o: 8,
  J7o: 9, J6o: 9, J5o: 9, J4o: 9,
  J3o: 9, J2o: 9,

  // --- Suited Tens ---
  T9s: 4, T8s: 5, T7s: 7,
  T6s: 8, T5s: 8, T4s: 8, T3s: 8, T2s: 9,

  // --- Offsuit Tens ---
  T9o: 6, T8o: 8, T7o: 9,
  T6o: 9, T5o: 9, T4o: 9, T3o: 9, T2o: 9,

  // --- Suited Nines ---
  '98s': 5, '97s': 6, '96s': 7,
  '95s': 8, '94s': 9, '93s': 9, '92s': 9,

  // --- Offsuit Nines ---
  '98o': 7, '97o': 8, '96o': 9,
  '95o': 9, '94o': 9, '93o': 9, '92o': 9,

  // --- Suited Eights ---
  '87s': 6, '86s': 7, '85s': 8,
  '84s': 9, '83s': 9, '82s': 9,

  // --- Offsuit Eights ---
  '87o': 8, '86o': 9, '85o': 9,
  '84o': 9, '83o': 9, '82o': 9,

  // --- Suited Sevens ---
  '76s': 6, '75s': 7, '74s': 8, '73s': 9, '72s': 9,

  // --- Offsuit Sevens ---
  '76o': 9, '75o': 9, '74o': 9, '73o': 9, '72o': 9,

  // --- Suited Sixes ---
  '65s': 6, '64s': 7, '63s': 8, '62s': 9,

  // --- Offsuit Sixes ---
  '65o': 9, '64o': 9, '63o': 9, '62o': 9,

  // --- Suited Fives ---
  '54s': 7, '53s': 8, '52s': 9,

  // --- Offsuit Fives ---
  '54o': 9, '53o': 9, '52o': 9,

  // --- Suited Fours ---
  '43s': 8, '42s': 9,

  // --- Offsuit Fours ---
  '43o': 9, '42o': 9,

  // --- Suited/Offsuit Threes & Twos ---
  '32s': 9, '32o': 9,
}

export const ALL_HANDS = Object.keys(HAND_LEVELS)

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

export function getHandForGrid(row: number, col: number): string {
  const r1 = RANKS[row]
  const r2 = RANKS[col]
  if (row === col) return r1 + r2
  if (row < col) return r1 + r2 + 's'
  return r2 + r1 + 'o'
}
