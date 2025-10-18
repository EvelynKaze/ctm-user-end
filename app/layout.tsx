import { type Metadata } from 'next'
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
      <Providers>
        <html lang="en" className="dark">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Script 
              src="https://www.cryptohopper.com/widgets/js/script"
              strategy="afterInteractive"
            />
            {/* Smartsupp live chat: init + loader (appears bottom-right after hydration) */}
            <Script
              id="smartsupp-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: `var _smartsupp = _smartsupp || {}; _smartsupp.key = 'baee3d42aec88f6c4bed4fee58ffe2b1b764ec55';` }}
            />
            <Script
              src="https://www.smartsuppchat.com/loader.js?"
              strategy="afterInteractive"
            />
            {children}
            <Toaster />
            <noscript>
              Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
            </noscript>
          </body>
        </html>
      </Providers>
  )
}