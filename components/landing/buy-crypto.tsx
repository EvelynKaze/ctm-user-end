import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BuyCryptoPage() {
  const providers = [
    {
      name: "Bitso",
  description: "Leading cryptocurrency exchange in Latin America",
  url: "https://bitso.com",
      features: ["Low fees", "Fast transactions", "24/7 support"],
    },
    {
      name: "Paxful",
  description: "Global peer-to-peer Bitcoin marketplace",
  url: "https://paxful.com",
      features: ["300+ payment methods", "Escrow protection", "Global reach"],
    },
    {
      name: "Coinbase",
  description: "Trusted cryptocurrency platform worldwide",
  url: "https://www.coinbase.com",
      features: ["Secure storage", "Easy to use", "Regulated platform"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Breadcrumb */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-appGold-500/20 rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-appGold-500/20 rotate-12"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-appGold-500/20 rotate-45"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-primary hover:text-appGold-400 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white">Buy Crypto</span>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-pretty">Buy Crypto</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Buy Crypto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Buy bitcoin, ethereum, and other crypto currencies for account funding from third parties.
            </p>
          </div>

          {/* Provider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {providers.map((provider, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-pretty">{provider.description}</p>
                  <ul className="space-y-2 mb-8">
                    {provider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-appGold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={provider.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-appGold-500 hover:bg-appGold-600 text-black font-semibold">
                      Buy with {provider.name}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Buy Crypto with CopyTradingMarkets?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-appGold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure & Safe</h4>
                  <p className="text-gray-600 text-sm">All transactions are protected with bank-level security</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-appGold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Instant Funding</h4>
                  <p className="text-gray-600 text-sm">Fund your trading account instantly with crypto purchases</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-appGold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Get help anytime with our dedicated support team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
