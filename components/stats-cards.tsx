import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: CryptoStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || value === null) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const profitLoss = stats?.total_profit_loss ?? (stats?.current_value - stats?.total_investment);
  const profitLossPercentage = stats?.total_profit_loss_percentage ?? stats?.roi ?? 0;
  const isProfit = profitLoss >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Investment - Historical tracking */}
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Total Investment</CardTitle>
          <DollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats?.total_investment)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Historical deposits</p>
        </CardContent>
      </Card>

      {/* Account Balance - Available balance */}
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Account Balance</CardTitle>
          <Wallet className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats?.account_balance ?? stats?.total_investment)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Available for transactions</p>
        </CardContent>
      </Card>

      {/* Current Value - Portfolio value */}
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Current Value</CardTitle>
          <TrendingUp className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats?.current_value)}
          </div>
          <div className={`flex items-center gap-1 text-xs mt-1 ${isProfit ? "text-green-500" : "text-red-500"}`}>
            {isProfit ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isProfit ? "+" : ""}
              {formatCurrency(profitLoss)} ({isProfit ? "+" : ""}
              {profitLossPercentage.toFixed(2)}%)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ROI - Return on Investment */}
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Return On Investment</CardTitle>
          {isProfit ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isProfit ? "text-green-500" : "text-red-500"}`}>
            {isProfit ? "+" : ""}
            {profitLossPercentage.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
        </CardContent>
      </Card>
    </div>
  );
}
