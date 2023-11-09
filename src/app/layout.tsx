import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { NextAuthProvider } from "./provider.js";
import { ClientCookiesProvider } from './provider.js';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Decode',
  description: 'Assignment platform',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' vsc-initialized'}>
        {/* <ClientCookiesProvider> */}
          <NextAuthProvider>
            {/* <div className = "max-w-5xl mx-auto px-8"> */}
              {/* <Navbar /> */}
              {children}
              {/* <div className = "pt-16">{children}</div> */}
            {/* </div> */}
          </NextAuthProvider>
        {/* </ClientCookiesProvider> */}
        
      </body>
    </html>
  )
}
