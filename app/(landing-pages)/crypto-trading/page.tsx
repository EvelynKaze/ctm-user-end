import Navbar from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import CryptoTradingPage from '@/components/landing/crypto-trading';

export default function CryptoTrading() {
  return (
    <>
      <Navbar />
      <CryptoTradingPage />
      <Footer />
    </>
  );
}
