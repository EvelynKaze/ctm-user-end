import { TrendingUp } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
        CopyTradingMarkets
      </span>
    </div>
  );
};

export default Logo;
