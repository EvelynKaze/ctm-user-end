"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StockTradingTable } from "./stock-trading-table";
import { CopyTradingOptions } from "./copytrading-options";
import { TrendingUp, Copy } from "lucide-react";

interface MobileTabViewProps {
  portfolio: {
    total_investment: number;
    current_value: number;
    roi: number;
  };
}

export function MobileTabView({ portfolio }: MobileTabViewProps) {
  return (
    <Card className="lg:hidden">
      <CardContent className="p-0">
        <Tabs defaultValue="stocks" className="w-full">
          {/* Tab Headers */}
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="stocks" 
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
            >
              <TrendingUp className="h-4 w-4" />
              Stock Trading
            </TabsTrigger>
            <TabsTrigger 
              value="copytrade"
              className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
            >
              <Copy className="h-4 w-4" />
              Copy Trading
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="stocks" className="p-4 mt-0">
            <StockTradingTable />
          </TabsContent>
          
          <TabsContent value="copytrade" className="p-4 mt-0">
            <CopyTradingOptions portfolio={portfolio} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}