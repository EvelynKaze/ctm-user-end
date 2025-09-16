"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TradingViewWidget from './TradingViewWidget';

export function TradingViewChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Track all markets on TradingView Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div 
          className="w-full rounded-lg overflow-hidden bg-background border"
          style={{ height: '500px' }}
        >
          <TradingViewWidget />
        </div>
      </CardContent>
    </Card>
  );
}