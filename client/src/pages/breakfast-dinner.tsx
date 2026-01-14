import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Utensils, Coffee, Menu, Search } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import breakfastDinnerHero from "@assets/image_1754028828338.png";
import dietaryOptionsImage from "@assets/image_1753712463172.png";
import dinnerImage1 from "@assets/20250708_194108_1753714241934.jpg";
import dinnerImage2 from "@assets/20250709_192628_1753714241935.jpg";
import dinnerImage3 from "@assets/20250711_185913_1753714241935.jpg";
import dinnerImage4 from "@assets/20250707_180537_1753714241935.jpg";
import dinnerImage5 from "@assets/20250709_183715_1753714241936.jpg";
import dinnerImage6 from "@assets/20250709_192905_1753714241936.jpg";
import breakfastImage1 from "@assets/WhatsApp Image 2025-07-29 at 2.43.32 AM_1753721224385.jpeg";
import breakfastImage2 from "@assets/WhatsApp Image 2025-07-29 at 2.43.32 AM (1)_1753721224384.jpeg";
import breakfastImage3 from "@assets/WhatsApp Image 2025-07-29 at 2.43.32 AM (2)_1753721224383.jpeg";
import breakfastImage4 from "@assets/WhatsApp Image 2025-07-29 at 2.43.32 AM (6)_1753721224382.jpeg";

// Social Media Gallery Images
import socialImage1 from "@assets/20250704_191116_1753721568997.jpg";
import socialImage2 from "@assets/20250708_191927_1753721568998.jpg";
import socialImage3 from "@assets/20250710_192256_1753721568998.jpg";
import socialImage4 from "@assets/20250710_193005_1753721568998.jpg";
import socialImage5 from "@assets/20250616_192413_1753721568999.jpg";
import socialImage6 from "@assets/20250708_193900_1753721639918.jpg";
import socialImage7 from "@assets/20250709_192628_1753721639919.jpg";
import socialImage8 from "@assets/20250711_185913_1753721639919.jpg";
import socialImage9 from "@assets/20250707_180433_1753721639920.jpg";
import socialImage10 from "@assets/20250707_180537_1753721639920.jpg";
import socialImage11 from "@assets/20250704_183136(1)_1753721639921.jpg";
import socialImage12 from "@assets/20250704_183509_1753721639921.jpg";
export default function BreakfastDinnerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const dinnerImages = [
    dinnerImage1,
    dinnerImage2,
    dinnerImage3,
    dinnerImage4,
    dinnerImage5,
    dinnerImage6
  ];

  const breakfastImages = [
    breakfastImage1,
    breakfastImage2,
    breakfastImage3,
    breakfastImage4
  ];

  const meals = [
    {
      type: "Breakfast",
      time: "7:30 AM - 9:00 AM",
      icon: Coffee,
      description: "Start your day with our complimentary breakfast featuring fresh ingredients and classic options.",
      items: [
        "Cereal with milk",
        "Toast with jams, peanut butter, and margarine",
        "Fresh fruit juice (apple and orange)",
        "Coffee and tea"
      ],
      image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      type: "Dinner",
      time: "From 6:30 PM (varies by property)",
      icon: Utensils,
      description: "Enjoy our chef-curated dinner featuring creative dishes made with quality ingredients.",
      items: [
        "Chef-decided menu with rotating selections",
        "Creative dishes made fresh daily",
        "International and local cuisine influences",
        "Quality ingredients sourced locally when possible",
        "Menu varies by location and availability"
      ],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
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
          src={breakfastDinnerHero} 
          alt="Peaceful outdoor scene with oranges, flowers, and open book on white fabric"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
              Eat with us at Azzurro
            </h1>
            <p className="text-15 md:text-xl max-w-3xl mx-auto">
              Enjoy delicious, freshly prepared meals included with your stay
            </p>
          </div>
        </div>
      </section>

      {/* Meal Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {meals.map((meal, index) => (
              <div key={index} className={`space-y-16 ${meal.type === 'Breakfast' ? 'pb-20' : 'pt-12 pb-80'}`}>
                {/* Meal Header and Text Content */}
                <div className={`text-center max-w-4xl mx-auto ${meal.type === 'Breakfast' ? 'px-8 py-8' : ''}`}>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="p-3 rounded-full" style={{backgroundColor: 'var(--azzurro-cream)'}}>
                      <meal.icon className="h-8 w-8" style={{color: 'var(--azzurro-navy)'}} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-black uppercase">{meal.type}</h2>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <Clock className="h-5 w-5 text-black" />
                        <span className="text-15 text-black">{meal.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-15 text-black leading-relaxed mb-8">{meal.description}</p>
                  
                  <div className="space-y-3 text-left max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-black mb-4 text-left">What's Included:</h3>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {meal.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-black flex-shrink-0"></div>
                          <span className="text-15 text-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Image Section */}
                <div className="flex justify-center">
                  {meal.type === 'Breakfast' ? (
                    <div className="relative h-96 w-full max-w-2xl">
                      {/* Grid Layout with connected frames */}
                      <div className="grid grid-cols-2 gap-0 h-full">
                        {/* Left column - 2 images stacked */}
                        <div className="flex flex-col">
                          <div className="h-1/2 border-8 border-black border-r-4 border-b-4 overflow-hidden">
                            <img 
                              src={breakfastImages[0]} 
                              alt="Breakfast dish 1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="h-1/2 border-8 border-black border-r-4 border-t-0 overflow-hidden">
                            <img 
                              src={breakfastImages[1]} 
                              alt="Breakfast dish 2"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Right column - 2 images stacked, offset */}
                        <div className="flex flex-col pt-16">
                          <div className="h-1/2 border-8 border-black border-l-4 border-b-4 overflow-hidden">
                            <img 
                              src={breakfastImages[2]} 
                              alt="Breakfast dish 3"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="h-1/2 border-8 border-black border-l-4 border-t-0 overflow-hidden">
                            <img 
                              src={breakfastImages[3]} 
                              alt="Breakfast dish 4"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : meal.type === 'Dinner' ? (
                    <div className="relative h-96 w-full max-w-2xl">
                      {/* Grid Layout with connected frames */}
                      <div className="grid grid-cols-2 gap-0 h-full">
                        {/* Left column - 2 images stacked */}
                        <div className="flex flex-col">
                          <div className="h-1/2 border-8 border-black border-r-4 border-b-4 overflow-hidden">
                            <img 
                              src={dinnerImages[0]} 
                              alt="Dinner dish 1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="h-1/2 border-8 border-black border-r-4 border-t-0 overflow-hidden">
                            <img 
                              src={dinnerImages[1]} 
                              alt="Dinner dish 2"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Right column - 2 images stacked, offset */}
                        <div className="flex flex-col pt-16">
                          <div className="h-1/2 border-8 border-black border-l-4 border-b-4 overflow-hidden">
                            <img 
                              src={dinnerImages[2]} 
                              alt="Dinner dish 3"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="h-1/2 border-8 border-black border-l-4 border-t-0 overflow-hidden">
                            <img 
                              src={dinnerImages[3]} 
                              alt="Dinner dish 4"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={meal.image} 
                      alt={meal.type}
                      className="rounded-2xl shadow-2xl w-full max-w-2xl h-auto"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Options Section */}
      <section className="py-32 mt-64" style={{backgroundColor: '#f3fadc'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={dietaryOptionsImage} 
                alt="Dietary options including freshly cooked meals, nutritious options, Australia grown ingredients, halal and vegetarian options"
                className="w-1/2 h-auto rounded-2xl shadow-lg mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                DIETARY OPTIONS
              </h2>
              <p className="text-15 text-gray-700 leading-relaxed">
                Dietary options such as vegetarian and halal are available. If you have allergies or specific needs, please notify us at the time of booking or get in touch with our team in advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest on Social Media */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-6 text-black">THE LATEST ON SOCIAL MEDIA</h2>
            <p className="main-text max-w-3xl mx-auto">
              Follow us for daily meal updates, behind-the-scenes kitchen moments, and guest favorites from across our locations.
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {[
              socialImage1, socialImage2, socialImage3, socialImage4, socialImage5,
              socialImage6, socialImage7, socialImage8, socialImage9, socialImage10,
              socialImage11, socialImage12, socialImage1, socialImage2, socialImage3,
              socialImage4, socialImage5, socialImage6, socialImage7, socialImage8,
              socialImage9, socialImage10, socialImage11, socialImage12, socialImage1,
              socialImage2, socialImage3, socialImage4, socialImage5, socialImage6
            ].map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={image} 
                  alt={`Azzurro Pod Hotels dining experience ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          

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
