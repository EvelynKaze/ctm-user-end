/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import ManageCopyTradingModal from "../modals/manage-copy-trading";
import { TableSkeleton } from "@/skeletons";
import { useUser } from "@clerk/nextjs";
import { fetchCopiedTrades } from "@/app/actions/fetchCopiedTrades";

interface TradePayload {
  $id: string;
  trade_title: string;
  trade_min: number;
  trade_max: number;
  trade_roi_min: number;
  trade_roi_max: number;
  trade_risk: string;
  trade_current_value: number;
  trade_profit_loss: number;
  trade_win_rate: number;
  isProfit: boolean;
  initial_investment: number;
  trade_token: string;
  trade_token_address: string;
  trade_status: string;
  full_name: string;
}

const CopyTradingPage = () => {
  const [copyTradingData, setCopyTradingData] = useState<any>([]);
  const { user } = useUser()
  const user_id = user?.id || "";
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "trade_profit_loss",
    direction: "desc",
  });
  const [filter, setFilter] = useState<string>("all");
  const [selectedTrade] = useState<TradePayload | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTrades = useCallback(async () => {
    setIsLoading(true);
    try {
      const copiedTrades = await fetchCopiedTrades(user_id);
      setCopyTradingData(copiedTrades);
    } catch (error) {
      console.error("Error fetching copied trades:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    getTrades();
  }, [user_id, getTrades]);

  

  const handleSort = (key: keyof TradePayload) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  interface SortConfig {
    key: keyof TradePayload;
    direction: "asc" | "desc";
  }

  const filteredData: TradePayload[] = copyTradingData
    .filter((trade: TradePayload) =>
      filter === "all" ? true : trade.trade_risk.toLowerCase() === filter
    )
    .sort((a: TradePayload, b: TradePayload) => {
      const { key, direction }: SortConfig = sortConfig;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // const handleManage = (trade: TradePayload) => {
  //   setSelectedTrade(trade);
  //   setIsManageModalOpen(true);
  // };
  console.log("CopyTradingData", copyTradingData)


  return (
    <div className="flex h-full justify-center items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Your Copy Trading Options
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 w-full space-x-4">
              <Select className="w-full sm:w-max" onValueChange={handleFilter}>
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
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      { label: "Trade Title", key: "trade_title" },
                      {
                        label: "Initial Investment",
                        key: "initial_investment",
                      },
                      // { label: "Token", key: "trade_token" },
                      { label: "Current Value", key: "trade_current_value" },
                      { label: "Profit/Loss", key: "trade_profit_loss" },
                      { label: "Win Rate", key: "trade_win_rate" },
                      { label: "Risk Level", key: "trade_risk" },
                      { label: "Status", key: "trade_status" },
                    ].map(({ label, key }) => (
                      <TableHead
                        key={key}
                        onClick={() => handleSort(key as keyof TradePayload)}
                        className="cursor-pointer"
                      >
                        {label}
                        {sortConfig.key === key && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                    ))}
                    {/* <TableHead>Action</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((trade: TradePayload) => (
                    <TableRow key={trade?.$id}>
                      <TableCell>{trade?.trade_title}</TableCell>
                      <TableCell>
                        {trade?.trade_token === "USDT"
                          ? formatCurrency(trade?.initial_investment)
                          : trade?.initial_investment}
                      </TableCell>
                      {/* <TableCell>{trade?.trade_token}</TableCell> */}
                      <TableCell>
                        {trade.trade_status === "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : trade?.trade_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          formatCurrency(trade.trade_current_value)
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.trade_status === "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : trade?.trade_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          <span
                            className={`${
                              trade.isProfit ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {trade.isProfit ? (
                              <TrendingUp className="inline mr-1" />
                            ) : (
                              <TrendingDown className="inline mr-1" />
                            )}
                            {trade.trade_profit_loss}%
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.trade_status === "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : trade?.trade_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          <span
                            className={`${
                              trade.isProfit ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {trade.isProfit ? (
                              <TrendingUp className="inline mr-1" />
                            ) : (
                              <TrendingDown className="inline mr-1" />
                            )}
                            {trade.trade_win_rate}%
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 capitalize rounded-full text-xs ${
                            trade.trade_risk === "low"
                              ? "bg-green-200 text-green-800"
                              : trade.trade_risk === "medium" || "Medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {trade.trade_risk}
                        </span>
                      </TableCell>
                      <TableCell>
                        {trade.trade_status === "pending" ? (
                          <span className="bg-yellow-500 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : trade?.trade_status == "rejected" ? (
                          <span className="bg-red-500 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          <span className="bg-green-500 rounded-xl animate-pulse p-2 text-white capitalize">
                            {trade.trade_status}{" "}
                          </span>
                        )}
                      </TableCell>
                      {/* <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(trade)}
                        >
                          Manage
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
      {selectedTrade && (
        <ManageCopyTradingModal
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          trade={selectedTrade}
        />
      )}
    </div>
  );
};

export default CopyTradingPage;
