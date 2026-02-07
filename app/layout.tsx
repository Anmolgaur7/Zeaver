import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600']
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Zeaver - Luxury Imitation Jewelry',
  description: 'Discover elegant imitation jewelry crafted for the modern aesthetic. Zeaver brings sophistication and style to every occasion.',
  keywords: ['jewelry', 'imitation', 'luxury', 'accessories', 'fashion'],
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
