import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Decode',
  description: 'Assignment platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className + ' vsc-initialized'}>
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
        {children}
      </body>
    </html>
  )
}
