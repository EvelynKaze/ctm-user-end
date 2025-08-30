"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPortfolioPage from "@/components/admin-stocks-purchased";
import AdminCopyTradingPage from "@/components/admin-copied-trades";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("copy-trades");

  return (
    <div className="container mx-auto px-6 ">
      <h1 className="text-xl md:text-3xl font-bold mb-6">Manage Options</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-2">
          <TabsTrigger
            className="overflow-hidden p-1 text-xs sm:text-base"
            value="copy-trades"
          >
            Copy Trades
          </TabsTrigger>
          <TabsTrigger
            className="overflow-hidden p-1 text-xs sm:text-base"
            value="stocks"
          >
            Stock Options
          </TabsTrigger>
        </TabsList>
        <TabsContent value="copy-trades" className="mt-6">
          <AdminCopyTradingPage />
        </TabsContent>
        <TabsContent value="stocks" className="mt-6">
          <AdminPortfolioPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
