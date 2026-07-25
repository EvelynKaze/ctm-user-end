"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { TableSkeleton } from "@/skeletons";
import {
  fetchUserCopytradePurchases,
  UserCopyTradePurchase,
} from "@/app/actions/copytrade";
import { getStoredToken } from "@/app/actions/auth";
import { toast } from "sonner";

type SortKey = keyof UserCopyTradePurchase;

interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}

const CopyTradingPage = () => {
  const [copyTradingData, setCopyTradingData] = useState<UserCopyTradePurchase[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "trade_profit_loss",
    direction: "desc",
  });
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrades = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getStoredToken();
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setCopyTradingData([]);
        return;
      }

      const purchases = await fetchUserCopytradePurchases(token);
      setCopyTradingData(purchases ?? []);
      if (purchases === null) {
        setError("Failed to load copy trades. Please try again.");
        toast.error("Failed to load copy trades");
      }
    } catch (err) {
      console.error("Error fetching copied trades:", err);
      setError("Failed to load copy trades. Please try again.");
      setCopyTradingData([]);
      toast.error("Failed to load copy trades");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTrades();
    const interval = setInterval(getTrades, 60000);
    return () => clearInterval(interval);
  }, [getTrades]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredData = copyTradingData
    .filter((trade) =>
      filter === "all" ? true : trade.trade_risk?.toLowerCase() === filter
    )
    .sort((a, b) => {
      const { key, direction } = sortConfig;
      const aVal = a[key];
      const bVal = b[key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return direction === "asc" ? -1 : 1;
      if (bVal == null) return direction === "asc" ? 1 : -1;
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

  const formatCurrency = (value: number | null | undefined) => {
    if (value == null || Number.isNaN(value)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const statusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <span className="bg-yellow-500 rounded-xl animate-pulse px-2 py-1 text-white text-xs capitalize">
          Processing
        </span>
      );
    }
    if (status === "cancelled") {
      return (
        <span className="bg-red-500 rounded-xl px-2 py-1 text-white text-xs capitalize">
          Cancelled
        </span>
      );
    }
    return (
      <span className="bg-green-500 rounded-xl px-2 py-1 text-white text-xs capitalize">
        {status}
      </span>
    );
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
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Your Copy Trades
              </CardTitle>
              <CardDescription className="mt-1">
                Purchased copytrade plans and their live status
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="bg-appCardGold sm:w-max w-full"
                onClick={getTrades}
                disabled={isLoading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={getTrades} variant="outline">
                  Retry
                </Button>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p className="text-lg mb-2">No copy trades yet</p>
                <p className="text-sm">
                  Purchase a copytrade plan from the Copy Trade page to see it here.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      { label: "Trade Title", key: "trade_title" as SortKey },
                      { label: "Initial Investment", key: "initial_investment" as SortKey },
                      { label: "Current Value", key: "trade_current_value" as SortKey },
                      { label: "Profit/Loss", key: "trade_profit_loss" as SortKey },
                      { label: "Risk Level", key: "trade_risk" as SortKey },
                      { label: "Status", key: "trade_status" as SortKey },
                    ].map(({ label, key }) => (
                      <TableHead
                        key={key}
                        onClick={() => handleSort(key)}
                        className="cursor-pointer"
                      >
                        {label}
                        {sortConfig.key === key && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((trade) => (
                    <TableRow key={trade._id}>
                      <TableCell className="font-medium">{trade.trade_title}</TableCell>
                      <TableCell>{formatCurrency(trade.initial_investment)}</TableCell>
                      <TableCell>
                        {trade.trade_status === "pending"
                          ? statusBadge("pending")
                          : formatCurrency(trade.trade_current_value)}
                      </TableCell>
                      <TableCell>
                        {trade.trade_status === "pending" ? (
                          statusBadge("pending")
                        ) : (
                          <span
                            className={
                              trade.isProfit ? "text-green-600" : "text-red-500"
                            }
                          >
                            {trade.isProfit ? (
                              <TrendingUp className="inline mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="inline mr-1 h-4 w-4" />
                            )}
                            {formatCurrency(trade.trade_profit_loss)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 capitalize rounded-full text-xs ${
                            trade.trade_risk === "low"
                              ? "bg-green-200 text-green-800"
                              : trade.trade_risk === "medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {trade.trade_risk}
                        </span>
                      </TableCell>
                      <TableCell>{statusBadge(trade.trade_status)}</TableCell>
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

export default CopyTradingPage;
