import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, TrendingUp, Shield, Zap, Users, BarChart3 } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" /> */}
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-gold rounded-full opacity-20 animate-float" />
      <div className="absolute top-32 right-20 w-8 h-8 bg-primary rounded-full opacity-30 animate-float delay-1000" />
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-gold rounded-full opacity-15 animate-float delay-2000" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="bg-gradient-gold-subtle border-primary/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              #1 Copy Trading Platform
            </Badge>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Simplify Success,
                <span className="bg-gradient-gold bg-clip-text text-transparent">
                  {" "}Trade Smarter
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master the markets by copying successful traders. Our platform brings 
                innovation and accessibility to crypto investing with secure, transparent, 
                and profitable copy trading solutions.
              </p>
            </div>
            
            {/* Feature Points */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Secure Trading</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Instant Execution</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Expert Traders</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Real-time Analytics</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Copy Trading
                <TrendingUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Volume Traded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98.7%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Dashboard Image */}
            <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-4">
                <Image 
                  src="/trading-dashboard.png" 
                  alt="Trading Dashboard Interface" 
                  className="w-full rounded-lg shadow-lg"
                  width={2000}
                  height={1200}
                />
              </div>
              
              {/* Floating Coin */}
              <div className="absolute -top-2 -right-8">
                <Image 
                  src="/ctm-coin.png"
                  alt="CTM Coin" 
                  className="w-24 h-24 animate-float"
                  width={2000}
                  height={1200}
                />
              </div>
            </Card>
            
            {/* Floating Stats Cards */}
            <Card className="absolute top-8 -left-8 p-4 bg-card/80 backdrop-blur-sm border-primary/20 animate-float delay-500">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">+127.5%</div>
                <div className="text-xs text-muted-foreground">Monthly Gain</div>
              </div>
            </Card>
            
            <Card className="absolute bottom-8 -left-4 p-4 bg-card/80 backdrop-blur-sm border-primary/20 animate-float delay-1000">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">Live</div>
                <div className="text-xs text-muted-foreground">24/7 Trading</div>
              </div>
            </Card>
            
            <Card className="absolute top-1/2 -right-6 p-4 bg-card/80 backdrop-blur-sm border-primary/20 animate-float delay-1500">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">1,234</div>
                <div className="text-xs text-muted-foreground">Successful Copies</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;