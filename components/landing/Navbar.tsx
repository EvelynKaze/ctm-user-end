import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              CopyTradingMarkets
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Traders</Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact Us</Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Log In</Button>
            <Button variant="hero">Sign Up</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;