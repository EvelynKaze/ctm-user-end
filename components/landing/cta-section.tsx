"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { useRouter } from 'next/navigation'

export function CtaSection() {
  const router = useRouter()
  return (
    <section className="py-24 bg-gradient-to-br from-black via-appDark to-appDarkCard relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-appGold100/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-appGold100/10 border border-appGold200/20 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-appGold100" />
            <span className="text-sm font-medium text-appGold100">Trusted by 50,000+ Traders</span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Start Your{" "}
            <span className="text-appGold100">
              Trading Journey
            </span>{" "}
            Today
          </h2>

          {/* Subheading */}
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of successful traders who&#39;ve transformed their financial future with our proven copy trading
            platform. Your success story starts now.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">285%</div>
              <div className="text-sm text-white/60">Average ROI</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-appGold200/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/60">Expert Support</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-appGold200/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$500</div>
              <div className="text-sm text-white/60">Minimum Start</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-appGold100 to-appGold200 hover:from-appGold200 hover:to-appGold300 text-appDarkCard px-8 py-6 text-lg font-semibold group shadow-glow-gold"
              onClick={() => router.push('/sign-in')}
            >
              Start Trading Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
