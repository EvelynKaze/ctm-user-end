import Navbar from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import StockTradingPage from '@/components/landing/stock-trading';

export default function StockTrading() {
  return (
    <>
      <Navbar />
      <StockTradingPage />
      <Footer />
    </>
  );
}
