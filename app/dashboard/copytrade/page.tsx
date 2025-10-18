import { Suspense } from "react"
import { TradeCard } from "@/components/trade-card"
import { fetchTrades } from "@/app/actions/fetch-trade"
import { Skeleton } from "@/components/ui/skeleton"

// Add this to make the page dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Loading skeleton component
function TradeCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* ROI skeleton */}
        <div className="rounded-lg bg-muted p-3">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Investment range skeleton */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        {/* Risk and duration skeleton */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  )
}

// Loading grid
function TradesLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TradeCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Trades content component
async function TradesContent() {
  const trades = await fetchTrades()

  if (!trades || trades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Trading Strategies Available
        </h3>
        <p className="text-muted-foreground max-w-md">
          There are currently no copy trading options available. Please check back
          later for new opportunities.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trades.map((trade) => (
        <TradeCard key={trade._id} trade={trade} />
      ))}
    </div>
  )
}

export default function CopyTradePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Discover Elite Trading Strategies
            </h1>
            <p className="text-balance text-xl text-muted-foreground">
              Access professionally managed trading strategies with proven track
              records. Start with as little as $500 and grow your portfolio with
              expert-led copy trading.
            </p>
          </div>
        </div>
      </header>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<TradesLoading />}>
            <TradesContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
