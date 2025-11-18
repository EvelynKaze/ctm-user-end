import { TrendingUp, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/copy-trading" className="text-slate-400 hover:text-white transition-colors">Copy Trading</Link>
              </li>
              <li>
                <Link href="/stock-trading" className="text-slate-400 hover:text-white transition-colors">Stock Trading</Link>
              </li>
              <li>
                <Link href="/crypto-trading" className="text-slate-400 hover:text-white transition-colors">Crypto Trading</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+19704458920" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +1 (970) 445-8920
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                CopyTradingMarkets
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-4 text-left md:text-right max-w-xs">
              Empowering traders worldwide with intelligent copy trading solutions.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2025 CopyTradingMarkets. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/risk-disclosure" className="text-sm text-slate-400 hover:text-white transition-colors">Risk Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
