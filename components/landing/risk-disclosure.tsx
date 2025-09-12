import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RiskDisclosurePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/abstract-financial-charts-pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">Risk Disclosure</span>
          </nav>

          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-500 text-sm font-medium">Legal Information</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Risk <span className="text-yellow-500">Disclosure</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl text-pretty">
            Important information about the risks associated with trading financial instruments on our platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">General Risk Warning</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                Trading in financial instruments carries a high level of risk and may not be suitable for all investors.
                The high degree of leverage can work against you as well as for you. Before deciding to trade financial
                instruments, you should carefully consider your investment objectives, level of experience, and risk
                appetite.
              </p>
              <p className="text-gray-300 text-pretty">
                There is a possibility that you may sustain a loss of some or all of your initial investment and
                therefore you should not invest money that you cannot afford to lose. You should be aware of all the
                risks associated with trading and seek advice from an independent financial advisor if you have any
                doubts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Copy Trading Risks</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Past Performance:</strong> Past performance of any trader is not
                  indicative of future results. Historical returns, expected returns, and probability projections are
                  provided for informational and illustrative purposes only.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Automatic Execution:</strong> Copy trading involves automatic
                  replication of trades. You may not have the opportunity to evaluate each individual trade before it is
                  executed in your account.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Trader Risk:</strong> The performance of copied traders can vary
                  significantly. Even experienced traders can experience substantial losses during certain market
                  conditions.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Technical Risks:</strong> Copy trading relies on technology and
                  internet connectivity. Technical failures, delays, or interruptions may affect the copying process.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Cryptocurrency Trading Risks</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Volatility:</strong> Cryptocurrency markets are highly volatile and can
                  experience rapid price movements. Prices can fluctuate dramatically within short periods.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Regulatory Risk:</strong> Cryptocurrency regulations vary by
                  jurisdiction and are subject to change. Regulatory actions may impact the value and availability of
                  cryptocurrencies.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Technology Risk:</strong> Cryptocurrencies rely on blockchain
                  technology, which may be subject to technical issues, security vulnerabilities, or network congestion.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Liquidity Risk:</strong> Some cryptocurrencies may have limited
                  liquidity, making it difficult to execute trades at desired prices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Forex and CFD Trading Risks</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Leverage Risk:</strong> Trading on margin involves high risk. Leverage
                  can amplify both profits and losses, and you may lose more than your initial investment.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Market Risk:</strong> Currency and CFD prices are influenced by various
                  factors including economic indicators, political events, and market sentiment.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Counterparty Risk:</strong> CFDs are derivative products that involve
                  counterparty risk with the broker or liquidity provider.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Risk Management Recommendations</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-500 mb-3">Before Trading</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Understand the risks involved</li>
                    <li>• Only invest what you can afford to lose</li>
                    <li>• Seek independent financial advice</li>
                    <li>• Start with small amounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-500 mb-3">While Trading</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Monitor your positions regularly</li>
                    <li>• Use stop-loss orders</li>
                    <li>• Diversify your portfolio</li>
                    <li>• Keep emotions in check</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Questions About Trading Risks?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            Our support team is available 24/7 to help you understand the risks and make informed trading decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
