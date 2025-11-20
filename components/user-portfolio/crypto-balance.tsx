"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { TokenHolding, PortfolioData } from "@/app/actions/fetchPortfolio";
import { getStoredToken } from "@/app/actions/auth";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export default function CryptoBalance() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get auth token
      const token = getStoredToken();
      
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      const url = `${apiUrl}/portfolio/my-portfolio`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details');
        console.error(`Failed to fetch portfolio: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Failed to fetch portfolio: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success || !result.data) {
        console.error("Invalid response format from portfolio API:", result);
        throw new Error("Invalid response format");
      }

      setPortfolio(result.data);
      console.log("Portfolio data loaded:", result.data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch portfolio");
      toast.error("Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
    
    // Refresh portfolio every 60 seconds to get updated prices
    const interval = setInterval(loadPortfolio, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatTokenAmount = (amount: number): string => {
    if (amount < 0.0001) {
      return amount.toExponential(2);
    }
    if (amount < 1) {
      return amount.toFixed(6);
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  const formatPrice = (price: number): string => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    }
    if (price < 1) {
      return `$${price.toFixed(4)}`;
    }
    return formatCurrency(price);
  };

  // Skeleton loading rows
  const skeletonRows = Array(5).fill(0).map((_, index) => (
    <TableRow key={`skeleton-${index}`}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-24 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-24 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-24 ml-auto" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>
    </TableRow>
  ));

  if (error && !portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crypto Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={loadPortfolio}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-2xl font-bold">Crypto Portfolio</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Your cryptocurrency holdings</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Total Balance Display */}
          <div className="bg-muted p-4 rounded-lg min-w-[200px]">
            <div className="text-xs text-muted-foreground mb-1">Total Portfolio Value</div>
            {isLoading ? (
              <Skeleton className="h-8 w-32 mt-1" />
            ) : (
              <div className="text-2xl font-bold">
                {portfolio ? formatCurrency(portfolio.totalCurrentValue) : "$0.00"}
              </div>
            )}
            {portfolio && !isLoading && (
              <div
                className={`text-sm mt-1 flex items-center gap-1 ${
                  portfolio.totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {portfolio.totalProfitLoss >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {portfolio.totalProfitLoss >= 0 ? "+" : ""}
                {formatCurrency(portfolio.totalProfitLoss)} (
                {portfolio.totalProfitLossPercentage >= 0 ? "+" : ""}
                {portfolio.totalProfitLossPercentage.toFixed(2)}%)
              </div>
            )}
          </div>
          <button
            onClick={loadPortfolio}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            title="Refresh portfolio"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                  <TableHead className="text-right">Invested</TableHead>
                  <TableHead className="text-right">Profit/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  skeletonRows
                ) : portfolio && portfolio.holdings.length > 0 ? (
                  portfolio.holdings.map((holding: TokenHolding) => (
                    <TableRow key={holding.tokenName}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-xs">
                            {holding.tokenName.substring(0, 2)}
                          </div>
                          <div className="font-medium">{holding.tokenName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatTokenAmount(holding.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {holding.currentPrice ? formatPrice(holding.currentPrice) : "-"}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {holding.currentValue ? formatCurrency(holding.currentValue) : "-"}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(holding.totalInvestedUsd)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end gap-1 ${
                            holding.profitLoss >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {holding.profitLoss >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {holding.profitLoss >= 0 ? "+" : ""}
                            {formatCurrency(holding.profitLoss)}
                          </span>
                          <span className="text-xs ml-1">
                            ({holding.profitLossPercentage >= 0 ? "+" : ""}
                            {holding.profitLossPercentage.toFixed(2)}%)
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No cryptocurrency holdings found. Start by making a deposit!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Portfolio Summary */}
        {portfolio && !isLoading && portfolio.holdings.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Invested</div>
              <div className="text-lg font-semibold">
                {formatCurrency(portfolio.totalInvestedValue)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Value</div>
              <div className="text-lg font-semibold">
                {formatCurrency(portfolio.totalCurrentValue)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Return</div>
              <div
                className={`text-lg font-semibold flex items-center justify-center gap-1 ${
                  portfolio.totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {portfolio.totalProfitLoss >= 0 ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <TrendingDown className="h-5 w-5" />
                )}
                {portfolio.totalProfitLoss >= 0 ? "+" : ""}
                {formatCurrency(portfolio.totalProfitLoss)} (
                {portfolio.totalProfitLossPercentage >= 0 ? "+" : ""}
                {portfolio.totalProfitLossPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
