import * as React from 'react';

import type { Metadata } from 'next'

import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | ProDriver',
    default: 'ProDriver',
  },
  description: 'Projeto ProDriver',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
      </body>
    </html>
  )
}
