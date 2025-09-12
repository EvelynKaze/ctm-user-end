import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/abstract-privacy-security-pattern.jpg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>

          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-500 text-sm font-medium">Data Protection</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy <span className="text-yellow-500">Policy</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl text-pretty">
            Learn how we collect, use, and protect your personal information when you use our trading platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Personal Information:</strong> We collect information you provide
                  directly, such as your name, email address, phone number, and identification documents required for
                  account verification.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Trading Information:</strong> We collect data related to your trading
                  activities, including transaction history, portfolio performance, and copy trading preferences.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Technical Information:</strong> We automatically collect technical data
                  such as IP addresses, browser type, device information, and usage patterns to improve our services.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Communication Data:</strong> We may record and store communications
                  between you and our support team for quality assurance and training purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  <strong className="text-white">Service Provision:</strong> To provide and maintain our trading
                  platform, execute trades, and facilitate copy trading services.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Account Management:</strong> To create and manage your account, verify
                  your identity, and ensure compliance with regulatory requirements.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Communication:</strong> To send you important updates, notifications
                  about your account, and respond to your inquiries.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Security:</strong> To protect against fraud, unauthorized access, and
                  other security threats to our platform and users.
                </p>
                <p className="text-pretty">
                  <strong className="text-white">Improvement:</strong> To analyze usage patterns and improve our
                  services, develop new features, and enhance user experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">3. Information Sharing</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong className="text-white">Service Providers:</strong> With trusted third-party service
                    providers who assist in operating our platform
                  </li>
                  <li>
                    • <strong className="text-white">Legal Requirements:</strong> When required by law, regulation, or
                    legal process
                  </li>
                  <li>
                    • <strong className="text-white">Business Transfers:</strong> In connection with a merger,
                    acquisition, or sale of assets
                  </li>
                  <li>
                    • <strong className="text-white">Consent:</strong> When you have given explicit consent for specific
                    sharing
                  </li>
                  <li>
                    • <strong className="text-white">Protection:</strong> To protect our rights, property, or safety, or
                    that of our users
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">4. Data Security</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure data storage with encryption at rest</li>
                  <li>• Regular security audits and penetration testing</li>
                  <li>• Multi-factor authentication options</li>
                  <li>• Access controls and employee training</li>
                  <li>• Continuous monitoring for security threats</li>
                </ul>
                <p className="text-pretty mt-4">
                  While we strive to protect your information, no method of transmission over the internet or electronic
                  storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">5. Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  Depending on your jurisdiction, you may have the following rights regarding your personal information:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong className="text-white">Access:</strong> Request access to your personal information
                  </li>
                  <li>
                    • <strong className="text-white">Correction:</strong> Request correction of inaccurate information
                  </li>
                  <li>
                    • <strong className="text-white">Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    • <strong className="text-white">Portability:</strong> Request transfer of your data to another
                    service
                  </li>
                  <li>
                    • <strong className="text-white">Objection:</strong> Object to certain processing of your
                    information
                  </li>
                  <li>
                    • <strong className="text-white">Restriction:</strong> Request restriction of processing
                  </li>
                </ul>
                <p className="text-pretty mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-pretty">
                  We use cookies and similar tracking technologies to enhance your experience on our platform:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong className="text-white">Essential Cookies:</strong> Required for basic platform
                    functionality
                  </li>
                  <li>
                    • <strong className="text-white">Performance Cookies:</strong> Help us understand how you use our
                    platform
                  </li>
                  <li>
                    • <strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings
                  </li>
                  <li>
                    • <strong className="text-white">Marketing Cookies:</strong> Used to deliver relevant advertisements
                  </li>
                </ul>
                <p className="text-pretty mt-4">
                  You can control cookie settings through your browser preferences, but disabling certain cookies may
                  affect platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">7. Data Retention</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                We retain your personal information for as long as necessary to provide our services and comply with
                legal obligations. Specific retention periods vary based on the type of information and applicable
                regulations.
              </p>
              <p className="text-gray-300 text-pretty">
                When we no longer need your information, we will securely delete or anonymize it in accordance with our
                data retention policies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">8. Contact Us</h2>
              <p className="text-gray-300 mb-4 text-pretty">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-gray-300">
                <p>Email: privacy@copytradingmarkets.com</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Privacy Matters</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            We&#39;re committed to protecting your personal information and maintaining transparency about our data
            practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="/terms-and-conditions">View Terms</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
