import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/abstract-legal-documents-pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">Terms and Conditions</span>
          </nav>

          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-500 text-sm font-medium">Legal Agreement</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Terms and <span className="text-yellow-500">Conditions</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl text-pretty">
            Please read these terms and conditions carefully before using our trading platform and services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                By accessing and using CopyTradingMarkets (&#34;the Platform&#34;), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
              <p className="text-gray-300 text-pretty">
                These Terms and Conditions may be updated from time to time. Continued use of the Platform after any
                such changes shall constitute your consent to such changes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">2. Platform Services</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Copy Trading:</strong> Our platform allows you to automatically copy
                  the trading strategies of experienced traders. This service is provided for informational and
                  educational purposes.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Trading Instruments:</strong> We provide access to various financial
                  instruments including cryptocurrencies, forex, stocks, and CFDs through our partner brokers.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Educational Resources:</strong> We offer educational materials, market
                  analysis, and trading tools to help improve your trading knowledge.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">3. User Responsibilities</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Account Security:</strong> You are responsible for maintaining the
                  confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Accurate Information:</strong> You must provide accurate, current, and
                  complete information during registration and keep your account information updated.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Compliance:</strong> You must comply with all applicable laws and
                  regulations in your jurisdiction regarding financial trading and investments.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Risk Understanding:</strong> You acknowledge that you understand the
                  risks associated with trading and that you are solely responsible for your trading decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">4. Prohibited Activities</h2>
              <div className="space-y-4 text-gray-300">
                <p>You agree not to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Use the platform for any illegal or unauthorized purpose</li>
                  <li>• Attempt to gain unauthorized access to other user accounts</li>
                  <li>• Manipulate or interfere with the proper functioning of the platform</li>
                  <li>• Share false or misleading information</li>
                  <li>• Engage in market manipulation or fraudulent activities</li>
                  <li>• Use automated systems without prior authorization</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">5. Intellectual Property</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                All content on the Platform, including but not limited to text, graphics, logos, images, software, and
                trading algorithms, is the property of CopyTradingMarkets or its licensors and is protected by copyright
                and other intellectual property laws.
              </p>
              <p className="text-gray-300 text-pretty">
                You may not reproduce, distribute, modify, or create derivative works of any content without our express
                written permission.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">6. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                CopyTradingMarkets shall not be liable for any direct, indirect, incidental, special, or consequential
                damages resulting from your use of the platform or any trading activities conducted through the
                platform.
              </p>
              <p className="text-gray-300 text-pretty">
                We do not guarantee the accuracy, completeness, or timeliness of any information provided on the
                platform. Trading decisions are made at your own risk.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">7. Account Termination</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                We reserve the right to suspend or terminate your account at any time for violation of these terms,
                suspicious activity, or for any other reason at our sole discretion.
              </p>
              <p className="text-gray-300 text-pretty">
                You may terminate your account at any time by contacting our support team. Upon termination, you remain
                liable for any outstanding obligations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">8. Contact Information</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="text-gray-300">
                <p>Email: legal@copytradingmarkets.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Trading Street, Financial District, NY 10001</p>
              </div>
              <p className="text-gray-400 text-sm mt-4">Last updated: December 2024</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of traders who trust our platform for their copy trading needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/risk-disclosure">View Risk Disclosure</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
