import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, Gift, Percent, Star, Menu, Search, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@assets/image_1753854193378.png";

export default function DiscountsOffersPage() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [emailSubmissions, setEmailSubmissions] = useState<number[]>([]);
  const [emailInputs, setEmailInputs] = useState<{[key: number]: string}>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Rewards - Azzurro Pod Hotels";
  }, []);

  const handleEmailSubmit = (offerIndex: number, email: string) => {
    if (email.trim()) {
      setEmailSubmissions(prev => [...prev, offerIndex]);
    }
  };

  const handleBookingClick = (offer: any) => {
    if (!isAuthenticated) {
      // Redirect to login page, then back to search
      window.location.href = '/api/login';
      return;
    }
    // If authenticated, go to search page
    window.location.href = '/search';
  };
  const currentOffers = [
    {
      title: "Winter Deal Special",
      discount: "25% OFF",
      description: "Extended stay discounts for bookings of 5+ nights during winter season (June-August)",
      validUntil: "August 31, 2024",
      code: "WINTER25",
      featured: true
    },
    {
      title: "Early Bird Booking",
      discount: "15% OFF",
      description: "Book 30 days in advance and save on your accommodation",
      validUntil: "Ongoing",
      code: "EARLY15",
      featured: false
    },
    {
      title: "Student Discount",
      discount: "10% OFF",
      description: "Discounted rates for students and backpackers with valid ID",
      validUntil: "Ongoing",
      code: "STUDENT10",
      featured: false
    },
    {
      title: "Long Stays",
      discount: "20% OFF",
      description: "Special rates for extended stays of 7 or more nights",
      validUntil: "Ongoing",
      code: "LONGSTAY20",
      featured: false
    }
  ];

  const seasonalOffers = [
    {
      season: "Summer Special",
      period: "December - February",
      offer: "Free harbour cruise ticket with 3+ night stays",
      description: "Enjoy Sydney's beautiful summer weather with a complimentary harbour experience."
    },
    {
      season: "Spring Awakening",
      period: "September - November", 
      offer: "Botanical Gardens tour included",
      description: "Discover Sydney's blooming gardens with our guided walking tour."
    },
    {
      season: "Autumn Explorer",
      period: "March - May",
      offer: "Museum pass for two major attractions",
      description: "Perfect weather for exploring Sydney's cultural attractions."
    }
  ];

  const loyaltyBenefits = [
    {
      tier: "Sydney Freshman",
      subtitle: "(Free to Join)",
      benefits: ["Earn points for every booking", "Access exclusive member-only offers", "Early access to flash deals"],
      icon: "🟢",
      borderColor: "#22c55e"
    },
    {
      tier: "Sydney Explorer", 
      subtitle: "(8+ Bookings or $2,000 Spent)",
      benefits: ["Free towel rental during every stay", "Earn bonus points on every booking"],
      icon: "🔵",
      borderColor: "#3b82f6"
    },
    {
      tier: "Sydney Expert",
      subtitle: "(15+ Bookings)", 
      benefits: ["Priority pass at dinner serving time", "Free laundry pods (1 per stay)", "Complimentary towel and linen set every stay", "15% off all future bookings"],
      icon: "🟣",
      borderColor: "#8b5cf6"
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
      <section className="relative overflow-hidden flex items-center justify-center" style={{minHeight: '70vh'}}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Cozy reading setup with sunglasses and book on bed" 
            className="w-full h-full object-cover"
            style={{minHeight: '70vh'}}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Comfort Comes With Perks
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Book smarter—earn rewards with every visit
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="!bg-white !text-black hover:!bg-gray-100 hover:!text-black px-8 py-3 rounded-full font-bold text-15 min-w-[140px] transition-all duration-300 shadow-lg border border-gray-200"
              onClick={() => window.location.href = '/api/login'}
            >
              JOIN NOW
            </Button>
            <Button 
              className="!bg-white !text-black hover:!bg-gray-100 hover:!text-black px-8 py-3 rounded-full font-bold text-15 min-w-[140px] transition-all duration-300 shadow-lg border border-gray-200"
              onClick={() => window.location.href = '/api/login'}
            >
              LOG IN
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1: Sign Up */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{backgroundColor: '#0b1957'}}>
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create a free account & start collecting stay rewards.
              </p>
            </div>

            {/* Step 2: Stay & Earn */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{backgroundColor: '#0b1957'}}>
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay & Earn</h3>
              <p className="text-gray-600 leading-relaxed">
                Each booking adds points to your travel wallet.
              </p>
            </div>

            {/* Step 3: Redeem */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{backgroundColor: '#0b1957'}}>
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Redeem</h3>
              <p className="text-gray-600 leading-relaxed">
                Use your points for discounts, free nights & perks!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Earn Points Section */}
      <section className="py-20" style={{backgroundColor: '#f3fadc'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ways to Earn Points</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Every action gets you closer to more perks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Sign Up */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">SIGN UP</h3>
              <p className="text-black text-15">100 Points</p>
            </div>

            {/* Celebrate Birthday */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V6.454a1.5 1.5 0 011.5-.454c.523 0 1.046.151 1.5.454a2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0c.454-.303.977-.454 1.5-.454A1.5 1.5 0 0121 6.454v9.092z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">CELEBRATE A BIRTHDAY</h3>
              <p className="text-black text-15">100 Points</p>
            </div>

            {/* Follow Instagram */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">FOLLOW ON INSTAGRAM</h3>
              <p className="text-black text-15">10 Points</p>
            </div>

            {/* Follow TikTok */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">FOLLOW ON TIKTOK</h3>
              <p className="text-black text-15">10 Points</p>
            </div>

            {/* Leave Review */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">LEAVE A REVIEW</h3>
              <p className="text-black text-15">50 Points</p>
            </div>

            {/* Book First Night */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">BOOK YOUR FIRST NIGHT WITH US</h3>
              <p className="text-black text-15">300 Points</p>
            </div>

            {/* Refer a Friend */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">REFER A FRIEND</h3>
              <p className="text-black text-sm">You both receive $15 off for your next stay</p>
            </div>

            {/* Book Again Within 3 Months */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">BOOK AGAIN WITHIN 3 MONTHS</h3>
              <p className="text-black text-15">100 Points</p>
            </div>

            {/* Mention Us on Instagram or TikTok */}
            <div className="bg-white border border-gray-300 rounded-2xl p-8 text-center text-black">
              <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 16V6a2 2 0 012-2h6a2 2 0 012 2v14l-5-3-5 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">MENTION US ON INSTAGRAM OR TIKTOK</h3>
              <p className="text-black text-15">50 Points</p>
            </div>
          </div>
        </div>
      </section>
      {/* Reward Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Reward Perks</h2>
            <p className="text-15 text-gray-600 max-w-3xl mx-auto">
              The more you stay, the more you save. Our loyalty program rewards frequent guests with exclusive benefits and discounts.
            </p>
          </div>


          {/* Comparison Table */}
          <div className="bg-white rounded-lg overflow-hidden border-2 border-black">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black" style={{backgroundColor: '#f3fadc'}}>
                    <th className="text-left p-6 text-black font-bold text-15 border-r-2 border-black">PERKS</th>
                    <th className="text-center p-6 text-black font-bold text-15 border-r-2 border-black">
                      SYDNEY FRESHMAN<br/>
                      <span className="text-sm font-normal">(FREE TO JOIN)</span>
                    </th>
                    <th className="text-center p-6 text-black font-bold text-15 border-r-2 border-black">
                      SYDNEY EXPLORER<br/>
                      <span className="text-sm font-normal">(8+ BOOKINGS OR $2,000 SPENT)</span>
                    </th>
                    <th className="text-center p-6 text-black font-bold text-15">
                      SYDNEY EXPERT<br/>
                      <span className="text-sm font-normal">(15+ BOOKINGS)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">BASE BOOKING DISCOUNT</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">15%</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">20%</td>
                    <td className="text-center p-6 text-15">25–30%</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">ONE-TIME DISCOUNT FOR<br/>JOINING TIER</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">15%</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">20%</td>
                    <td className="text-center p-6 text-15">30%</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">BIRTHDAY REWARD</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">$10</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">$15</td>
                    <td className="text-center p-6 text-15">$25</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">EARLY ACCESS TO DISCOUNT</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">★</td>
                    <td className="text-center p-6 text-15">★</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">FREE LAUNDRY TOKENS</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">1 per stay</td>
                    <td className="text-center p-6 text-15">2 per stay</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">FREE TOILETRIES KIT</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">1 per month</td>
                    <td className="text-center p-6 text-15">1 per stay</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">PRIORITY ON BOTTOM BUNK<br/>(if available)</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">★</td>
                    <td className="text-center p-6 text-15">★</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">DINNER PRIORITY ACCESS</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">★</td>
                    <td className="text-center p-6 text-15">★</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">FREE ROOM UPGRADE<br/>(if available)</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">1 per quarter</td>
                    <td className="text-center p-6 text-15">1 per stay</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">REFERRAL CREDIT<br/>(per new guest)</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">$5</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">$10</td>
                    <td className="text-center p-6 text-15">$10 + bonus entry</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-6 font-medium text-black italic text-15 border-r-2 border-black">ANNUAL GRAND TRIP DRAW<br/>(Bali, etc.)</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">—</td>
                    <td className="text-center p-6 border-r-2 border-black text-15">1 entry</td>
                    <td className="text-center p-6 text-15">2 entries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>




      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Don't miss any discounts — Be the first to know
              </h2>
            </div>
            <div className="md:w-1/2 flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter email address here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                />
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-base">
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
                <li><Link href="/discounts-offers" className="text-gray-300 hover:text-white transition-colors text-sm">Discounts & Offers</Link></li>
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