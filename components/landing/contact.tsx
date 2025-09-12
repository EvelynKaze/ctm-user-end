import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-500 text-sm font-medium">💬 24/7 Support Available</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Get in <span className="text-yellow-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto text-pretty">
            Have questions about copy trading? Need help with your account? Our expert support team is here to help you
            succeed in your trading journey.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Email Support</h3>
                <p className="text-gray-300 mb-4 text-pretty">
                  Get detailed help with any questions or issues you may have.
                </p>
                <p className="text-yellow-500 font-semibold">support@copytradingmarkets.com</p>
                <p className="text-sm text-gray-400 mt-2">Response within 2 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Live Chat</h3>
                <p className="text-gray-300 mb-4 text-pretty">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Start Chat</Button>
                <p className="text-sm text-gray-400 mt-2">Available 24/7</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Phone Support</h3>
                <p className="text-gray-300 mb-4 text-pretty">
                  Speak directly with our trading experts for personalized guidance.
                </p>
                <p className="text-yellow-500 font-semibold">+1 (555) 123-TRADE</p>
                <p className="text-sm text-gray-400 mt-2">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <p className="text-gray-300 mb-8 text-pretty">
                Fill out the form below and we&apos;ll get back to you as soon as possible. For urgent matters, please use
                our live chat or phone support.
              </p>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Contact Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <Input
                        placeholder="John"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white">
                      <option>General Inquiry</option>
                      <option>Account Support</option>
                      <option>Trading Questions</option>
                      <option>Technical Issues</option>
                      <option>Partnership Opportunities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">How does copy trading work?</h3>
                    <p className="text-gray-300 text-sm text-pretty">
                      Copy trading allows you to automatically replicate the trades of experienced traders. When they
                      make a trade, the same trade is executed in your account proportionally.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">What&apos;s the minimum deposit required?</h3>
                    <p className="text-gray-300 text-sm text-pretty">
                      You can start copy trading with as little as $500. This allows you to diversify across multiple
                      traders and manage your risk effectively.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">How do I choose which traders to copy?</h3>
                    <p className="text-gray-300 text-sm text-pretty">
                      Our platform provides detailed statistics on each trader including their performance history, risk
                      level, and trading strategy. You can filter and sort to find traders that match your investment
                      goals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Is my money safe?</h3>
                    <p className="text-gray-300 text-sm text-pretty">
                      Yes, your funds are protected by segregated accounts and bank-level security. We&apos;re regulated by
                      top-tier financial authorities and use advanced encryption to protect your data.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Can I stop copying a trader anytime?</h3>
                    <p className="text-gray-300 text-sm text-pretty">
                      You have full control over your copy trading settings. You can stop copying any trader instantly,
                      and you can also set stop-loss limits to manage your risk.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
