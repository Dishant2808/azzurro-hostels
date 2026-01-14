import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, Heart, Eye, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { FormattedPrice } from "@/components/Price";

export default function UserProfileDashboardPage() {
  const { user } = useAuth();
  const [userPoints] = useState(100); // Mock points for now

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="max-w-sm mx-auto px-4 py-4">
        {/* Back to Homepage Button */}
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/'}
          className="mb-4 p-0 h-auto text-gray-600 hover:text-gray-900 font-normal"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Homepage
        </Button>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your profile, rewards, and bookings</p>
        </div>

        {/* Points and Rewards Header */}
        <div className="mb-4">
          <div 
            className="rounded-full px-4 py-2.5 text-white font-bold text-base mb-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#2C5F5A'}}
            onClick={() => window.location.href = '/my-rewards'}
          >
            <span>{userPoints} POINTS</span>
            <div className="flex items-center">
              <span className="mr-2">My Rewards</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-gray-400 text-gray-700 font-semibold py-2.5 rounded-full hover:bg-gray-50 text-sm"
            onClick={() => window.location.href = '/manage-bookings'}
          >
            MANAGE BOOKINGS
          </Button>
        </div>

        {/* Favorites Section */}
        <section className="mb-4">
          <h2 className="text-15 font-bold text-gray-900 mb-2">
            Favorites
          </h2>
          <Card className="border border-gray-300 rounded-lg">
            <CardContent className="p-4 text-center text-gray-500 text-sm">
              No favorited products
            </CardContent>
          </Card>
        </section>

        {/* Recently Viewed Section */}
        <section className="mb-4">
          <h2 className="text-15 font-bold text-gray-900 mb-2">
            Recently Viewed
          </h2>
          <Card className="border border-gray-300 rounded-lg">
            <CardContent className="p-4 text-center text-gray-500 text-sm">
              No recently viewed products
            </CardContent>
          </Card>
        </section>

        {/* Links Section */}
        <section className="mb-4 space-y-3">
          <Link href="/faq">
            <div className="flex items-center text-base font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
              FAQs
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </Link>
          
          <div className="flex items-center text-base font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
            Contact Us
            <ExternalLink className="w-4 h-4 ml-2" />
          </div>
        </section>

        {/* Best Sellers Section */}
        <section>
          <h2 className="text-15 font-bold text-gray-900 mb-3">Best Sellers</h2>
          <div className="space-y-3">
            {/* Mixed Pod Twin Room */}
            <Card className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/attached_assets/_6040048_1753349947349.jpg" 
                  alt="Mixed Pod Twin Room" 
                  className="w-full h-28 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Heart className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <CardContent className="p-2.5">
                <h3 className="font-bold text-gray-900 mb-1 text-xs">Mixed Pod Twin Room (Shared Bathroom)</h3>
                <div className="flex items-center mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From hotel</span>
                    <FormattedPrice audPrice={104} className="font-bold text-xs" />
                    <span className="text-xs text-green-600">Free cancellation</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* MIXED POD ROOM - 4 people bedroom */}
            <Card className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/attached_assets/_6040098_1753349196590.jpg" 
                  alt="Mixed Pod Room 4 people" 
                  className="w-full h-28 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Heart className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <CardContent className="p-2.5">
                <h3 className="font-bold text-gray-900 mb-1 text-xs">MIXED POD ROOM - 4 people bedroom</h3>
                <div className="flex items-center mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From hotel</span>
                    <FormattedPrice audPrice={104} className="font-bold text-xs" />
                    <span className="text-xs text-green-600">Free cancellation</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Female only Pod room - 6 people bedroom */}
            <Card className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/attached_assets/female_podroom_6_people.jpg" 
                  alt="Female only Pod room" 
                  className="w-full h-28 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Heart className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <CardContent className="p-2.5">
                <h3 className="font-bold text-gray-900 mb-1 text-xs">Female only Pod room - 6 people bedroom</h3>
                <div className="flex items-center mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From hotel</span>
                    <FormattedPrice audPrice={136} className="font-bold text-xs" />
                    <span className="text-xs text-green-600">Free cancellation</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}