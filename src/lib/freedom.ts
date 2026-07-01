/**
 * Freedom math — a faithful TypeScript port of the `renderVals()` logic from
 * the Claude Design canvas (DoneWithMyEx Desktop.dc.html). Every progress
 * visual (countdown, bar, donut, %) is driven from this single source of
 * truth so they stay mathematically consistent.
 */

export type Layout = 'mission' | 'cinematic' | 'editorial'
export type Route = 'dashboard' | 'countdown' | 'logger' | 'vault'
export type CStyle = 'flip' | 'straight' | 'minimal'
export type CMode = 'straight' | 'humor' | 'nerd'
export type LogType = 'alimony' | 'child_support'

export interface LoggedItem {
  id: string
  type: string
  isCS: boolean
  amount: string
  when: string
  receipt: boolean
}

export interface FreedomProps {
  /** Monthly obligation amount in USD. */
  monthlyAmount: number
  /** ISO date the parole window opened. */
  paroleStart: string
  /** ISO date the last payment lands. */
  paroleEnd: string
}

export const DEFAULT_PROPS: FreedomProps = {
  monthlyAmount: 2400,
  paroleStart: '2025-08-01',
  paroleEnd: '2028-06-22',
}

export interface PaymentRow {
  id: string
  type: string
  isCS: boolean
  amount: string
  when: string
  receipt: boolean
  dot: string
  receiptText: string
  recClr: string
}

export interface UnitCard {
  name: string
  sub: string
  count: string
}

export interface StatementRow {
  when: string
  type: string
  amount: string
  rec: string
  recClr: string
}

export interface ReceiptCard {
  when: string
  amount: string
}

export interface FreedomVals {
  // progress / countdown
  pctText: string
  pctWidth: string
  pct: number
  daysToGo: string
  daysServed: string
  humanLine: string
  donutCirc: string
  donutOffset: string
  endLabel: string
  // flip-clock digits
  yy: string
  mm: string
  dd: string
  hh: string
  mi: string
  ss: string
  straightStr: string
  // ledger
  paidSoFar: string
  leftToPay: string
  dailyCost: string
  nextPay: string
  nextAmount: string
  onTrackText: string
  payments: PaymentRow[]
  payCount: string
  // unit modes
  humor: UnitCard[]
  nerd: UnitCard[]
  // logger
  logAmount: string
  logMonth: string
  logTypeLabel: string
  // vault
  statementRows: StatementRow[]
  statementTotal: string
  statementRange: string
  statementCount: string
  receipts: ReceiptCard[]
  receiptCount: string
  // chrome
  routeTitle: string
  routeSub: string
}

const DAY = 86400000

function pad2(n: number): string {
  n = Math.max(0, Math.floor(n))
  return String(n).padStart(2, '0')
}

function sup(s: string): string {
  const m: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
  }
  return String(s).split('').map((c) => m[c] || '').join('')
}

function fmtCount(n: number): string {
  if (!isFinite(n)) return '∞'
  if (n >= 1e12) {
    const e = n.toExponential(2).split('e')
    return e[0] + ' × 10' + sup(String(parseInt(e[1], 10)))
  }
  if (n >= 1000) return Math.round(n).toLocaleString('en-US')
  if (n >= 100) return String(Math.round(n))
  return (Math.round(n * 10) / 10).toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

function plural(n: number, w: string): string {
  return n + ' ' + w + (n === 1 ? '' : 's')
}

interface Breakdown {
  years: number
  months: number
  days: number
  hours: number
  mins: number
  secs: number
}

function breakdown(fromMs: number, toMs: number): Breakdown {
  const from = new Date(fromMs)
  const to = new Date(toMs)
  if (to <= from) return { years: 0, months: 0, days: 0, hours: 0, mins: 0, secs: 0 }
  let years = to.getFullYear() - from.getFullYear()
  let months = to.getMonth() - from.getMonth()
  let days = to.getDate() - from.getDate()
  let hours = to.getHours() - from.getHours()
  let mins = to.getMinutes() - from.getMinutes()
  let secs = to.getSeconds() - from.getSeconds()
  if (secs < 0) { secs += 60; mins-- }
  if (mins < 0) { mins += 60; hours-- }
  if (hours < 0) { hours += 24; days-- }
  if (days < 0) {
    const pm = new Date(to.getFullYear(), to.getMonth(), 0).getDate()
    days += pm
    months--
  }
  if (months < 0) { months += 12; years-- }
  return { years, months, days, hours, mins, secs }
}

function parseStart(props: FreedomProps): number {
  const d = new Date(props.paroleStart || '2025-08-01')
  return isNaN(d.getTime()) ? new Date(2025, 7, 1).getTime() : d.getTime()
}

function parseEnd(props: FreedomProps): number {
  const d = new Date(props.paroleEnd || '2028-06-22')
  return isNaN(d.getTime()) ? new Date(2028, 5, 22).getTime() : d.getTime()
}

function parseAmount(props: FreedomProps): number {
  const a = Number(props.monthlyAmount)
  return isFinite(a) && a > 0 ? a : 2400
}

interface ComputeState {
  route: Route
  logType: LogType
  logged: LoggedItem[]
  now: number
}

export function computeFreedom(props: FreedomProps, state: ComputeState): FreedomVals {
  const { route, logType, now } = state
  const START = parseStart(props)
  const END = parseEnd(props)
  const AMT = parseAmount(props)
  const total = END - START
  const elapsed = Math.min(Math.max(now - START, 0), total)
  const remainMs = Math.max(END - now, 0)
  const pct = total > 0 ? (elapsed / total) * 100 : 0
  const pctR = Math.round(pct * 10) / 10
  const daysToGo = Math.ceil(remainMs / DAY)
  const daysServed = Math.floor(elapsed / DAY)
  const bd = breakdown(now, END)
  const remainSec = remainMs / 1000

  const humorRaw: Array<[string, string, number]> = [
    ['Stairways to Heaven', 'back-to-back, no parole', 482],
    ['Taco Tuesdays', 'the one weekly commitment that shows up', 604800],
    ['Oppenheimers', 'three hours you never get back', 10800],
    ['Solar Cycles', 'one sunrise closer to freedom', 86400],
    ['Snooze Buttons', 'nine more minutes of denial', 540],
    ['Therapy Sessions', 'still cheaper than the lawyer', 604800],
    ['Guilt Trips', 'one a day, unprompted', 86400],
    ['Tinder Left-Swipes', 'better odds than the marriage', 2],
  ]
  const nerdRaw: Array<[string, string, number]> = [
    ['Fortnights', '14 days each', 1209600],
    ['Lunar Months', '29.53 days each', 2551443],
    ['Martian Years', '686.98 sols each', 59355072],
    ['Dog Years', '7× human years', 4508229],
    ['Olympiads', 'every 4 years', 126230400],
    ['Heartbeats', '~70 bpm', 0.857143],
    ['Microfortnights', '1.2096 s each', 1.2096],
    ['Nanoseconds', '1 billionth of a sec', 1e-9],
  ]
  const mk = (arr: Array<[string, string, number]>): UnitCard[] =>
    arr.map(([name, sub, sec]) => ({ name, sub, count: fmtCount(remainSec / sec) }))

  const avgMonth = 2629800000
  const monthsTotal = Math.round(total / avgMonth)
  const paymentsMade = Math.max(0, Math.floor(elapsed / avgMonth))
  const paidSoFar = paymentsMade * AMT
  const leftToPay = Math.max(0, monthsTotal - paymentsMade) * AMT
  const dailyCost = (AMT * 12) / 365
  const fmtUSD = (n: number): string => '$' + Math.round(n).toLocaleString('en-US')
  const circ = 2 * Math.PI * 52
  const nowD = new Date(now)
  const endLabel = new Date(END).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const logMonth = nowD.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const logTypeLabel = logType === 'child_support' ? 'Child support' : 'Spousal support'

  const histPattern: Array<[string, boolean, number]> = [
    ['Spousal support', false, AMT],
    ['Spousal support', false, AMT],
    ['Child support', true, Math.round(AMT / 3)],
    ['Spousal support', false, AMT],
    ['Spousal support', false, AMT],
    ['Spousal support', false, AMT],
  ]
  const demoPays = histPattern.map((p, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - (i + 1), 1)
    return {
      id: 'd' + i,
      type: p[0],
      isCS: p[1],
      amount: fmtUSD(p[2]),
      when: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      receipt: i !== 4,
    }
  })
  const allPays: PaymentRow[] = state.logged.concat(demoPays).map((u) => ({
    ...u,
    dot: u.isCS ? '#97F7F6' : '#FFC107',
    receiptText: u.receipt ? 'Receipt attached' : 'Receipt pending',
    recClr: u.receipt ? 'rgba(151,247,246,.85)' : 'rgba(221,225,255,.4)',
  }))

  const stRowsRaw = histPattern.slice(0, 5).map((p, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - (i + 1), 1)
    return {
      when: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      type: p[0],
      amt: p[2],
      receipt: i !== 4,
    }
  })
  const stTotal = stRowsRaw.reduce((s, r) => s + r.amt, 0)
  const statementRows: StatementRow[] = stRowsRaw.map((r) => ({
    when: r.when,
    type: r.type,
    amount: fmtUSD(r.amt),
    rec: r.receipt ? '✓' : '—',
    recClr: r.receipt ? '#0e8a6b' : '#b9b2a0',
  }))
  const statementRange = stRowsRaw.length
    ? stRowsRaw[stRowsRaw.length - 1].when + ' – ' + stRowsRaw[0].when
    : ''
  const receipts: ReceiptCard[] = demoPays
    .filter((p) => p.receipt)
    .map((p) => ({ when: p.when.split(' ')[0].toUpperCase(), amount: p.amount }))
  const nextD = new Date(nowD.getFullYear(), nowD.getMonth() + 1, 1)
  const nextPay = nextD.toLocaleString('en-US', { month: 'long', day: 'numeric' })

  const titles: Record<Route, string> = {
    dashboard: 'Your freedom plan',
    countdown: 'Freedom Countdown',
    logger: 'Payment Logger',
    vault: 'Proof Vault',
  }
  const subs: Record<Route, string> = {
    dashboard: nowD.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    countdown: 'The sentence ends ' + endLabel,
    logger: 'Log it. Prove it.',
    vault: 'Your proof, on paper.',
  }

  return {
    pctText: pctR.toFixed(1) + '%',
    pctWidth: pct.toFixed(2) + '%',
    pct,
    daysToGo: daysToGo.toLocaleString('en-US'),
    daysServed: daysServed.toLocaleString('en-US'),
    humanLine:
      plural(bd.years, 'year') + '  ·  ' + plural(bd.months, 'month') + '  ·  ' + plural(bd.days, 'day'),
    donutCirc: circ.toFixed(1),
    donutOffset: (circ * (1 - pct / 100)).toFixed(1),
    endLabel,

    yy: pad2(bd.years), mm: pad2(bd.months), dd: pad2(bd.days),
    hh: pad2(bd.hours), mi: pad2(bd.mins), ss: pad2(bd.secs),
    straightStr: [bd.years, bd.months, bd.days, bd.hours, bd.mins, bd.secs].map((n) => pad2(n)).join(':'),

    paidSoFar: fmtUSD(paidSoFar),
    leftToPay: fmtUSD(leftToPay),
    dailyCost: '$' + (Math.round(dailyCost * 100) / 100).toFixed(2),
    nextPay,
    nextAmount: fmtUSD(AMT),
    onTrackText: 'On track',
    payments: allPays,
    payCount: allPays.length + ' on record',

    humor: mk(humorRaw),
    nerd: mk(nerdRaw),

    logAmount: fmtUSD(AMT),
    logMonth,
    logTypeLabel,

    statementRows,
    statementTotal: fmtUSD(stTotal),
    statementRange,
    statementCount: stRowsRaw.length + ' payments',
    receipts,
    receiptCount: receipts.length + ' receipts',

    routeTitle: titles[route] || '',
    routeSub: subs[route] || '',
  }
}
