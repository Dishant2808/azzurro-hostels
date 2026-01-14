import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function ManageBookingsPage() {
  const [activeTab, setActiveTab] = useState("Active");

  const tabs = ["Active", "Past", "Cancelled"];

  // Sample booking data
  const bookingData = {
    Active: [] as Array<{
      location: string;
      dates: string;
      property: string;
      propertyDates: string;
      price?: string;
      status: string;
      image: string;
    }>,
    Past: [
      {
        location: "Sydney",
        dates: "10—11 Feb 2025",
        property: "Little Drifter Surry Hills",
        propertyDates: "10—11 Feb",
        price: "AUD 54.90",
        status: "Completed",
        image: "/attached_assets/_6040048_1753349947349.jpg"
      }
    ],
    Cancelled: [
      {
        location: "Sydney",
        dates: "18—27 May 2024",
        property: "Veriu Central",
        propertyDates: "18—27 May 2024",
        status: "Cancelled",
        image: "/attached_assets/_6040098_1753349196590.jpg"
      },
      {
        location: "Sydney",
        dates: "28—30 Mar 2024",
        property: "No 9 Springfield",
        propertyDates: "13—20 Oct 2024",
        status: "Cancelled",
        image: "/attached_assets/_6040048_1753349947349.jpg"
      },
      {
        location: "Sydney",
        dates: "28—30 Mar 2024",
        property: "No 9 Springfield",
        propertyDates: "13—20 Oct 2024",
        status: "Cancelled",
        image: "/attached_assets/_6040048_1753349947349.jpg"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Back to Profile Button */}
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/User-Profile-Dashboard'}
          className="mb-6 p-0 h-auto text-gray-600 hover:text-gray-900 font-normal"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{activeTab.toUpperCase()}</h1>
          <div className="w-12 h-0.5 bg-gray-900"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 mx-2 font-medium text-15 transition-colors ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {bookingData[activeTab as keyof typeof bookingData].length === 0 ? (
          /* Empty State */
          <div className="text-center">
            {/* Illustration */}
            <div className="mb-8 flex justify-center">
              <svg width="200" height="300" viewBox="0 0 200 300" className="max-w-full h-auto">
                {/* Kangaroo 1 */}
                <g transform="translate(20, 100)">
                  {/* Body */}
                  <ellipse cx="30" cy="80" rx="25" ry="40" fill="#8B4513" />
                  {/* Head */}
                  <ellipse cx="30" cy="35" rx="20" ry="25" fill="#8B4513" />
                  {/* Ears */}
                  <ellipse cx="20" cy="15" rx="8" ry="20" fill="#8B4513" />
                  <ellipse cx="40" cy="15" rx="8" ry="20" fill="#8B4513" />
                  {/* Azzurro shirt */}
                  <ellipse cx="30" cy="80" rx="22" ry="35" fill="#1e3a8a" />
                  {/* A logo */}
                  <text x="30" y="90" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="bold">A</text>
                  {/* Arms */}
                  <ellipse cx="10" cy="60" rx="8" ry="15" fill="#8B4513" />
                  <ellipse cx="50" cy="60" rx="8" ry="15" fill="#8B4513" />
                  {/* Legs */}
                  <ellipse cx="20" cy="130" rx="8" ry="20" fill="#8B4513" />
                  <ellipse cx="40" cy="130" rx="8" ry="20" fill="#8B4513" />
                  {/* Tail */}
                  <ellipse cx="60" cy="100" rx="6" ry="30" fill="#8B4513" />
                </g>

                {/* Koala */}
                <g transform="translate(70, 120)">
                  {/* Body */}
                  <ellipse cx="30" cy="60" rx="22" ry="35" fill="#696969" />
                  {/* Head */}
                  <ellipse cx="30" cy="25" rx="18" ry="20" fill="#696969" />
                  {/* Ears */}
                  <circle cx="18" cy="12" r="12" fill="#696969" />
                  <circle cx="42" cy="12" r="12" fill="#696969" />
                  {/* Azzurro shirt */}
                  <ellipse cx="30" cy="60" rx="20" ry="30" fill="#1e3a8a" />
                  {/* A logo */}
                  <text x="30" y="70" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">A</text>
                  {/* Arms */}
                  <ellipse cx="12" cy="45" rx="6" ry="12" fill="#696969" />
                  <ellipse cx="48" cy="45" rx="6" ry="12" fill="#696969" />
                  {/* Legs */}
                  <ellipse cx="22" cy="100" rx="6" ry="15" fill="#696969" />
                  <ellipse cx="38" cy="100" rx="6" ry="15" fill="#696969" />
                </g>

                {/* Wombat */}
                <g transform="translate(130, 130)">
                  {/* Body */}
                  <ellipse cx="25" cy="50" rx="20" ry="30" fill="#8B4513" />
                  {/* Head */}
                  <ellipse cx="25" cy="20" rx="15" ry="18" fill="#8B4513" />
                  {/* Ears */}
                  <ellipse cx="15" cy="8" rx="5" ry="8" fill="#8B4513" />
                  <ellipse cx="35" cy="8" rx="5" ry="8" fill="#8B4513" />
                  {/* Hat */}
                  <ellipse cx="25" cy="5" rx="18" ry="8" fill="#654321" />
                  <ellipse cx="25" cy="2" rx="15" ry="6" fill="#654321" />
                  {/* Azzurro shirt */}
                  <ellipse cx="25" cy="50" rx="18" ry="25" fill="#1e3a8a" />
                  {/* A logo */}
                  <text x="25" y="60" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="bold">A</text>
                  {/* Arms */}
                  <ellipse cx="8" cy="35" rx="5" ry="10" fill="#8B4513" />
                  <ellipse cx="42" cy="35" rx="5" ry="10" fill="#8B4513" />
                  {/* Legs */}
                  <ellipse cx="18" cy="85" rx="5" ry="12" fill="#8B4513" />
                  <ellipse cx="32" cy="85" rx="5" ry="12" fill="#8B4513" />
                </g>
              </svg>
            </div>

            {/* Text */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              When are you coming back?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
              You haven't made any bookings yet. When you've made a booking it will appear here.
            </p>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {bookingData[activeTab as keyof typeof bookingData].map((booking, index) => (
              <div key={index}>
                {/* Location and Dates Header */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{booking.location}</h2>
                  <p className="text-gray-600">{booking.dates}</p>
                </div>

                {/* Booking Item */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <img 
                    src={booking.image} 
                    alt={booking.property}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-15">{booking.property}</h3>
                    <p className="text-gray-600">{booking.propertyDates}</p>
                    {booking.price && <p className="text-gray-600">• {booking.price}</p>}
                    <p className="text-gray-600">{booking.status}</p>
                  </div>
                </div>

                {/* Rebook Button for Past bookings */}
                {activeTab === "Past" && (
                  <div className="mt-4">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                      <RotateCcw className="w-5 h-5" />
                      <span className="font-medium">Rebook this property</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}