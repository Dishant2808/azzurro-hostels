import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Award, Shield, Lightbulb, Menu, Search, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import azzurroHotelSign from "@assets/スクリーンショット 2025-07-24 154511_1753442950525.png";
import heroImage from "@assets/image_1753752635183.png";
import pottsPointRoom from "@assets/20250610_160057 (1)_1753347090131.jpg";
import surryHillsRoom from "@assets/_6040098_1753349196590.jpg";
import centralSydneyRoom from "@assets/_6040048_1753349947349.jpg";
import darlingHarbourRoom from "@assets/ChatGPT Image Jul 28, 2025, 02_52_33 PM_1753678362730.png";
import teamImage from "@assets/ChatGPT Image Jun 10, 2025, 11_34_22 PM_1753755511764.png";
import coreValuesImage from "@assets/image_1754561677153.png";

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former hospitality executive with 15 years of experience in luxury hotels across Asia-Pacific.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Marco Rodriguez",
      role: "Head of Operations",
      bio: "Operations specialist focused on efficiency and guest experience optimization.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Emma Wilson",
      role: "Guest Experience Manager",
      bio: "Passionate about creating memorable experiences and ensuring every guest feels welcomed.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
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
      <section className="relative overflow-hidden -mt-4 h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Mountain road with car and clouds - representing the journey to the perfect stay"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              Our Story & Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Stay we always wanted
            </h1>
          </div>
        </div>
      </section>

      {/* Our Journey Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 text-15 text-gray-700 leading-relaxed">
            <p>
              You know that feeling when you arrive in a new city… and all you want is something easy, warm, and just a little familiar?
            </p>
            <p>
              That's how Azzurro Hotels started — out of all the little moments that didn't quite work when we were traveling. We'd get to a place late and miss dinner because we didn't make a reservation. We'd want to cook… but hotels didn't have a kitchen. We'd crave comfort, but didn't want to splurge.
            </p>
            <p className="text-xl font-semibold text-gray-900">
              So we built the kind of stay we always wished we had.
            </p>
            <p>
              Azzurro is for the in-between moments — where a hot, home-cooked meal is waiting (no booking needed), where beds are affordable yet private, and where the vibe is homely, cozy, and genuine.
            </p>
            <div className="py-6">
              <p className="text-xl font-bold text-gray-900 mb-2">
                We're not a hotel. We're not a hostel.
              </p>
              <p className="text-15 text-gray-900 font-medium">
                We're what happens when real travelers build a place for other real travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24" style={{backgroundColor: '#f3fadc'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-medium mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  Our Team
                </div>
                <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                  Meet the Team Behind Azzurro
                </h2>
              </div>
              <div className="space-y-6 text-15 text-black leading-relaxed">
                <p className="body-text">
                  Behind every great stay is a passionate team dedicated to creating exceptional experiences. At Azzurro Hotels, our diverse group of hospitality professionals, tech innovators, and local Sydney experts work together to make every guest feel welcome, comfortable, and connected.
                </p>
                <p className="body-text">
                  From the friendly coordinators who greet you with genuine warmth, to the housekeeping team keeping everything spotless, to the chefs preparing fresh, home-cooked meals each day — every detail is handled with care.
                </p>
                <p className="body-text">
                  Azzurro Hotels is a collection of modern, thoughtfully designed pod-style accommodations made for travelers who value comfort, convenience, and local connection. Whether you're visiting Sydney for the first time or returning for another adventure, Azzurro offers a home away from home — with cozy beds, seamless digital access, and comforting meals to start and end your day right.
                </p>
                <p className="body-text">
                  We believe travel should be stress-free, social, and affordable — without compromising on quality. That's why we've reimagined the hostel experience: blending smart technology, flexible stays, and the warmth of real hospitality in central city locations, just minutes from transport and iconic sights.
                </p>
              </div>
            </div>
            <div className="relative max-w-md mx-auto">
              <img 
                src={teamImage} 
                alt="Azzurro Team"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              What Drives Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide every decision we make and every experience we create for our guests.
            </p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={coreValuesImage} 
              alt="Core Values - Three overlapping circles showing Comfort & Privacy, Community & Connection, and Accessibility & Affordability"
              className="max-w-xl h-auto"
            />
          </div>
        </div>
      </section>

      {/* Locations Showcase Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience Sydney from four prime locations, each offering unique character and convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 items-stretch">
            {/* Potts Point */}
            <div className="group relative overflow-hidden bg-white flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={pottsPointRoom}
                  alt="Potts Point pod rooms"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Potts Point</h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                  Potts Point offers an experience for visitors seeking a memorable stay in Sydney. Visit the markets by day that offer local crafts and food.
                </p>
                <div className="text-center mt-auto pt-4">
                  <Link href="/potts-point">
                    <Button 
                      className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-medium w-full"
                    >
                      View Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Surry Hills */}
            <div className="group relative overflow-hidden bg-white flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={surryHillsRoom}
                  alt="Surry Hills interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Surry Hills</h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                  A neighbourhood where charming streets are lined with cafés, fashion-forward boutiques, and global eateries. Hunt for vintage treasures and delicious treats at the Surry Hills Markets.
                </p>
                <div className="text-center mt-auto pt-4">
                  <Link href="/surry-hills">
                    <Button 
                      className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-medium w-full"
                    >
                      View Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Central Sydney */}
            <div className="group relative overflow-hidden bg-white flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={centralSydneyRoom}
                  alt="Central Sydney dining area"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Central Sydney</h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                  A historic district of modern skyscrapers with distinctive buildings. Lush parks create a welcome oasis amidst the urban energy. Central is a financial and cultural powerhouse, offering easy access to iconic world-class attractions.
                </p>
                <div className="text-center mt-auto pt-4">
                  <Link href="/central-sydney">
                    <Button 
                      className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-medium w-full"
                    >
                      View Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Darling Harbour */}
            <div className="group relative overflow-hidden bg-white flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={darlingHarbourRoom}
                  alt="Darling Harbour hallway"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Darling Harbour</h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                  Stroll through streets lined with cafes, unwinding in Pirrama Park's green space, and enjoying stunning harbour views all within easy reach of the city centre. Pyrmont provides the perfect blend of relaxation and urban connection.
                </p>
                <div className="text-center mt-auto pt-4">
                  <Link href="/darling-harbour">
                    <Button 
                      className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-medium w-full"
                    >
                      View Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
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
              <ul className="space-y-3">
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
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><a href="/partnerships" className="text-gray-300 hover:text-white transition-colors text-sm">Partnerships</a></li>
                <li><a href="/jobs-internships" className="text-gray-300 hover:text-white transition-colors text-sm">Jobs & Internships</a></li>
              </ul>
            </div>

            {/* Offers Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Offers</h3>
              <ul className="space-y-3">
                <li><Link href="/breakfast-dinner" className="text-gray-300 hover:text-white transition-colors text-sm">Breakfast & Dinner</Link></li>
                <li><Link href="/discounts-offers" className="text-gray-300 hover:text-white transition-colors text-sm">Rewards</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQs</Link></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700/50 pt-6 mt-8">
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
