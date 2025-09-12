import Navbar from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import BuyCryptoPage from '@/components/landing/buy-crypto';

export default function BuyCrypto() {
  return (
    <>
      <Navbar />
      <BuyCryptoPage />
      <Footer />
    </>
  );
}
