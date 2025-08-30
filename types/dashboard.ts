export interface CryptoStats {
    total_investment: number;
    current_value: number;
    roi: number;
  }
  
  export interface MarketTrend {
    token: string;
    icon: string;
    symbol: string;
    lastPrice: number;
    change24h: number;
    marketCap: string;
  }
  
  export interface MonthlyStats {
    month: string;
    value: number;
  }
  
  export interface Trade {
    id: string;
    trade_title: string;
    trade_max: number;
    trade_min: number;
    trade_roi_min: number;
    trade_roi_max: number;
    trade_description: string;
    trade_risk: string;
    trade_duration: number;
    user_id?: string;
    user_name?: string;
  }
  