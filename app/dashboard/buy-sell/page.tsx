import { PlatformCard } from "@/components/platform-card"

const platforms = [
  {
    id: "1",
    name: "Binance",
    description:
      "The world's largest cryptocurrency exchange by trading volume. Offers spot trading, futures, and staking.",
    url: "https://www.binance.com",
    logo: "/buy-sell/Binance.svg",
  },
  {
    id: "2",
    name: "Coinbase",
    description:
      "User-friendly exchange perfect for beginners. Regulated and secure with a wide selection of cryptocurrencies.",
    url: "https://www.coinbase.com",
    logo: "/buy-sell/Coinbase.svg",
  },
  {
    id: "3",
    name: "Kraken",
    description:
      "Advanced trading platform with strong security features. Ideal for experienced traders and institutional investors.",
    url: "https://www.kraken.com",
    logo: "/buy-sell/kraken.svg",
  },
  {
    id: "4",
    name: "Bybit",
    description:
      "Leading derivatives exchange with up to 100x leverage. Fast execution and competitive fees for active traders.",
    url: "https://www.bybit.com",
    logo: "/buy-sell/bybit.svg",
  },
  {
    id: "5",
    name: "OKX",
    description:
      "Global crypto exchange with spot, futures, and options trading. Advanced tools for professional traders.",
    url: "https://www.okx.com",
    logo: "/buy-sell/okx.svg",
  },
  {
    id: "6",
    name: "Huobi",
    description:
      "Established exchange with strong liquidity and diverse trading pairs. Supports multiple fiat currencies.",
    url: "https://www.htx.com",
    logo: "/buy-sell/huobi.svg",
  },
  {
    id: "7",
    name: "KuCoin",
    description: "Community-driven exchange with innovative features and low trading fees. Great for altcoin trading.",
    url: "https://www.kucoin.com",
    logo: "/buy-sell/kucoin.svg",
  },
]

export default function BuySellPage() {
  return (
    <main className="min-h-full">
      <header className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Buy & Sell Crypto
            </h1>
            <p className="text-balance text-xl text-muted-foreground">
              Explore the world&apos;s leading cryptocurrency exchanges. Choose the platform that best fits your trading
              needs and start buying or selling crypto today.
            </p>
          </div>
        </div>
      </header>

      <section className="px-4 py-14 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
