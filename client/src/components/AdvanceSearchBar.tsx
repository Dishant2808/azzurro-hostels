import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FormattedPrice, PriceWithOriginal } from "@/components/Price";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import {
  Zap,
  Eye,
  Lightbulb,
  Search,
  Filter,
  Star,
  Heart,
  Wifi,
  Car,
  Utensils,
  Coffee,
  MapPin,
  Users,
  Calendar,
  SlidersHorizontal,
  X,
  ChevronDown,
  BedDouble,
  Bath,
  Smartphone,
  Tv,
  ChevronLeft,
  ChevronRight,
  Bed,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAvailableRooms } from "@/hooks/useAvailableRooms";
import { AvailableRoomType } from "@/api/room.types";
import { getPropertiesMap } from "@/lib/properties.spec";
import RoomDetailsDialog from "@/components/RoomDetailsDialog";

// Import the same images from home page
import mixedPodTwinRoom from "@assets/mixed_pod_twin_room.png";
import mixedPodRoom4People from "@assets/_1019424_1753345796262.jpg";
import femalePodroom6People from "@assets/female_podroom_6_people.jpg";
import doubleBedroom from "@assets/ChatGPT Image Jul 24, 2025, 06_53_57 PM_1753347578570.png";
import FilterBar from "@/components/FilterBar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { roomTypeCategories } from "@/lib/properties.spec";
import { QuantitySelector } from "@/components/QuantitySelector";
import RoomCard from "./RoomCard";

export default function AdvanceSearchAndResult({
  selectedLocation = "Sydney, Australia",
}: {
  selectedLocation: string;
}) {
  const { toast } = useToast();
  const { addItem, items } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [roomResults, setRoomResults] = useState<AvailableRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoomType | null>(
    null,
  );
  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);

  const firstPageLoad = useRef(true);

  // Property IDs for each location
  const propertyIds: { [key: string]: string[] } = {
    "Sydney, Australia": ["311134", "311272"],
    "Potts Point": ["311134"],
    "Surry Hills": ["311272"],
    "Central Sydney": ["311134"],
    "Darling Harbour": ["311272"],
    "Demo Property": ["317399"],
  };

  const properties = getPropertiesMap();

  const { data, isLoading, isError, error, refetch } = useAvailableRooms(
    checkInDate,
    checkOutDate,
    adults,
    children,
    rooms,
    propertyIds[selectedLocation].join(","),
  );

  // Fetch room types from API
  useEffect(() => {
    if (data && !roomResults?.length) {
      setRoomResults(data);
      firstPageLoad.current = false;
    }
  }, [data]);

  const addToCart = (
    room: AvailableRoomType,
    quantity: number,
    guests: number = 1,
  ) => {
    // Create cart item with proper structure
    const cartItem = {
      id: `${room.roomTypeID}-${Date.now()}`, // Unique ID with timestamp
      name: room.roomTypeName || room.roomTypeNameShort || "Room",
      price: quantity * room.roomRate || 0,
      image: room.roomTypePhotos?.[0]?.image || mixedPodTwinRoom, // Use first photo's image URL or fallback
      dates: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
      },
      isPrivate: room.isPrivate,
      quantity: quantity,
      guests: guests,
      location: properties[room.propertyID].propertyName || "Azzurro Pod Hotel",
      propertyID: room.propertyID,
      roomTypeID: room.roomTypeID,
      roomRateID: room.roomRateID,
    };

    // Add to cart
    addItem(cartItem);

    toast({
      title: "Room Added to Cart",
      description: `${cartItem.name} has been added to your booking cart.`,
      duration: 3000,
    });
  };

  const handleViewDetails = (room: AvailableRoomType) => {
    setSelectedRoom(room);
    setIsRoomDetailsOpen(true);
  };

  // ⬅️ Manage filter state here
  const [filters, setFilters] = useState({
    roomType: [] as string[],
    bedType: [] as string[],
    bathroomType: [] as string[],
  });

  // const handleSearchChange = async () => {
  //   try {
  //     const queryParams = new URLSearchParams();
  //     queryParams.append("startDate", checkInDate);
  //     queryParams.append("endDate", checkOutDate);
  //     queryParams.append("adults", adults.toString());
  //     queryParams.append("children", children.toString());
  //     queryParams.append("rooms", rooms.toString());
  //     queryParams.append("location", propertyIds[selectedLocation].join(","));

  //     const response = await fetch(
  //       `/api/availableRooms?${queryParams.toString()}`,
  //     );
  //     const data = await response.json();

  //     if (data.success) {
  //       console.log("Room Types:", data.data);
  //       setRoomResults(data.data);
  //       toast({
  //         title: "Search Updated",
  //         description: `Searching for rooms in ${selectedLocation} for ${adults} adults, ${children} children`,
  //         duration: 3000,
  //       });
  //     } else {
  //       console.error("Failed to fetch room types:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching room types:", error);
  //   }
  // };

  const handleCheckinDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(e.target.value);
    if (new Date(e.target.value).getTime() < new Date(checkOutDate).getTime())
      return;
    if (!e.target.value) return;
    setCheckOutDate(
      new Date(new Date(e.target.value).getTime() + 86400000)
        .toISOString()
        .split("T")[0],
    );
  };

  return (
    <div className="flex-col justify-center min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <GlobalHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Search Results Section */}
      {isError && <div></div>}
      

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Results Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Availability
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Prices on-screen (per Unit)
          </p>
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Search Bar - positioned right under the fixed header */}
            <section className="w-full">
              <div className="flex justify-center w-full mx-auto py-2 ">
                <div className="flex flex-col md:flex-row w-full items-center items-stretch rounded-lg overflow-hidden border-2 border-orange-400 shadow-md">
                  {/* Date Selection */}
                  <div className="flex items-center bg-white px-6 py-4 flex-1 border-r border-orange-400">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="flex-1 flex gap-2">
                      <div className="flex-1">
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={handleCheckinDateChange}
                          className="w-full text-sm font-medium text-gray-700 border-0 focus:ring-0 focus:outline-none bg-transparent"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full text-sm font-medium text-gray-700 border-0 focus:ring-0 focus:outline-none bg-transparent"
                          min={
                            checkInDate &&
                            !isNaN(new Date(checkInDate).getTime())
                              ? new Date(
                                  new Date(checkInDate).getTime() + 86400000,
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest and Room Selection */}
                  <Dialog
                    open={isGuestDialogOpen}
                    onOpenChange={setIsGuestDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <div className="flex items-center bg-white px-6 py-4 flex-1 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Users className="h-5 w-5 text-gray-500 mr-3" />
                        <div className="flex-1">
                          <div className="text-gray-700 font-medium">
                            {adults} adults • {rooms} room
                            {rooms > 1 ? "s" : ""}
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Guests and Rooms</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Adults</div>
                            <div className="text-sm text-gray-500">
                              Ages 18 or above
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              disabled={adults <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{adults}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setAdults(adults + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* Children */}
                        {/* <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Children</div>
                              <div className="text-sm text-gray-500">Ages 0-12</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setChildren(Math.max(0, children - 1))
                                }
                                disabled={children <= 0}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{children}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setChildren(children + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div> */}

                        {/* Rooms */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Rooms</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setRooms(Math.max(1, rooms - 1))}
                              disabled={rooms <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{rooms}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setRooms(rooms + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsGuestDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsGuestDialogOpen(false)}>
                          Apply
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Change Search Button */}
                  <Button
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-none font-medium text-base transition-colors h-full"
                    onClick={() => {
                      setRoomResults(data);
                    }}
                  >
                    Change search
                  </Button>
                </div>
              </div>
            </section>
          </div>
          {isLoading && !roomResults?.length && (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          )}

          {/* Room Grid */}
          {roomResults && (
            <div className="grid grid-cols-1 gap-6">
              {roomResults.map((room) => (
                <RoomCard
                  room={room}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="azzurro-navy-bg text-white py-12">
        <div className="content-centered px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-8 mb-12">
            {/* Azzurro Hotels Column */}
            <div className="md:col-span-1 flex flex-col pr-4">
              <h3 className="text-xl font-semibold text-white mb-6">
                Azzurro Hotels
              </h3>
              <p className="text-white leading-relaxed mb-8 text-sm max-w-[200px] break-words">
                For Better Comfort and Experience.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-3 mt-auto">
                <a
                  href="https://www.facebook.com/profile.php?id=61563267666626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/azzurropodhostels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@azzurropodhostels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="tel:+61440133104"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/locations"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/potts-point"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Potts Point
                  </Link>
                </li>
                <li>
                  <Link
                    href="/surry-hills"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Surry Hills
                  </Link>
                </li>
                <li>
                  <Link
                    href="/central-sydney"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Central Sydney
                  </Link>
                </li>
                <li>
                  <Link
                    href="/darling-harbour"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Darling Harbour
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="/partnerships"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Partnerships
                  </a>
                </li>
                <li>
                  <a
                    href="/jobs-internships"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Jobs & Internships
                  </a>
                </li>
              </ul>
            </div>

            {/* Offers Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Offers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/breakfast-dinner"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Breakfast & Dinner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/discounts-offers"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-15 font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
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
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">-</span>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Room Details Dialog */}
      <RoomDetailsDialog
        room={selectedRoom}
        isOpen={isRoomDetailsOpen}
        onOpenChange={setIsRoomDetailsOpen}
        onBookNow={addToCart}
      />
    </div>
  );
}
