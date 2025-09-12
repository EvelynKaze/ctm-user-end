import { Card, CardContent } from "@/components/ui/card"

export default function CopyTradingPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-10">
      {/* Hero Section */}
      <section className="relative bg-bg-gradient-gold-subtle py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Copy Trading</h1>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 text-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Copy Trading</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {
                "It's all in the name! Copy trading allows you to directly copy the positions taken by another trader. You decide the amount you wish to invest and simply copy everything they do automatically in real-time – when that trader makes a trade, your account will make that same trade as well. You do not need to have any input on the trades, and you get the identical returns on each trade as your chosen trader. But by copying another trader, you could potentially make money based on their skills. In fact, no advanced knowledge of the financial market is required to take part."
              }
            </p>
          </div>

          <div className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Copy Trading is both a product and a service. We cater to both the traders and investors looking to
              capitalize in the cryptocurrency trading. Being able to copy trades from several expert traders and also
              allow investors to follow {"one's"} trades is a great service in and of itself.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We have been trading markets for many years and recently started trading crypto currencies with much
              success. We originally wanted to put together a portfolio of coins and manage {"everyone's"} funds in one
              account but we soon realized that account segregation and being in control of your funds is the only way
              to go, especially if we wanted to bring in outside investors. So, after looking around and finding out
              that there was no way for anyone to copy someone {"else's"} trades (unlike any other market), we decided
              to start working on this project.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our software will handle the trade copying automatically on your behalf. We monitor your experts trading
              activity and as soon as there is a trade, we calculate all the necessary parameters and execute the trade.
              The only thing you have to make sure of is that you have enough funds available in your trading account.
              When the expert exits a position, you too will exit it. Automatically.
            </p>
          </div>

          {/* Who Are The Experts Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">WHO ARE THE EXPERTS</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We carefully select expert applicants. We get to know them as a trader and examine their trading
              performance over a period of time. We also tend to look for expert who already have a following to further
              confirm their competence (social proof). You can also read about every expert on their individual
              performance pages.
            </p>
          </div>

          {/* How Does This Work Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">HOW DOES THIS WORK</h3>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Here is how the copier works: You, as an investor, simply select an expert or experts that you want to
                copy trades from. Once you are signed up, this is the only action needed on your part.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                {
                  "Once you've taken care of the above, you are all set. There are no codes that you need to run or signals for you to manually input. Our software will handle the trade copying automatically on your behalf. We monitor your experts trading activity and as soon as there is a trade, we calculate all the necessary parameters and execute the trade."
                }
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                The copier works based on trade percent amount. So, for example, if your expert takes a position in XYZ
                coin for a total of 10% of his account value and you are 100% allocated to that expert, then the copier
                will also execute a trade in your account in the amount of 10% of your account value.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                The only thing you have to make sure of is that you have enough available base currency that your expert
                trades with, in your trading account. How much is enough? First, you must meet the {"exchanges"} minimum
                order amount ({"let's"} say about $10 per trade to be safe). That means that if your expert executes a
                5% order, you must have at least $300 in your account total value (at 100% expert allocation as an
                example). This also means that you need to have at least 10% or higher in available base currency to
                avoid missed trades.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {(
              [
                {
                  title: "Instant Execution",
                  desc: "Trades are executed automatically in real-time when experts make their moves.",
                  icon: (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: "Verified Experts",
                  desc: "All trading experts are carefully vetted and their performance is tracked.",
                  icon: (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Secure Trading",
                  desc: "Your funds remain in your own account with full control and transparency.",
                  icon: (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ),
                },
              ] as const
            ).map(({ title, desc, icon }) => (
              <Card key={title} className="border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-appGold-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {icon}
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
