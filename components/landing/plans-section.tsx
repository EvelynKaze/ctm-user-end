"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "$500 - $5,000",
    roi: "142% Daily ROI",
    popular: false,
    features: [
      "Open Ended Bitcoin Mining",
      "Minimum Hashrate",
      "Low Maintenance Fee",
      "Hardware: HashCoins SCRYPT",
      "Automatic payout in BTC",
      "1 year contract",
    ],
    buttonVariant: "outline" as const,
    cardClass: "border-border hover:border-muted-foreground/20 transition-all duration-300",
  },
  {
    name: "Silver",
    icon: Star,
    price: "$5,001 - $50,000",
    roi: "214% Daily ROI",
    popular: true,
    features: [
      "Open Ended Bitcoin Mining",
      "Minimum Hashrate",
      "Low Maintenance Fee",
      "Hardware: HashCoins SCRYPT",
      "Automatic Payout in BTC",
      "1 Year Contract",
    ],
    buttonVariant: "default" as const,
    cardClass: "border-primary shadow-lg shadow-primary/10 scale-105 relative overflow-hidden",
  },
  {
    name: "Gold",
    icon: Crown,
    price: "$50,001 - $100,000",
    roi: "285% Daily ROI",
    popular: false,
    features: [
      "Open Ended Bitcoin Mining",
      "Minimum Hashrate",
      "Low Maintenance Fee",
      "Hardware: HashCoins SCRYPT",
      "Automatic Payout in BTC",
      "2 Year Contract",
    ],
    buttonVariant: "outline" as const,
    cardClass: "border-border hover:border-muted-foreground/20 transition-all duration-300",
  },
]

export function PlansSection() {
  const router = useRouter()
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">
            Our <span className="text-primary">Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the perfect investment plan to maximize your Bitcoin mining returns
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card key={plan.name} className={`relative ${plan.cardClass}`}>
                {plan.popular && (
                  <>
                    {/* Popular badge */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                    {/* Gradient overlay for popular card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-lg" />
                  </>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${plan.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <div className={`text-lg font-semibold ${plan.popular ? "text-primary" : "text-emerald-600"}`}>
                    {plan.roi}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 p-1 rounded-full ${plan.popular ? "bg-primary/10" : "bg-emerald-50 dark:bg-emerald-950"}`}
                        >
                          <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-emerald-600"}`} />
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button variant={plan.buttonVariant} size="lg" className="w-full font-semibold" onClick={() => router.push('/sign-in')}>
                      Start Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Need a custom plan? We&#39;re here to help.</p>
          <Button variant="outline" size="lg">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  )
}
