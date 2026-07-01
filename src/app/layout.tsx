import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter, Oswald, IBM_Plex_Mono, Space_Grotesk, Work_Sans } from 'next/font/google'
import { ThemeSync } from '@/lib/theme/ThemeSync'
import { THEME_INIT_SCRIPT } from '@/lib/theme/tokens'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
})

const fontVars = [inter.variable, oswald.variable, plexMono.variable, spaceGrotesk.variable, workSans.variable].join(' ')

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
  themeColor: '#141210',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  )
}
