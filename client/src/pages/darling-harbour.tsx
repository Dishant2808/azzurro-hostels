import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { FormattedPrice } from "@/components/Price";
import {
  MapPin,
  Phone,
  Star,
  Wifi,
  Coffee,
  Train,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  AirVent,
  Heater,
  WifiIcon,
  Tv,
  Utensils,
  Shirt,
  Bath,
  Wrench,
  Calendar,
  Users,
  Menu,
  Search,
} from "lucide-react";

// Import the new Darling Harbour Hotel Azzurro image
import darlingHarbourExterior from "@assets/ChatGPT Image Jul 28, 2025, 02_52_33 PM_1753678362730.png";
import AdvanceSearchAndResult from "@/components/AdvanceSearchBar";

export default function DarlingHarbourPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const images = [
    darlingHarbourExterior,
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Global Header */}
      <GlobalHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Page Content */}
      <div className="pt-16">
        {/* Header Section */}
        <section className="py-8 mt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hotel Name and Rating */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Azzurro Pod Hotels - Darling Harbour
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="bg-blue-900 text-white px-2 py-1 rounded text-sm font-bold ml-2">
                      9.0
                    </span>
                  </div>
                  <span className="text-gray-600">67 reviews</span>
                  <span className="text-sm text-gray-500">Excellent</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>22 Allen Street, Pyrmont, NSW 2009</span>
                  </div>
                  <span className="text-green-600 font-medium">
                    Good Location
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Show on Map
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <span className="text-sm text-blue-600">We Price Match</span>
              </div>
            </div>

            {/* Main Content: Images Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Side: Image Gallery */}
              <div className="space-y-4">
                {/* Main Large Image */}
                <div className="relative">
                  <img
                    src={images[currentImageIndex]}
                    alt="Darling Harbour main view"
                    className="w-full h-96 object-cover rounded-lg"
                    style={{ objectPosition: "center center" }}
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  <img
                    src={images[0]}
                    alt="Main view"
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                  <img
                    src={images[1]}
                    alt="Room view"
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                  <img
                    src={images[2]}
                    alt="Common area"
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                  <div className="relative bg-gray-100 rounded flex items-center justify-center h-20 cursor-pointer hover:bg-gray-200">
                    <span className="text-xs text-gray-600 font-medium">
                      10+ photos
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className="space-y-6">
                {/* Location Description */}
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Darling Harbour offers visitors an iconic Sydney waterfront
                    experience with world-class attractions, dining, and
                    entertainment. Located in the heart of Sydney, this vibrant
                    precinct features museums, aquariums, and shopping centers
                    all within walking distance of your accommodation.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Explore Chinatown's authentic cuisine, stroll through the
                    Chinese Garden of Friendship, or catch a show at the ICC
                    Sydney. The historic Powerhouse Museum and SEA LIFE Sydney
                    Aquarium are perfect for day-time adventures, while the
                    waterfront restaurants offer stunning harbor views for
                    evening dining.
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span>3:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span>11:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property type:</span>
                      <span>Pod Hotel</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages:</span>
                      <span>English, Mandarin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-12 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <AirVent className="h-8 w-8" />
                <span className="text-xs">Air Condition</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Heater className="h-8 w-8" />
                <span className="text-xs">Heater</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <WifiIcon className="h-8 w-8" />
                <span className="text-xs">Free WiFi</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Tv className="h-8 w-8" />
                <span className="text-xs">
                  Privacy curtains next to the bed
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Utensils className="h-8 w-8" />
                <span className="text-xs">Towels (upon request)</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Shirt className="h-8 w-8" />
                <span className="text-xs">
                  Shared kitchen with kitchen equipment provided
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Bath className="h-8 w-8" />
                <span className="text-xs">Laundry onsite (extra charges)</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Wrench className="h-8 w-8" />
                <span className="text-xs">24hrs Remote Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Guest Reviews Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Guest who Stay here Loved
                </h2>
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">
                      "It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English."
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                        H
                      </div>
                      <div>
                        <p className="font-semibold">Harper</p>
                        <p className="text-sm text-gray-500">United Kingdom</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Interactive Map</p>
                    <Button className="mt-4 bg-blue-900 text-white">
                      Show on Map
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="py-12">
          <AdvanceSearchAndResult selectedLocation="Darling Harbour" />
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't miss any discounts — Be the first to know
            </h2>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <input
                type="email"
                placeholder="Enter email address here"
                className="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-900 text-white px-8 py-3">
                Get Discounts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
