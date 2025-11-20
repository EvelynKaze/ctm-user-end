"use client";
import { Suspense, useState, useEffect } from "react";
import { TradeCard } from "@/components/trade-card";
import { fetchTrades } from "@/app/actions/fetch-trade";
import { Skeleton } from "@/components/ui/skeleton";
import { TradeFormModal } from "@/components/user-deposit/trade-modal";
import { createCopyTrade } from "@/app/actions/copytrade";
import { setCopyTrade } from "@/store/copyTradeSlice";
import { useAppDispatch } from "@/store/hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CopyTradingOption } from "@/types/dashboard";
import { getUserById, getStoredToken } from "@/app/actions/auth";
import { UserData } from "@/store/userSlice";



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
function TradesContent() {
  const [trades, setTrades] = useState<CopyTradingOption[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<CopyTradingOption | null>(null);
  const [portfolio, setPortfolio] = useState({ total_investment: 0, current_value: 0, roi: 0 });
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('ctm_user_id');
        
        if (!userId) {
          console.error("No user ID found in localStorage");
          setIsLoadingUser(false);
          return;
        }

        // Fetch user data by ID
        const userResponse = await getUserById(userId);
        
        if (userResponse.success && userResponse.data) {
          const user = userResponse.data as UserData
          
          // Extract portfolio information from user data
          const portfolioData = {
            total_investment: user.totalInvestment || 0,
            current_value: user.currentValue || 0,
            roi: user.roi || 0
          };
          
          setPortfolio(portfolioData);
          console.log("User portfolio data:", portfolioData);
        } else {
          console.error("Failed to fetch user data:", userResponse.message);
          // Fallback to default values
          setPortfolio({ total_investment: 0, current_value: 0, roi: 0 });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to default values
        setPortfolio({ total_investment: 0, current_value: 0, roi: 0 });
      } finally {
        setIsLoadingUser(false);
      }
    };

    const getTrades = async () => {
      try {
        console.log("Starting to fetch trades...");
        const tradesData = await fetchTrades();
        console.log("Trades data received:", tradesData);
        
        if (tradesData && Array.isArray(tradesData) && tradesData.length > 0) {
          setTrades(tradesData);
          console.log(`Successfully set ${tradesData.length} trades`);
        } else {
          console.warn("No trades data received or empty array:", tradesData);
          setTrades([]);
        }
      } catch (error) {
        console.error("Failed to fetch trades:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        setTrades([]);
      }
    };

    // Fetch both user data and trades
    fetchUserData();
    getTrades();
  }, []);

  const handlePurchase = (trade: CopyTradingOption) => {
    try {
      const { trade_min } = trade;
      // Use accountBalance from userData if available, otherwise fallback to total_investment
      const availableBalance = userData?.accountBalance ?? portfolio?.total_investment ?? 0;

      if (availableBalance < trade_min) {
        const difference = trade_min - availableBalance;
        dispatch( 
          setCopyTrade({
            title: trade.trade_title,
            trade_min: difference,
            trade_max: trade.trade_max,
            trade_roi_min: trade.trade_roi_min,
            trade_roi_max: trade.trade_roi_max,
            trade_risk: trade.trade_risk,
            trade_duration: trade.trade_duration,
          })
        );

        toast("Insufficient funds!", {
          description: `You need to deposit at least $${difference.toFixed(2)} to start this trade.`,
        });

        router.push("/dashboard/deposit");
      } else {
        setSelectedTrade(trade);
        setOpen(true);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error in handlePurchase:", error);
    }
  };

  const handleTradePurchase = async (amount: number) => {
    if (!selectedTrade || !userData?._id) {
      toast("Error", { description: "Missing trade or user information." });
      return;
    }

    // Get auth token
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("ctm_token") 
      : null;

    if (!token) {
      toast("Error", { description: "Authentication token not found. Please log in again." });
      return;
    }

    try {
      const result = await createCopyTrade(
        {
          copytradeOptionId: selectedTrade._id,
          initial_investment: amount,
        },
        token
      );

      if (!result) {
        throw new Error("Failed to create copytrade purchase");
      }

      if (!result.success) {
        // Handle API errors
        const errorMessage = result.message || "Failed to create copytrade purchase";
        const errorData = (result as any).data;
        
        if (errorData?.deficit) {
          toast("Insufficient Balance", {
            description: `${errorMessage}. You need $${errorData.deficit.toFixed(2)} more.`,
          });
          router.push("/dashboard/deposit");
        } else {
          toast("Error", { description: errorMessage });
        }
        return;
      }

      // Success
      setOpen(false);
      setSelectedTrade(null);
      toast("Success", { 
        description: result.message || "Copytrade purchase created successfully! It will be pending until admin approval." 
      });
    } catch (error) {
      console.error("Error creating trade:", error);
      toast("Error", { 
        description: error instanceof Error ? error.message : "Failed to create copytrade purchase. Please try again later." 
      });
    }
  };

  // Show loading state while fetching user data
  if (isLoadingUser) {
    return <TradesLoading />;
  }

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
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trades.map((trade) => (
          <TradeCard 
            key={trade._id} 
            trade={trade} 
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {selectedTrade && (
        <TradeFormModal 
          open={open} 
          setOpen={setOpen} 
          portfolio={portfolio?.total_investment} 
          trade={selectedTrade} 
          onTradePurchase={handleTradePurchase}
        />
      )}
    </>
  )
}

export default function CopyTradePage() {
  return (
    <main className="min-h-full bg-black">
      <header className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<TradesLoading />}>
            <TradesContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
