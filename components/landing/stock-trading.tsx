import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Clock, Users, BarChart3, Target } from "lucide-react"
import Link from "next/link"

export default function StockTradingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gray-600 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-gray-600 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-gray-600 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 border border-gray-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white">Stock Trading</span>
            </div>
          </nav>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">Stock Trading</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Stock Trading</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              A CFD, or Contract for Difference, is a type of financial instrument that allows you to trade on the price
              movements of stocks, regardless of whether prices are rising or falling. The key advantage of a CFD is the
              opportunity to speculate on the price movements of an asset (upwards or downwards) without actually owning
              the underlying asset.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stock trading has been a popular financial pursuit since stocks were first introduced by the Dutch East
              India Company in the 17th century. This is both an efficient and effective type of investment for both
              families and individuals.
            </p>
          </div>

          {/* What Are Stocks Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">What Are Stocks?</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stocks, also commonly referred to as equities or shares, are issued by a public corporation and put up for
              sale. Companies originally used stocks as a way of raising additional capital, and as a way to boost their
              business growth. When the company first puts these stocks up for sale, this is called the Initial Public
              Offering. Once this stage is complete, the shares themselves are then sold on the stock market, which is
              where any stock trading will occur.
            </p>
          </div>

          {/* How Do I Trade Stocks Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">How Do I Trade Stocks?</h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                A stock market is where stocks are traded: where sellers and buyers come to agree on a price.
                Historically, stock exchanges existed in a physical location, and all transactions took place on the
                trading floor. One of the world&#39;s most famous stock markets is the London Stock Exchange (LSE).
              </p>
              <p>
                Yet as technology progresses, so does the stock market. Now we are seeing the rise of virtual stock
                exchanges that are made up of large computer networks with all trades performed electronically.
              </p>
              <p>
                A company&#39;s shares can be traded on the stock market only following its IPO, making this a secondary
                market. The large businesses listed on global stock exchanges do not trade stocks on a frequent basis.
                Stocks can only be purchased from an existing shareholder, not directly from the company. This rule also
                applies in reverse, so when selling your shares, they go to another investor, not back to the
                corporation.
              </p>
              <p>
                The reason traders choose to invest in stock is because the perceived value of a company can vary
                greatly over time. Money can be made or lost, it depends on whether the trader&#39;s perceptions of the
                stock value are in line with the market.
              </p>
              <p>
                Trying to predict the price movements of stocks in the short term is nearly impossible. Generally,
                stocks do tend to appreciate in value in the long term, so many investors choose to have a diverse
                portfolio of stocks that they intend to keep for a long time. Bigger companies pay dividends to their
                shareholders, which is a portion of the company&#39;s profits. The value of the share itself will not impact
                the dividend.
              </p>
              <p>
                In order to trade stocks, there must be a seller and a buyer, as not all traders have the same agenda,
                stocks are bought and sold at different times and for different reasons. Someone may sell their stock
                for profit, others sell it in order to cut losses, and some because they believe the value of the stock
                is about to change either way.
              </p>
            </div>
          </div>

          {/* Risk Assessment Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Stock Trading Risk Assessment</h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                All forms of financial investment carry a level of risk, and stock trading is no different. Even traders
                with decades of experience cannot predict the correct price movements every single time.
              </p>
              <p>
                People use various strategies, but it is important to note that there is no such thing as a failsafe
                strategy. It is also advisable to limit the amount of money you invest in a single trade, as part of
                your own risk management.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {(
              [
                { icon: TrendingUp, title: "Real-Time Trading", desc: "Execute trades instantly with real-time market data and advanced trading tools." },
                { icon: Shield, title: "Secure Platform", desc: "Trade with confidence on our secure, regulated platform with advanced encryption." },
                { icon: BarChart3, title: "Advanced Analytics", desc: "Access comprehensive market analysis and trading insights to make informed decisions." },
                { icon: Clock, title: "24/7 Markets", desc: "Trade global markets around the clock with extended trading hours." },
                { icon: Users, title: "Expert Support", desc: "Get guidance from our team of experienced trading professionals." },
                { icon: Target, title: "Portfolio Management", desc: "Manage your investments with advanced portfolio tracking and risk management tools." },
              ] as const
            ).map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-appGold-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-appGold-700 mb-2">{title}</h4>
                  <p className="text-gray-600">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
