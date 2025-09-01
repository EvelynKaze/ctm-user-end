'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import userActions, { UserAction } from '@/constants/user-actions';

interface ToastNotificationProps {
  onLandingPage: boolean;
}

export default function ToastNotification({ onLandingPage }: ToastNotificationProps) {
  const [currentNotification, setCurrentNotification] = useState<UserAction | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!onLandingPage) return;

    const showRandomNotification = () => {
      const randomAction = userActions[Math.floor(Math.random() * userActions.length)];
      
      // Update timestamp to make it seem recent
      randomAction.timestamp = new Date();
      
      setCurrentNotification(randomAction);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => {
      showRandomNotification();
    }, 3000);

    // Then show notifications every 8-12 seconds
    const intervalTimer = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 4000 + 8000); // Random between 8-12 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [onLandingPage]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTimeAgo = () => {
    return 'just now';
  };

  if (!onLandingPage || !currentNotification) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 300,
            duration: 0.6 
          }}
          className="fixed top-28 right-6 z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-appGold500 to-appGold400 text-black rounded-lg shadow-2xl p-3 max-w-3xl border border-appGold300">
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                currentNotification.type === 'withdrawal' 
                  ? 'bg-green-600' 
                  : 'bg-blue-600'
              }`} />

              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-black truncate">
                    {currentNotification.name}
                  </p>
                  <span className="text-xs text-black/80 whitespace-nowrap ml-2">
                    {getTimeAgo()}
                  </span>
                </div>
                
                <p className="text-xs text-black/90 mb-1">
                  {currentNotification.location}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/80">
                    {currentNotification.type === 'withdrawal' ? 'Withdrew' : 'Invested'}
                  </span>
                  <span className="text-sm font-bold text-black">
                    {formatAmount(currentNotification.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
