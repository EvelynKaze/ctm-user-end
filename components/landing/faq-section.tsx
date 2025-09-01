"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqData = [
  {
    question: "I Can't Sign In To My Account?",
    answer:
      "If you're having trouble signing in, please check your email and password. You can also use the 'Forgot Password' link to reset your credentials.",
  },
  {
    question: "What Level Of Support Do You Offer?",
    answer:
      "We provide 24/7 customer support through live chat, email, and phone. Our dedicated support team is always ready to assist you with any questions or concerns.",
  },
  {
    question: "What Is Copy Stop Loss?",
    answer:
      "Copy Stop Loss is a risk management feature that automatically closes your copied trades when they reach a predetermined loss threshold, protecting your investment.",
  },
  {
    question: "How Do I Withdraw My Profits?",
    answer:
      "You can withdraw your profits through your account dashboard. Simply navigate to the withdrawal section, select your preferred method, and follow the instructions.",
  },
  {
    question: "What Are The Disadvantages Of Online Trading?",
    answer:
      "Online trading involves market risks, potential technical issues, and requires proper education. It's important to understand these risks before investing.",
  },
  {
    question: "Is It Safe To Share My Info Here?",
    answer:
      "Yes, we use bank-level encryption and security measures to protect your personal and financial information. Your data is completely secure with us.",
  },
  {
    question: "How Do I Make A Deposit?",
    answer:
      "Making a deposit is simple. Go to your account dashboard, click on 'Deposit', choose your payment method, and follow the secure payment process.",
  },
  {
    question: "How Long Are Withdrawals Processed?",
    answer:
      "Withdrawal processing times vary by method: Bank transfers take 3-5 business days, while e-wallet withdrawals are typically processed within 24 hours.",
  },
  {
    question: "What Is Copy Trading?",
    answer:
      "As the name implies, it is 'Copying Trades' from an experienced trader. You simply select a trader and copy whatever trades they place.",
  },
  {
    question: "Do You Offer Referrals?",
    answer:
      "Yes, we have a comprehensive referral program where you can earn commissions by referring new traders to our platform. Check your dashboard for details.",
  },
]

export function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([8]) // Default open item (What Is Copy Trading?)

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Most Common <span className="text-appGold100">FAQ</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                {openItems.includes(index) ? (
                  <Minus className="h-5 w-5 text-appGold100 flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
