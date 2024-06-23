import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import RootProviders from '@/components/providers/RootProviders'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Budget Tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        className='dark'
        style={{
          colorScheme: 'dark',
        }}
      >
        <body className={inter.className}>
          <RootProviders>{children}</RootProviders>
          <Toaster richColors position='bottom-right' />
        </body>
      </html>
    </ClerkProvider>
  )
}
