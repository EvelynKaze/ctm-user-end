import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers";
import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "CopyTradingMarkets",
  description: "Buy and Trade Stocks and the best Copytrade plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <Providers>
            <html lang="en" className="dark">
              <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Script 
                  src="https://www.cryptohopper.com/widgets/js/script"
                  strategy="afterInteractive"
                />
                {children}
                <Toaster />
              </body>
            </html>
      </Providers>
    </ClerkProvider>
  )
}