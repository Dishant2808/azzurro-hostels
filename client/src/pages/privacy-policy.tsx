import GlobalHeader from '@/components/GlobalHeader';
import PromoBanner from '@/components/PromoBanner';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBanner />
      <GlobalHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                Azzurro Pod Hotels ("we," "our," or "us") is committed to maintaining your privacy. This privacy policy explains how we collect, use, and protect your information when you use our services.
              </p>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you create an account, make a reservation, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Booking preferences and special requests</li>
                <li>Communication history with our customer service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Process and manage your bookings</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send booking confirmations and important updates</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Service providers who assist us in operating our website and conducting business</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Business transfers in case of merger, acquisition, or sale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                <li>Restricted access to personal information</li>
                <li>Regular security assessments and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> office@azzurrohotels.com<br />
                  <strong>Phone:</strong> +61 440 133 104<br />
                  <strong>Address:</strong> Sydney, Australia
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the updated policy on our website with a new effective date.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Azzurro Pod Hotels</h3>
              <p className="text-gray-400 text-sm">
                Modern pod accommodation in the heart of Sydney with complimentary meals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/locations" className="text-gray-400 hover:text-white">Locations</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/breakfast-dinner" className="text-gray-400 hover:text-white">Meals</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms-conditions" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>frontdesk@azzurrohotels.com</li>
                <li>+61 440 133 104</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Azzurro Pod Hotels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}