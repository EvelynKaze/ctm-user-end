"use client";
import { motion } from "framer-motion";
import KeyFeatures from "@/components/landing/KeyFeatures";
import AnimatedLine from "@/components/landing/AnimatedLine";
import { advantages, disadvantages } from "@/constants/prosCons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Footer } from "@/components/landing/Footer";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import LoadingScreen from "@/components/loading-screen";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";
import CryptoFeaturesSection from "@/components/landing/crypto-features-section";
import GetStartedSection from "@/components/landing/GetStartedSection";
import { PlansSection } from "@/components/landing/plans-section";
import { FaqSection } from "@/components/landing/faq-section";
import ToastNotification from "@/components/ToastNotification";
import { CtaSection } from "@/components/landing/cta-section";


export default function Home() {
  const { loading } = useSelector((state: RootState) => state.loading);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black relative w-full">
      <ToastNotification onLandingPage={true} />
      <Navbar />
      <HeroSection />
      <CryptoFeaturesSection />
      <KeyFeatures />
      <PlansSection />
      <GetStartedSection />

      <section className="relative py-12">
        <div className="inner grid justify-items-center text-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-xl sm:text-3xl font-semibold mb-2">
            Why CopyTrading Markets is the Clear Choice
          </h2>
          <p className="text-sm sm:text-base max-w-prose dark:text-appGold100">
            CopyTrading Markets stands out as the ultimate platform, delivering
            unmatched value and solutions that redefine the trading experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center max-w-4xl gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, translateX: -70 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 sm:w-1/2 max-w-2xl p-4 md:p-8 items-center rounded-3xl overflow-hidden bg-appCardGold text-appDarkCard backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div>
                <h1 className="font-semibold text-xl mb-4">
                  What Sets Us Apart?
                </h1>
                <ul className="grid gap-2">
                  {advantages.map((item, index) => (
                    <motion.li
                      initial={{ opacity: 0, translateX: -50 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="border-b border-appDarkCard border-opacity-25 text-sm pb-2 flex gap-1 items-start"
                      key={index}
                    >
                      <Icon className="mt-[2px]" icon={"charm:tick"} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: 70 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 sm:w-1/2 max-w-2xl p-4 md:p-8 items-center rounded-3xl overflow-hidden backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div>
                <h1 className="font-semibold text-xl mb-4">
                  The Pitfalls of Other Platforms
                </h1>
                <ul className="grid gap-2">
                  {disadvantages.map((item, index) => (
                    <motion.li
                      initial={{ opacity: 0, translateX: -50 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, }}
                      className="border-b border-appGold20 text-sm pb-2 flex gap-1 items-start"
                      key={index}
                    >
                      <Icon className="mt-[2px]" icon={"mingcute:close-line"} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <div className="my-8 inner w-full flex justify-center">
        <AnimatedLine />
      </div>

      <FaqSection />

      <CtaSection />

      <Footer />
    </div>
  );
}
