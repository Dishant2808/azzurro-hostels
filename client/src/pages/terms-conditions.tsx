import GlobalHeader from "@/components/GlobalHeader";
import Sidebar from "@/components/Sidebar";
import { Link } from "wouter";
import { useState } from "react";

export function TermsConditionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar />
      
      <div className="content-centered py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy mb-4">Terms & Conditions</h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none bg-gray-50 p-8 rounded-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-4">Terms & Conditions (Summary)</h2>
              <p className="text-15 text-gray-600 mb-4">Last updated: January 2025</p>
              <div className="space-y-4 text-15 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-6 space-y-3">
                  <li>Your credit card details are collected solely to secure your reservation.</li>
                  <li>Guests must be 18 years or older to stay.</li>
                  <li>Prices are quoted in AUD and may fluctuate daily.</li>
                  <li>A valid credit card and passport are required at check-in.</li>
                  <li>Cash payments are not accepted. Payment methods include Visa and MasterCard (debit or credit). All card payments incur a 3% processing fee.</li>
                  <li>Guests are liable for any damages or losses incurred during their stay. Fines may be issued for room damages or if the guest is responsible for triggering a fire alarm.</li>
                  <li>When reserving multiple beds in shared dormitories, we cannot ensure that all guests on the same booking will be accommodated in the same room, but we will make every effort to do so.</li>
                  <li>Illegal activities, including drug use, are strictly prohibited.</li>
                  <li>Smoking is not allowed on the premises or within 10 metres of the property.</li>
                  <li>Guests are not permitted to bring or consume alcohol on the premises.</li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 border-l-4 border-blue-600">
                <p className="text-15 text-gray-700 italic">
                  For more detailed Terms & Conditions, please contact us at <a href="mailto:office@azzurrohotels.com" className="text-blue-600 hover:underline">office@azzurrohotels.com</a>.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Cancellation Policy</h2>
              
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy mb-3">Refundable Bookings</h3>
                  <p className="text-15 text-gray-700 leading-relaxed">
                    For refundable bookings, cancellations or modifications must be made at least 48 hours prior to the scheduled check-in time (2:00 PM local time) to receive a full refund. If a cancellation is made within the 48-hour window, or if you fail to check in, the total amount of the booking will be charged to the credit card on file.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy mb-3">Non-Refundable Bookings</h3>
                  <p className="text-15 text-gray-700 leading-relaxed">
                    For non-refundable bookings, the full amount is charged at the time of booking, and no refunds will be issued under any circumstances, including cancellations or no-shows.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy mb-3">Group Bookings & Travel Agencies</h3>
                  <p className="text-15 text-gray-700 leading-relaxed">
                    For group bookings or reservations made through an online travel agency, cancellations or modifications must be handled directly with the agency or in accordance with their policies.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-navy mb-3">Early Departures</h3>
                  <p className="text-15 text-gray-700 leading-relaxed">
                    No refunds will be issued for early departures once the guest has checked in, regardless of whether the booking is refundable or non-refundable.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-4">Payment Terms</h2>
              <div className="text-15 text-gray-700 leading-relaxed space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-navy mb-3">Accepted Payment Methods</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visa (debit or credit)</li>
                    <li>MasterCard (debit or credit)</li>
                  </ul>
                  <p className="mt-3 font-medium text-red-600">Note: All card payments incur a 3% processing fee</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-navy mb-3">Not Accepted</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cash payments</li>
                    <li>Traveler's checks</li>
                    <li>Bank transfers for walk-in bookings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-4">Guest Responsibilities</h2>
              <div className="text-15 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Must be 18 years or older</li>
                  <li>Present valid passport or ID at check-in</li>
                  <li>Provide valid credit card for incidentals</li>
                  <li>Respect other guests and maintain quiet hours</li>
                  <li>Follow all property rules and regulations</li>
                  <li>Report any damages immediately</li>
                  <li>Comply with local laws and regulations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-4">Contact Information</h2>
              <div className="mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-navy mb-2">General Inquiries</h3>
                    <p className="text-15 text-gray-700">📧 frontdesk@azzurrohotels.com</p>
                    <p className="text-15 text-gray-700">📱 +61 440 133 104</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-2">Detailed Terms</h3>
                    <p className="text-15 text-gray-700">📧 office@azzurrohotels.com</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy mb-4">Updates to Terms</h2>
              <div className="text-15 text-gray-700 leading-relaxed">
                <p>These terms and conditions may be updated from time to time. Guests will be notified of any significant changes via email or through our website. Continued use of our services after such changes constitutes acceptance of the new terms.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="azzurro-navy-bg text-white py-12">
        <div className="content-centered px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-8 mb-12">
            {/* Azzurro Hotels Column */}
            <div className="md:col-span-1 flex flex-col pr-4">
              <h3 className="text-xl font-semibold text-white mb-6">Azzurro Hotels</h3>
              <p className="text-white leading-relaxed mb-8 text-sm max-w-[200px] break-words">
                For Better Comfort and Experience.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/profile.php?id=61563267666626" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://instagram.com/azzurropodhostels" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@azzurropodhostels" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="tel:+61440133104" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/search-results" className="text-gray-300 hover:text-white transition-colors text-sm">All Locations</Link></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Central Sydney</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Surry Hills</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Darling Harbour</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Potts Point</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><a href="/partnerships" className="text-gray-300 hover:text-white transition-colors text-sm">Partnerships</a></li>
                <li><a href="/jobs-internships" className="text-gray-300 hover:text-white transition-colors text-sm">Jobs & Internships</a></li>
              </ul>
            </div>

            {/* Offers Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Offers</h3>
              <ul className="space-y-2">
                <li><Link href="/breakfast-dinner" className="text-gray-300 hover:text-white transition-colors text-sm">Breakfast & Dinner</Link></li>
                <li><Link href="/discounts-offers" className="text-gray-300 hover:text-white transition-colors text-sm">Rewards</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQs</Link></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700/50 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 AzzurroHotels - All Rights Reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
                <span className="text-gray-600">-</span>
                <Link href="/terms-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">Terms and Conditions</Link>
              </div>
            </div>
          </div>
        </div>  
      </footer>
    </div>
  );
}