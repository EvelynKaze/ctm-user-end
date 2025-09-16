"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { TradingViewChart } from "@/components/TradingViewChart";
import { MobileTabView } from "@/components/mobile-tab-view";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/app/actions/user/getUserByClerkId";
import { StockTradingTable } from "@/components/stock-trading-table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUserLoading, setUserData, setUserError } from "@/store/userSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { clearStockOption } from "@/store/stockOptionsSlice";

export default function UserDashboard() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  // Fetch user data from backend using action
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      dispatch(setUserLoading(true));
      
      try {
        const userResponse = await getUserByClerkId(user.id);
        console.log("User data from backend:", userResponse?.data);
        
        if (userResponse?.success && userResponse?.data) {
          dispatch(setUserData(userResponse.data));
        } else {
          dispatch(setUserError("Failed to fetch user data"));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(setUserError("Failed to fetch user data"));
      }
    };

    fetchUserData();
    dispatch(clearStockOption());
    dispatch(clearCopyTrade());
  }, [user?.id, dispatch]);

  
  // const dispatch = useDispatch();
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [live, setLive] = useState<Live[]>([]);
  // const [isSyncing, setIsSyncing] = useState(false);

  // // Calculate total value from transactions and live data
  // const totalValue = transactions.reduce((sum, transaction) => {
  //   const crypto = live.find(c => c.name === transaction.currency);
  //   return sum + (crypto ? transaction.amount * crypto.price : 0);
  // }, 0);

  // // Improved sync logic
  // useEffect(() => {
  //   const syncInvestment = async () => {
  //     if (!user?.id || !transactions.length || !live.length || isSyncing) return;
      
  //     setIsSyncing(true);
  //     try {
  //       const currentInvestment = Number(user.publicMetadata?.totalInvestment) || 0;
        
  //       // Only update if:
  //       // 1. We have a valid totalValue (> 0)
  //       // 2. The difference is significant (> 1% or $1)
  //       const difference = Math.abs(totalValue - currentInvestment);
  //       const threshold = Math.max(currentInvestment * 0.01, 1); // 1% or $1, whichever is larger
        
  //       if (totalValue > 0 && difference > threshold) {
  //         await updateUserMetadata({
  //           userId: user.id,
  //           metadata: {
  //             ...user.publicMetadata,
  //             totalInvestment: totalValue
  //           }
  //         });
  //         console.log(`Synced investment: ${currentInvestment} → ${totalValue}`);
  //       }
  //     } catch (error) {
  //       console.error("Sync failed:", error);
  //       toast.error("Failed to sync portfolio value");
  //     } finally {
  //       setIsSyncing(false);
  //     }
  //   };

  //   syncInvestment();

  // }, [user, transactions, live, totalValue, isSyncing, dispatch]);

  // // Fetch transactions with improved error handling
  // useEffect(() => {
  //   const loadTransactions = async () => {
  //     try {
  //       const data = await fetchTransactions(user?.id || "");
  //       if (data && data.length > 0) {
  //         setTransactions(data);
  //       }
  //     } catch (error) {
  //       console.error("Transaction load failed:", error);
  //       toast.error("Failed to load transactions");
  //     }
  //   };
    
  //   if (user?.id) loadTransactions();
  // }, [user?.id]);

  // // Fetch live data with improved error handling
  // useEffect(() => {
  //   const loadLiveData = async () => {
  //     try {
  //       const res = await fetch('/api/live-crypto');
  //       const data = await res.json();
  //       if (data && data.length > 0) {
  //         setLive(data);
  //       }
  //     } catch (error) {
  //       console.error("Live data load failed:", error);
  //     }
  //   };
    
  //   loadLiveData();
  // }, []);

  // Create portfolio object from Redux state
  const userPortfolio = {
    total_investment: userData?.totalInvestment || 0,
    current_value: userData?.currentValue || 0,
    roi: userData?.roi || 0,
  };

  const stats = {
    total_investment: userPortfolio.total_investment,
    current_value: userPortfolio.current_value,
    roi: userPortfolio.roi,
  };

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