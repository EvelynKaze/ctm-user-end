"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { TableSkeleton } from "@/skeletons";
import {
  fetchMyStockPurchases,
  requestStockLiquidation,
  StockPurchase,
} from "@/app/actions/stockPurchases";
import { getStoredToken } from "@/app/actions/auth";
import { toast } from "sonner";

const StockPage = () => {
  const [stocks, setStocks] = useState<StockPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liquidatingId, setLiquidatingId] = useState<string | null>(null);

  const loadStocks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getStoredToken();
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setStocks([]);
        return;
      }
      const data = await fetchMyStockPurchases(token);
      if (data === null) {
        setError("Failed to load stock holdings.");
        setStocks([]);
        toast.error("Failed to load stock holdings");
      } else {
        setStocks(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load stock holdings.");
      setStocks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStocks();
    const interval = setInterval(loadStocks, 45000);
    return () => clearInterval(interval);
  }, [loadStocks]);

  const formatCurrency = (value: number | null | undefined) => {
    if (value == null || Number.isNaN(value)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const statusBadge = (status: StockPurchase["stock_status"]) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500 animate-pulse",
      active: "bg-green-500",
      pending_liquidation: "bg-orange-500 animate-pulse",
      completed: "bg-blue-500",
      cancelled: "bg-red-500",
    };
    const labels: Record<string, string> = {
      pending: "Processing",
      active: "Active",
      pending_liquidation: "Liquidation pending",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return (
      <span
        className={`${styles[status] || "bg-gray-500"} rounded-xl px-2 py-1 text-white text-xs capitalize`}
      >
        {labels[status] || status}
      </span>
    );
  };

  const handleLiquidate = async (purchase: StockPurchase) => {
    const token = getStoredToken();
    if (!token) {
      toast.error("Please log in again");
      return;
    }
    setLiquidatingId(purchase._id);
    try {
      const result = await requestStockLiquidation(purchase._id, token);
      if (!result?.success) {
        toast.error(result?.message || "Failed to request liquidation");
        return;
      }
      toast.success("Liquidation requested — awaiting admin approval");
      await loadStocks();
    } finally {
      setLiquidatingId(null);
    }
  };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Stock Holdings</CardTitle>
              <CardDescription className="mt-1">
                Live mark-to-market while active. Liquidation requires admin
                approval and settles as USDT.
              </CardDescription>
            </div>
            <Button
              className="bg-appCardGold w-full sm:w-max"
              onClick={loadStocks}
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh Prices
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading && stocks.length === 0 ? (
              <TableSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={loadStocks} variant="outline">
                  Retry
                </Button>
              </div>
            ) : stocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p className="text-lg mb-2">No stock holdings yet</p>
                <p className="text-sm">
                  Buy stocks from Buy / Sell. Purchases stay pending until admin
                  approval.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Buy Price</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead>Live Price</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>P/L</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock._id}>
                      <TableCell>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {stock.name}
                        </div>
                      </TableCell>
                      <TableCell>{stock.quantity}</TableCell>
                      <TableCell>{formatCurrency(stock.purchase_price)}</TableCell>
                      <TableCell>
                        {formatCurrency(stock.initial_investment)}
                      </TableCell>
                      <TableCell>
                        {stock.stock_status === "pending"
                          ? "-"
                          : formatCurrency(stock.current_price)}
                      </TableCell>
                      <TableCell>
                        {stock.stock_status === "pending"
                          ? statusBadge("pending")
                          : formatCurrency(stock.current_value)}
                      </TableCell>
                      <TableCell>
                        {stock.stock_status === "pending" ||
                        stock.profit_loss == null ? (
                          "-"
                        ) : (
                          <span
                            className={
                              stock.isProfit ? "text-green-600" : "text-red-500"
                            }
                          >
                            {stock.isProfit ? (
                              <TrendingUp className="inline mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="inline mr-1 h-4 w-4" />
                            )}
                            {formatCurrency(stock.profit_loss)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{statusBadge(stock.stock_status)}</TableCell>
                      <TableCell>
                        {stock.stock_status === "active" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={liquidatingId === stock._id}
                            onClick={() => handleLiquidate(stock)}
                          >
                            {liquidatingId === stock._id
                              ? "Requesting..."
                              : "Liquidate"}
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StockPage;
