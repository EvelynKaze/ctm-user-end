"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { useDispatch } from "react-redux";
import TradingViewWidget from "@/components/TradingViewWidget"
import { useEffect, useState } from "react";
import { clearStockOption } from "@/store/stockOptionsSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { useUser } from "@clerk/nextjs";
import { fetchTransactions } from "@/app/actions/fetchTransactions";
import { Live, Transaction } from "@/types";
import { toast } from "sonner";
import { updateUserMetadata } from "@/app/actions/role";
import { getUserByClerkId } from "@/app/actions/user/getUserByClerkId";
import { StockTradingTable } from "@/components/stock-trading-table";

export default function UserDashboard() {
  const { user } = useUser();
  const [userPortfolio, setUserPortfolio] = useState({
    total_investment: 0,
    current_value: 0,
    roi: 0,
  });

  // Fetch user data from backend using action
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await getUserByClerkId(user.id);
        console.log("User data from backend:", userData?.data);
        
        if (userData?.success && userData?.data) {
          const data = userData.data;
          setUserPortfolio({
            total_investment: data.totalInvestment || 0,
            current_value: data.currentValue || 0,
            roi: data.roi || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  
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
  //   dispatch(clearStockOption());
  //   dispatch(clearCopyTrade());
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

  // // Get portfolio values with fallbacks
  // const userPortfolio = {
  //   total_investment: Number(user?.publicMetadata?.totalInvestment) || totalValue || 0,
  //   current_value: Number(user?.publicMetadata?.currentValue) || 0,
  //   roi: Number(user?.publicMetadata?.roi) || 0,
  // };

  // const stats = {
  //   total_investment: userPortfolio.total_investment,
  //   current_value: userPortfolio.current_value,
  //   roi: userPortfolio.roi,
  // };

  const stats = {
    total_investment: userPortfolio.total_investment,
    current_value: userPortfolio.current_value,
    roi: userPortfolio.roi,
  };

  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 gap-6">
      <div className="flex-1 h-full overflow-y-scroll space-y-6">
        <StatsCards stats={stats} />
        <TradingViewWidget />
        {/* <StockOptions portfolio={userPortfolio} /> */}
        <StockTradingTable />
      </div>
      <div className="w-full lg:w-80 space-y-6">
        <CopyTradingOptions 
          portfolio={userPortfolio} 
        />
      </div>
    </div>
  );
}