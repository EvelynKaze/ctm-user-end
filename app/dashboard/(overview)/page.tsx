"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { TradingViewChart } from "@/components/TradingViewChart";
import { MobileTabView } from "@/components/mobile-tab-view";
import { StockTradingTable } from "@/components/stock-trading-table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { getUserById } from "@/app/actions/auth";
import { setUserData, setUserLoading, setUserError, UserData } from "@/store/userSlice";
import { useEffect } from "react";
import { toast } from "sonner"

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { userData, isLoading, error } = useSelector((state: RootState) => state.user);

  // Fetch user data by user ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = typeof window !== "undefined" 
        ? localStorage.getItem("ctm_user_id") 
        : null;

      if (!userId) {
        dispatch(setUserError("No user ID found"));
        toast("Error fetching user data", {
          description: 'No user Id found. Kindly logout and log back in.',
        })
        return;
      }

      // Only fetch if we don't already have user data
      if (!userData) {
        dispatch(setUserLoading(true));

        try {
          const userResponse = await getUserById(userId);
          console.log("User data from backend:", userResponse?.data);

          if (userResponse?.success && userResponse?.data) {
            dispatch(setUserData(userResponse.data as UserData));
          } else {
            dispatch(setUserError("Failed to fetch user data"));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(setUserError("Failed to fetch user data"));
        } finally {
          dispatch(setUserLoading(false));
        }
      }
    };

    fetchUserData();
  }, [dispatch, userData]);

  // Create portfolio object from Redux state
  const userPortfolio = {
    total_investment: userData?.totalInvestment || 0,
    current_value: userData?.currentValue || 0,
    roi: userData?.roi || 0,
  };

  // Calculate profit/loss
  const currentValue = userData?.currentValue ?? 0;
  const totalInvestment = userData?.totalInvestment ?? 0;
  const profitLoss = currentValue - totalInvestment;
  const profitLossPercentage = userData?.roi ?? 0;

  const stats = {
    total_investment: userPortfolio.total_investment,
    account_balance: userData?.accountBalance,
    current_value: userPortfolio.current_value,
    roi: userPortfolio.roi,
    total_profit_loss: profitLoss,
    total_profit_loss_percentage: profitLossPercentage,
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-foreground text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-destructive text-lg mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 gap-6">
      <div className="flex-1 h-full overflow-y-scroll space-y-6">
        <StatsCards stats={stats} />
        <TradingViewChart />
        
        {/* Mobile Tab View - Shows after TradingView on mobile */}
        <MobileTabView portfolio={userPortfolio} />
        
        {/* Desktop Only - Stock Trading Table */}
        <div className="hidden lg:block">
          <StockTradingTable />
        </div>
      </div>
      
      {/* Desktop Only - Copy Trading Options Sidebar */}
      <div className="hidden lg:block w-full lg:w-80 space-y-6">
        <CopyTradingOptions 
          portfolio={userPortfolio} 
        />
      </div>
    </div>
  );
}