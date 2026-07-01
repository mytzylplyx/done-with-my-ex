import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Done With My Ex — Your freedom has a date',
  description:
    "A payer's-side money-and-sanity tracker: a freedom countdown to the day the obligation ends, plus payment logging and proof export. Not legal, financial, or tax advice.",
  openGraph: {
    title: 'Done With My Ex — Your freedom has a date',
    description: 'Count down to your last payment. Log it. Prove it.',
    type: 'website',
  },
  icons: { icon: '/assets/crow-cut.png' },
}

export const viewport: Viewport = {
  themeColor: '#07080d',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
