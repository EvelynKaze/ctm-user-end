import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block bg-appGold100/10 border border-appGold200/20 rounded-full px-4 py-2 mb-6">
            <span className="text-appGold100 text-sm font-medium">🏆 Trusted by 50,000+ Traders</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Revolutionizing Trading Through <span className="text-appGold100">Innovation</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto text-pretty">
            At CopyTradingMarkets, we believe everyone deserves access to profitable trading strategies. Our platform
            democratizes financial success by connecting novice traders with proven experts.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-appGold100 mb-2">50K+</div>
              <div className="text-gray-300">Active Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-appGold100 mb-2">$2.5B+</div>
              <div className="text-gray-300">Volume Traded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-appGold100 mb-2">98.7%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-appGold100 mb-2">285%</div>
              <div className="text-gray-300">Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-6 text-pretty">
                Founded in 2020 by a team of experienced traders and fintech innovators, CopyTradingMarkets was born
                from a simple observation: successful trading strategies were locked away in exclusive circles,
                inaccessible to everyday investors.
              </p>
              <p className="text-gray-300 mb-6 text-pretty">
                We set out to change that by creating a transparent, secure platform where expert traders could share
                their strategies and novice traders could benefit from their expertise. Today, we&#39;re proud to be the
                leading copy trading platform, serving over 50,000 active traders worldwide.
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Start Your Journey</Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-appGold100/20 to-appGold200/20 rounded-2xl p-8 backdrop-blur-sm border border-appGold200/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Platform Launch - 2020</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">10,000 Users Milestone - 2021</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">$1B Volume Traded - 2022</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">50,000+ Active Traders - 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              We&#39;re committed to democratizing financial success through innovative technology and transparent trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-appGold100/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Transparency</h3>
                <p className="text-gray-300 text-pretty">
                  Every trade, every strategy, every result is transparent. We believe in complete openness with our
                  community of traders.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-appGold100/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Security</h3>
                <p className="text-gray-300 text-pretty">
                  Your funds and data are protected by bank-level security measures and cutting-edge encryption
                  technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-appGold100/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Innovation</h3>
                <p className="text-gray-300 text-pretty">
                  We continuously innovate to provide the most advanced trading tools and features for our global
                  community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
  <section className="py-20 px-4 bg-gradient-to-r from-appGold100/10 to-appGold200/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of successful traders who have transformed their financial future with our platform.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button className="bg-appGold100 hover:bg-appGold200 text-black font-semibold px-8 py-3">
                Start Trading Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
