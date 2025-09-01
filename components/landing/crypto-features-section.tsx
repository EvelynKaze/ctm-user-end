"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Bot, PieChart } from "lucide-react"
import AnimatedLine from "./AnimatedLine"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const features = [
  {
    id: "automation",
    title: "Intelligent Automation",
    description: "Let the system work while you focus on what matters. Reliable results optimized for maximum gains and hands-free management that handles the complexity for you.",
    icon: BarChart3,
    image: "/statistics-dark.jpg",
    buttonText: "Learn More"
  },
  {
    id: "stocks",
    title: "Stock Investment",
    description: "Explore diverse stock options and make informed investment choices. Our platform provides you with the tools and insights needed to navigate the stock market confidently.",
    icon: PieChart,
    image: "/stock-options-dark.jpg",
    buttonText: "Discover More"
  },
  {
    id: "bots",
    title: "Advanced Trading Bots",
    description: "Copy other traders easily, or trade automatically with our unique trading AI. Follow price movements and execute strategies with precision.",
    icon: Bot,
    image: "/dashboard-preview-light.jpg",
    buttonText: "Get Started"
  }
];

export default function CryptoFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('crypto-features-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Check if section is in view
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)));
        const newFeatureIndex = Math.min(2, Math.floor(scrollProgress * 3));
        
        if (newFeatureIndex !== activeFeature) {
          setActiveFeature(newFeatureIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeFeature]);

  return (
    <section id="crypto-features-section" className="py-16 px-4 bg-black min-h-screen">
        <div className="my-12 w-full flex justify-center">
            <AnimatedLine />
        </div>
        
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-appGold10 border border-appGold200 rounded-full mb-4">
            <span className="text-appGold100 text-sm font-medium">Tailored for Every Investor</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Effortless Trading, <span className="text-appGold100">Real Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Whether you&#39;re a beginner or an experienced investor, our platform adapts to your needs. Dive into a world
            where your success is guided by expert insights and powerful tools.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = index === activeFeature;
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.5, 
                    scale: isActive ? 1 : 0.95,
                    borderColor: isActive ? "hsl(var(--appGold200))" : "hsl(var(--border))"
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveFeature(index)}
                  className="cursor-pointer"
                >
                  <Card className={`border-2 hover:border-appGold200 transition-all duration-300 bg-gradient-to-br from-card to-appGold10 ${
                    isActive ? 'border-appGold200 shadow-glow-gold' : 'border-border'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-appGold20 rounded-lg">
                          <IconComponent className="w-6 h-6 text-appGold100" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground mb-4">
                            {feature.description}
                          </p>
                          <Button className="bg-appGold100 hover:bg-appGold200 text-appDarkCard">
                            {feature.buttonText}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Image Display - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <div className="bg-gradient-to-br from-card to-appGold10 rounded-2xl p-8 border-2 border-appGold100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-video w-full rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Stats */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border-2 border-appGold200"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-appGold100">25K+</div>
                <div className="text-sm text-muted-foreground">Satisfied Customers</div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-4 border-2 border-appGold200"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-appGold100">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-28 mb-8 inner w-full flex justify-center">
        <AnimatedLine />
      </div>
    </section>
  )
}
