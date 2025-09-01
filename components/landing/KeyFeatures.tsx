import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import AnimatedLine from "./AnimatedLine";

const features = [
  {
    icon: "mdi:chart-line",
    title: "Crypto Mining",
    description: "Mine Crypto smartly earning by automated processes and improved decision-making."
  },
  {
    icon: "mdi:account-supervisor-circle-outline", 
    title: "Copy Trading",
    description: "Copy trading allows you to directly copy the positions taken by another trader. You simply copy everything."
  },
  {
    icon: "mdi:chart-line",
    title: "Financial Advisory",
    description: "We offer financial advice leading to smart trading by automating processes and improving decision-making."
  },
  {
    icon: "mdi:chart-trending-up",
    title: "Forex Trading", 
    description: "Foreign Exchange Market, a global decentralized market for the trading of currencies."
  },
  {
    icon: "mdi:cog-sync-outline",
    title: "Index Trading",
    description: "The ROI rates as high as up to 41% indices contains about 0.24%, thus is rated as a sweet spot."
  },
  {
    icon: "mdi:swap-horizontal",
    title: "ETF Stocks",
    description: "Buy stocks, commodities, bonds, and other securities and place them where they will grow."
  }
];

const KeyFeatures = () => {
  return (
    <div className="inner grid justify-items-center text-center bg-black">
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
      >
        Services We Offer
      </motion.span>
      <div className="max-w-6xl mx-auto px-4 bg-black">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-4">
            We offer world class services around - Check out some of our services below
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-lg border border-border hover:border-appGold200 transition-all duration-300 hover:shadow-glow-gold group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-appGold20 rounded-lg flex items-center justify-center group-hover:bg-appGold100 transition-colors duration-300">
                  <Icon 
                    icon={feature.icon}
                    className="text-3xl text-appGold100 group-hover:text-appDarkCard transition-colors duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground group-hover:text-appGold100 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="my-28 inner w-full flex justify-center">
        <AnimatedLine />
      </div>
    </div>
  );
};

export default KeyFeatures;
