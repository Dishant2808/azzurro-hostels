import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, MessageCircle, Phone, Mail, Menu, Search } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import faqHeroImage from "@/assets/image_1753948779611.png";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: "Booking & Check-in",
      questions: [
        {
          question: "How do I make a booking?",
          answer: "Simply select your preferred dates and room type on our website and complete the checkout process to confirm your reservation."
        },
        {
          question: "What are the check-in and check-out times?",
          answer: "• Check-in starts at 3:00 PM local time.\n• Check-out is by 10:00 AM.\n• Early check-in or late check-out can be requested (subject to availability and may incur a fee)."
        },
        {
          question: "Do you require a deposit or payment guarantee?",
          answer: "• A valid government-issued ID or Passport is required at check-in. Local IDs may not be accepted in certain cases\n• For bookings, Payment must be completed on or before check-in to secure your bed."
        },
        {
          question: "Can I walk in without a reservation?",
          answer: "We accept walk-ins depending on availability, but we recommend booking in advance to secure your spot—especially during peak season."
        },
        {
          question: "Is there a minimum stay requirement?",
          answer: "Yes, we require a minimum stay of 2 nights, but this may vary depending on the season or promotions."
        },
        {
          question: "Can I extend my stay?",
          answer: "Yes! Let reception know as early as possible. Extensions depend on availability."
        }
      ]
    },
    {
      category: "Room Types & Amenities",
      questions: [
        {
          question: "What room types are available?",
          answer: "Rooms include Shared, Twin, and Double private rooms options. Depending on preferred location."
        },
        {
          question: "Are groups or guests sharing rooms accommodated together?",
          answer: "For shared dormitory bookings, If a group booking is named or booked by one person, it will be assigned to the same room (depending on the total # of guests)"
        },
        {
          question: "Do you provide bedding and towels?",
          answer: "Yes, all beds include clean linen. Towels are available for rent or free in private rooms."
        },
        {
          question: "Do you have laundry facilities?",
          answer: "Yes, we have self-service laundry machines available for guests, please bring your own laundry pod."
        },
        {
          question: "Is there a kitchen or common area?",
          answer: "Absolutely! We have a fully equipped guest kitchen and shared lounge area where you can relax or meet other travelers."
        }
      ]
    },
    {
      category: "Services & Facilities",
      questions: [
        {
          question: "Do you offer free Wi Fi and parking?",
          answer: "Yes — complimentary Wi Fi is available throughout the property And we don't have on-site parking available, but most of our guests are able to find street parking nearby. Just note that it's public and not managed by the hotel, so it's on a first-come, first-served basis."
        },
        {
          question: "Is breakfast included?",
          answer: "Yes! Breakfast and dinner included."
        },
        {
          question: "Can I bring a pet?",
          answer: "Unfortunately, we don't allow pets on the property to ensure the comfort and safety of all our guests. We appreciate your understanding!"
        }
      ]
    },
    {
      category: "Policies & Rules",
      questions: [
        {
          question: "What is your cancellation policy?",
          answer: "• Refundable bookings may be canceled or modified at least 48 hours before 2:00 PM local check-in to receive a full refund.\n• Cancellations within 48 hours or no-shows result in full-charge.\n• Non-refundable bookings are charged in full at booking and are not eligible for refunds under any circumstance.\n• No refunds for early departures once the stay has begun."
        },
        {
          question: "What are your guest and conduct rules?",
          answer: "• Guests must be 18 years or older. Minors must be accompanied by adults. (15 years old and above)\n• Smoking is prohibited on the premises and within 10 meters of the hotel. Alcohol is also not permitted on-site.\n• Illegal activities, including drug use, are strictly prohibited.\n• Visitors not permitted."
        },
        {
          question: "What happens if there's damage or violation of hotel rules?",
          answer: "Guests are responsible for any damage or losses incurred. The hotel may charge fines or require full payment for damages. Fire alarms triggered by guests may also incur charges."
        }
      ]
    },
    {
      category: "Contact & Support",
      questions: [
        {
          question: "How do I contact the hotel?",
          answer: "You can reach us via the contact details\n📱 Call: +61 440 133 104\n📧 Email: frontdesk@azzurrohotels.com"
        }
      ]
    }
  ];

  return (
    <div className="font-inter bg-white min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Global Header */}
      <GlobalHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Page Content */}
      <div className="pt-16">

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={faqHeroImage} 
          alt="Person reading a book by the ocean, relaxing waterfront scene"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-15 md:text-xl max-w-3xl mx-auto">
              Find answers to common questions about staying at Azzurro Pod Hotels
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="content-centered px-4 text-center">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="section-heading mb-12 text-center">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const itemIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <Card key={questionIndex} className="overflow-hidden">
                        <Collapsible open={isOpen} onOpenChange={() => toggleItem(itemIndex)}>
                          <CollapsibleTrigger className="w-full">
                            <CardContent className="p-6 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-center">
                                <h3 className="card-title text-left">{faq.question}</h3>
                                <ChevronDown 
                                  className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                  style={{color: 'var(--azzurro-navy)'}}
                                />
                              </div>
                            </CardContent>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="px-6 pb-6 text-left">
                              <div className="pt-4 border-t border-gray-100">
                                <div className="body-text leading-relaxed whitespace-pre-line text-left">{faq.answer}</div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Floating Button */}
      <section className="py-16 bg-white">
        <div className="content-centered text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 animate-bounce"
                style={{
                  animation: 'float 3s ease-in-out infinite'
                }}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Have More Questions?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold text-gray-900">
                  Need More Help?
                </DialogTitle>
              </DialogHeader>
              <div className="text-center py-6">
                <div className="mb-6">
                  <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <p className="text-gray-600 mb-2">
                    Can't find the answer you're looking for?
                  </p>
                  <p className="text-gray-600 font-medium">
                    Call us for instant support!
                  </p>
                </div>
                <a 
                  href="tel:+61440133104" 
                  className="inline-block"
                >
                  <Button 
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold w-full"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us Now
                  </Button>
                </a>
                <p className="text-xs text-gray-500 mt-4">
                  Available 24/7 for instant support
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="content-centered">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Don't miss any discounts — Be the first to know
              </h2>
            </div>
            <div className="md:w-1/2 flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter email address here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold">
                Get Discounts
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@azzurropodhostels" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="tel:+61440133104" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
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
    </div>
  );
}
