"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { TradingViewChart } from "@/components/TradingViewChart";
import { MobileTabView } from "@/components/mobile-tab-view";
import { StockTradingTable } from "@/components/stock-trading-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function UserDashboard() {
  const { userData } = useSelector((state: RootState) => state.user);

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