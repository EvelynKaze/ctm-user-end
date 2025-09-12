import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Clock, BarChart3, Coins, Zap } from "lucide-react"

export default function CryptoTradingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8">
            <nav className="text-sm">
              <span className="text-yellow-500">Home</span>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-white">Crypto Trading</span>
            </nav>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Crypto Trading</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Crypto Trading</h2>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <p className="text-lg leading-relaxed">
              Digiminersol is excited to announce the launch of our new cryptocurrency trading platform. Now you can
              start trading Bitcoin, Ethereum and many more cryptocurrencies quickly, easily and safely from wherever
              you are — in just seconds. You get great margin trading and short sell options with fast deposits and
              withdrawals. Our support team is available 24/7/365 to help get you trading on our CySEC-regulated
              platform with a trading volume of US $10 billion monthly.
            </p>

            <div className="my-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is a crypto currency?</h3>
              <p className="leading-relaxed">
                A cryptocurrency like bitcoin is a virtual currency traded peer-to-peer on a blockchain, independent of
                centralized authorities like banks and governments. Cryptocurrencies are entirely virtual, so they are
                not backed by physical commodities and have no intrinsic value.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Do Cryptocurrencies Work?</h3>
              <p className="leading-relaxed">
                Primarily, cryptocurrencies rely on blockchain technology to complete a transaction via an intricate P2P
                network. Once a transfer request is entered into the network, it is validated by the network and added
                to a pool of other transactions to create a block of data for the ledger, which is then entered into the
                existing blockchain. Once the block is successfully added to the chain, the transaction is approved and
                completed.
              </p>
            </div>

            <div className="my-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Are There Investment Opportunities with Cryptocurrencies?
              </h3>
              <p className="leading-relaxed">
                Absolutely. Cryptocurrencies have become established investment commodities among major financial
                institutions and have even been adopted by countries such as Australia and Japan. As with any investment
                though, there are risks linked to market movements, high volatility and economics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Crypto Trading Platform?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">CySEC Regulated</h4>
                <p className="text-gray-600">
                  Trade with confidence on our fully regulated platform with institutional-grade security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h4>
                <p className="text-gray-600">
                  Our expert support team is available around the clock to assist with your trading needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Fast Execution</h4>
                <p className="text-gray-600">
                  Execute trades in seconds with our high-performance trading infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trading Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Advanced Trading Features</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Margin Trading</h4>
                    <p className="text-gray-600">
                      Amplify your trading potential with competitive margin rates and flexible leverage options.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Short Selling</h4>
                    <p className="text-gray-600">
                      Profit from falling markets with our comprehensive short selling capabilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Coins className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Multiple Cryptocurrencies</h4>
                    <p className="text-gray-600">
                      Trade Bitcoin, Ethereum, and dozens of other popular cryptocurrencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Trading Volume</h4>
              <div className="text-4xl font-bold text-yellow-500 mb-2">$10B+</div>
              <p className="text-gray-300 mb-6">Monthly trading volume on our platform</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-yellow-500 font-semibold">50K+</div>
                  <div className="text-gray-400">Active Traders</div>
                </div>
                <div>
                  <div className="text-yellow-500 font-semibold">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
