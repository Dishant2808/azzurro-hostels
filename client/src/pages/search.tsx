import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Search as SearchIcon,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";

export default function SearchPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [, navigate] = useLocation();

  const locations = [
    "Potts Point",
    "Surry Hills",
    "Central Sydney",
    "Darling Harbour",
  ];

  // Global search functionality
  const searchableContent = [
    {
      type: "location",
      title: "Potts Point",
      url: "/potts-point",
      description: "Vibrant neighborhood with cafes and nightlife",
    },
    {
      type: "location",
      title: "Surry Hills",
      url: "/surry-hills",
      description: "Trendy area with boutique shops and restaurants",
    },
    {
      type: "location",
      title: "Central Sydney",
      url: "/central-sydney",
      description: "Heart of the city with business district",
    },
    {
      type: "location",
      title: "Darling Harbour",
      url: "/darling-harbour",
      description: "Waterfront precinct with attractions",
    },
    {
      type: "page",
      title: "About Us",
      url: "/about",
      description: "Learn about our mission and team",
    },
    {
      type: "page",
      title: "Breakfast & Dinner",
      url: "/breakfast-dinner",
      description: "Our complimentary meal services",
    },
    {
      type: "page",
      title: "Rewards",
      url: "/discounts-offers",
      description: "Current promotions and loyalty program",
    },
    {
      type: "page",
      title: "FAQ",
      url: "/faq",
      description: "Frequently asked questions",
    },
    {
      type: "amenity",
      title: "Free WiFi",
      url: "/",
      description: "High-speed internet access",
    },
    {
      type: "amenity",
      title: "Pod Beds",
      url: "/",
      description: "Private sleeping pods with curtains",
    },
    {
      type: "amenity",
      title: "Shared Kitchen",
      url: "/",
      description: "Fully equipped kitchen facilities",
    },
    {
      type: "amenity",
      title: "Laundry",
      url: "/",
      description: "Washing machines and dryers",
    },
  ];

  // Get search query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, []);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(filtered);
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Global Header */}
      <GlobalHeader
        onMenuClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      />

      {/* Search Results or Main Search Section */}
      <section className="pt-32 pb-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery ? (
            // Search Results
            <div>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Search Results for "{searchQuery}"
                </h1>
                <p className="text-15 text-gray-600">
                  Found {searchResults.length} results
                </p>
              </div>

              {/* Search Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {searchResults.map((result, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="capitalize">
                          {result.type}
                        </Badge>
                      </div>
                      <Link href={result.url}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {result.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600">{result.description}</p>
                      <Link href={result.url}>
                        <Button
                          className="mt-4 w-full"
                          style={{ backgroundColor: "#0b1957" }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {searchResults.length === 0 && (
                <div className="text-center py-12">
                  <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try searching for locations, amenities, or services.
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Default Search Section
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find Your Perfect Stay
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Search and book your accommodation at any of our Sydney
                locations
              </p>
            </div>
          )}

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                className="w-full text-white py-3 text-15 font-semibold"
                style={{ backgroundColor: "#0b1957" }}
              >
                <SearchIcon className="w-5 h-5 mr-2 text-white" />
                <span className="text-white">Search Available Rooms</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Rooms Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Available Rooms
          </h2>

          <div className="space-y-6">
            {/* Room Results - Placeholder for now */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Pod Room - Single Bed
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Potts Point</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>1 Guest</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Free WiFi</li>
                      <li>• Air conditioning</li>
                      <li>• Shared bathroom</li>
                      <li>• Privacy curtains</li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      $45/night
                    </div>
                    <Button
                      style={{ backgroundColor: "#22c55e" }}
                      className="text-white"
                    >
                      Select Room
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Pod Room - Double Bed
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Potts Point</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>2 Guests</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Free WiFi</li>
                      <li>• Air conditioning</li>
                      <li>• Shared bathroom</li>
                      <li>• Privacy curtains</li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      $65/night
                    </div>
                    <Button
                      style={{ backgroundColor: "#22c55e" }}
                      className="text-white"
                    >
                      Select Room
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
