"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CopyTradingOption } from "@/types/dashboard";
import { useState, useEffect } from "react";
import { setCopyTrade } from "@/store/copyTradeSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { toast } from "sonner"
import { TradeFormModal } from "./user-deposit/trade-modal";
import { fetchTrades } from "@/app/actions/fetch-trade";
import { createCopyTrade, CreateCopyTradeError } from "@/app/actions/copytrade";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export function CopyTradingOptions({ portfolio }: 
  { 
    portfolio: { total_investment: number, current_value: number, roi: number }, 
  }) 
{
    const [trades, setTrades] = useState<CopyTradingOption[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState<CopyTradingOption | null>(null);
    const dispatch = useAppDispatch();
    const { userData } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      const getTrades = async () => {
        try {
          const tradesData = await fetchTrades();
          console.log("Trades data received:", tradesData)
          if (tradesData) {
            setTrades(tradesData);
          } else {
            console.error("No trades data received");
            setTrades([]);
          }
        } catch (error) {
          console.error("Failed to fetch trades:", error);
          setTrades([]);
        }
      };
    
      getTrades();
    }, []);

    const handlePurchase = (trade: CopyTradingOption) => {
      try {
        const { trade_min } = trade;
        // Use accountBalance from userData if available, otherwise fallback to total_investment
        const availableBalance = userData?.accountBalance ?? portfolio?.total_investment ?? 0;

        if (availableBalance < trade_min) {
          const difference = trade_min - availableBalance;
          dispatch( 
            setCopyTrade({
              title: trade.trade_title,
              trade_min: difference,
              trade_max: trade.trade_max,
              trade_roi_min: trade.trade_roi_min,
              trade_roi_max: trade.trade_roi_max,
              trade_risk: trade.trade_risk,
              trade_duration: trade.trade_duration,
            })
          );

          toast("Insufficient funds!", {
            description: `You need to deposit at least $${difference.toFixed(2)} to start this trade.`,
          });

          router.push("/dashboard/deposit");
        } else {
          setSelectedTrade(trade);
          setOpen(true);
        }
      } catch (err) {
        const error = err as Error;
        console.error("Error in handlePurchase:", error);
      }
    };

    const handleTradePurchase = async (amount: number) => {
      if (!selectedTrade || !userData?._id) {
        toast("Error", { description: "Missing trade or user information." });
        return;
      }

      // Get auth token
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("ctm_token") 
        : null;

      if (!token) {
        toast("Error", { description: "Authentication token not found. Please log in again." });
        return;
      }

      try {
        const result = await createCopyTrade(
          {
            copytradeOptionId: selectedTrade._id,
            initial_investment: amount,
          },
          token
        );

        if (!result) {
          throw new Error("Failed to create copytrade purchase");
        }

        if (!result.success) {
          // Handle API errors
          const errorResult = result as CreateCopyTradeError;
          const errorMessage = errorResult.message || "Failed to create copytrade purchase";
          const errorData = errorResult.data;
          
          if (errorData?.deficit) {
            toast("Insufficient Balance", {
              description: `${errorMessage}. You need $${errorData.deficit.toFixed(2)} more.`,
            });
            router.push("/dashboard/deposit");
          } else {
            toast("Error", { description: errorMessage });
          }
          return;
        }

        // Success
        setOpen(false);
        setSelectedTrade(null);
        toast("Success", { 
          description: result.message || "Copytrade purchase created successfully! It will be pending until admin approval." 
        });
      } catch (error) {
        console.error("Error creating trade:", error);
        toast("Error", { 
          description: error instanceof Error ? error.message : "Failed to create copytrade purchase. Please try again later." 
        });
      }
    };

    return (
      <>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex text-sm items-center gap-2">CopyTrading Options</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-2">
              <div className="grid gap-4">
                {trades?.map((trade) => (
                  <Card key={trade._id} className={`flex flex-col relative ${trade?.isRecommended ? 'ring-2 ring-appGold-500 border-appGold-300' : ''}`}>
                    {trade?.isRecommended && (
                      <div className="absolute -top-2 right-20 rounded-lg z-10 bg-appGold200">
                        <Badge className="bg-appGold-500 text-white flex items-center gap-1 px-2 py-1">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <h3 className="text-2xl font-bold text-center">{trade?.trade_title}</h3>
                      <p className="text-center text-muted-foreground">{trade?.trade_description}</p>
                      <p className="text-center text-muted-foreground">
                        {trade?.trade_duration} day{trade?.trade_duration >= 2 ? "s" : ""}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold">${trade?.trade_min} - ${trade?.trade_max}</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>
                            Daily ROI: {trade?.trade_roi_min}%{" - "}{trade?.trade_roi_max}%
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>
                            Risk: <b className="capitalize">{trade?.trade_risk}</b>
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handlePurchase(trade)} className="w-full hover:bg-appGold200" variant="outline">
                        Copy
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedTrade && (
          <TradeFormModal 
            open={open} 
            setOpen={setOpen} 
            portfolio={portfolio?.total_investment} 
            trade={selectedTrade} 
            onTradePurchase={handleTradePurchase}
          />
        )}
      </>
    );
}
