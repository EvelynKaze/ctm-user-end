import { motion } from "framer-motion";
import AnimatedSlideshow from "./StartingSteps";

const GetStartedSection = () => {
  return (
    <section className="relative min-h-72 py-12">
      <div className="inner flex flex-col items-center">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
        >
          Easy Setup
        </motion.span>
        <h2 className="text-xl sm:text-3xl text-center font-semibold mb-4">
          Get Started in Three Simple Steps
        </h2>
        <AnimatedSlideshow />
      </div>
    </section>
  );
};

export default GetStartedSection;
