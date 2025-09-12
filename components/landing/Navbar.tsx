"use client"
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      {/* Crypto Ticker */}
      <div className="bg-muted/30 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8 text-sm">
            <strong className="text-primary">BTC</strong> $43,256.78 
            <span className="text-green-500 ml-2">+2.4%</span>
          </span>
          <span className="mx-8 text-sm">
            <strong className="text-primary">ETH</strong> $2,645.32 
            <span className="text-green-500 ml-2">+5.7%</span>
          </span>
          <span className="mx-8 text-sm">
            <strong className="text-primary">ADA</strong> $0.534 
            <span className="text-red-500 ml-2">-1.2%</span>
          </span>
          <span className="mx-8 text-sm">
            <strong className="text-primary">SOL</strong> $98.45 
            <span className="text-green-500 ml-2">+8.3%</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              CopyTradingMarkets
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/buy-crypto"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Buy Crypto
                </Link>
                <Link
                  href="/copy-trading"
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Copy Trading
                </Link>
              </div>
            </div>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact Us</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="hero">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay (opaque) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex">
          <div className="w-full h-full overflow-auto flex flex-col items-start justify-start p-8 gap-6">
            <div className="w-full flex items-center justify-between">
              <div />
              <button className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">&times;</button>
            </div>
            <nav className="w-full flex flex-col items-start gap-6 mt-6">
              <Link href="/" className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/buy-crypto" className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>Buy Crypto</Link>
              <Link href="/copy-trading" className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>Copy Trading</Link>
              <Link href="/contact" className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            </nav>

            <div className="w-full mt-auto flex flex-col gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="w-full" onClick={() => setMobileMenuOpen(false)}>Log In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="hero" className="w-full" onClick={() => setMobileMenuOpen(false)}>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;