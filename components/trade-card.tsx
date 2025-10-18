import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { CopyTradingOption } from "@/types/dashboard";

export function TradeCard({ trade }: { trade: CopyTradingOption }) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    if (risk.toLowerCase() === "low") {
      return <CheckCircle2 className="h-4 w-4" />;
    }
    return <AlertCircle className="h-4 w-4" />;
  };

  const getCTAText = (risk: string, roi: number) => {
    if (risk.toLowerCase() === "high") {
      return "Start Trading";
    }
    if (roi > 20) {
      return "Copy Trade";
    }
    return "Purchase Copy Trade";
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20">
      {/* Recommended Badge */}
      {trade.isRecommended && (
        <div className="absolute right-4 top-4">
          <Badge className="bg-accent text-accent-foreground">Recommended</Badge>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="text-2xl font-bold text-foreground">{trade.trade_title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{trade.trade_description}</p>
        </div>

        {/* ROI Section */}
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Expected ROI</p>
            <p className="text-lg font-semibold text-primary">
              {trade.trade_roi_min}% - {trade.trade_roi_max}%
            </p>
          </div>
        </div>

        {/* Investment Range */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Min Investment</p>
            <p className="text-lg font-semibold text-foreground">${trade.trade_min.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Max Investment</p>
            <p className="text-lg font-semibold text-foreground">${trade.trade_max.toLocaleString()}</p>
          </div>
        </div>

        {/* Risk and Duration */}
        <div className="flex items-center justify-between gap-2">
          <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${getRiskColor(trade.trade_risk)}`}>
            {getRiskIcon(trade.trade_risk)}
            <span className="text-sm font-medium capitalize">{trade.trade_risk} Risk</span>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-semibold text-foreground">{trade.trade_duration} days</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
          {getCTAText(trade.trade_risk, trade.trade_roi_max)}
        </Button>
      </div>
    </div>
  );
}
