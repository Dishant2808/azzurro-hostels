import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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
import FavoriteButton from "@/components/FavoriteButton";

// FormattedPrice Component
const FormattedPrice = ({ price }: { price: number }) => {
  const { formatPrice } = useCurrency();
  return <span>{formatPrice(price)}</span>;
};

export default function SearchResults() {
  const { toast } = useToast();
  const { addItem, items, openBottomPanel } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Helper function to get URL parameters
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      checkInDate: params.get('checkInDate') || new Date(Date.now() + 86400000).toISOString().split("T")[0],
      checkOutDate: params.get('checkOutDate') || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      adults: parseInt(params.get('adults') || '1'),
      children: parseInt(params.get('children') || '0'),
      rooms: parseInt(params.get('rooms') || '1'),
      selectedLocation: params.get('selectedLocation') || 'Sydney, Australia',
      roomType: params.get('roomType') ? params.get('roomType')!.split(',').filter(Boolean) : [],
      bedType: params.get('bedType') ? params.get('bedType')!.split(',').filter(Boolean) : [],
      bathroomType: params.get('bathroomType') ? params.get('bathroomType')!.split(',').filter(Boolean) : [],
    };
  };

  // Initialize state from URL parameters
  const urlParams = getUrlParams();
  const [checkInDate, setCheckInDate] = useState(urlParams.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(urlParams.checkOutDate);
  const [adults, setAdults] = useState(urlParams.adults);
  const [children, setChildren] = useState(urlParams.children);
  const [rooms, setRooms] = useState(urlParams.rooms);
  const [selectedLocation, setSelectedLocation] = useState(urlParams.selectedLocation);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Rooms");
  const [roomResults, setRoomResults] = useState<AvailableRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoomType | null>(
    null,
  );
  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);

  const firstPageLoad = useRef(true);

  useEffect(() => {
    openBottomPanel();
  }, []);

  // Category options from home page "Shop by Category"
  const categoryOptions = [
    "All Rooms",
    "Family Retreat",
    "Solo Explorer",
    "Couple's Getaway",
    "School trips",
  ];

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
    if (data) {
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
  };

  const handleViewDetails = (room: AvailableRoomType) => {
    setSelectedRoom(room);
    setIsRoomDetailsOpen(true);
  };

  // ⬅️ Manage filter state here - initialize from URL
  const [filters, setFilters] = useState({
    roomType: urlParams.roomType,
    bedType: urlParams.bedType,
    bathroomType: urlParams.bathroomType,
  });

  // Helper function to update URL parameters
  const updateUrlParams = (newParams: Partial<typeof urlParams>) => {
    const params = new URLSearchParams(window.location.search);
    
    // Update parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Update URL without causing page reload
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams({
      roomType: filters.roomType,
      bedType: filters.bedType,
      bathroomType: filters.bathroomType,
    });
  }, [filters]);

  // Update URL when search parameters change
  useEffect(() => {
    updateUrlParams({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: adults,
      children: children,
      rooms: rooms,
      selectedLocation: selectedLocation,
    });
  }, [checkInDate, checkOutDate, adults, children, rooms, selectedLocation]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newParams = getUrlParams();
      setCheckInDate(newParams.checkInDate);
      setCheckOutDate(newParams.checkOutDate);
      setAdults(newParams.adults);
      setChildren(newParams.children);
      setRooms(newParams.rooms);
      setSelectedLocation(newParams.selectedLocation);
      setFilters({
        roomType: newParams.roomType,
        bedType: newParams.bedType,
        bathroomType: newParams.bathroomType,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    console.log(filters);
    setRoomResults((prev) => {
      if (!data) return [];
      return data.filter((room) => {
        const matchesRoomType =
          room.roomType && filters.roomType.includes(room.roomType);
        const matchesBedType =
          room.bedType && filters.bedType.includes(room.bedType);
        const matchesBathroomType =
          room.bathroomType && filters.bathroomType.includes(room.bathroomType);

        // If no filters are selected, show all rooms
        const hasAnyFilters =
          filters.roomType.length > 0 ||
          filters.bedType.length > 0 ||
          filters.bathroomType.length > 0;
        if (!hasAnyFilters) return true;
        // If any filter is selected, only show rooms that match all selected filters

        let ultimateMatch = true;
        if (filters.roomType.length > 0) ultimateMatch = !!(ultimateMatch && matchesRoomType);
        if (filters.bedType.length > 0) ultimateMatch = !!(ultimateMatch && matchesBedType);
        if (filters.bathroomType.length > 0) ultimateMatch = !!(ultimateMatch && matchesBathroomType);
        // Return true if any filter matches
        return ultimateMatch;
      });
    });
  }, [filters, data]);

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

      {/* Search Bar Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Search Bar - positioned right under the fixed header */}
          <section className="w-full pt-32">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Find Your Perfect Stay
              </h1>
              <p className="text-gray-600 text-lg">
                Search and compare rooms across Sydney locations
              </p>
            </div>
            <div className="flex justify-center max-w-7xl mx-auto px-4 py-2 ">
              <div className="flex flex-col md:flex-row items-center items-stretch rounded-lg overflow-hidden border-2 border-orange-400 shadow-md max-w-5xl">
                {/* Date Selection */}
                <div className="flex items-center bg-white px-6 py-4 flex-1 border-r border-orange-400">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={handleCheckinDateChange}
                        className="w-full text-sm font-medium text-gray-700 border-0 focus:ring-0 focus:outline-none bg-transparent"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full text-sm font-medium text-gray-700 border-0 focus:ring-0 focus:outline-none bg-transparent"
                        min={
                          new Date(new Date(checkInDate).getTime() + 86400000)
                            .toISOString()
                            .split("T")[0]
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
                        <div className="text-xs text-gray-500 mb-1">
                          Guests and rooms
                        </div>
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

                {/* Location Selection */}
                <div className="flex items-center bg-white px-6 py-4 flex-1 border-r border-orange-400">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 block mb-1">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full border-0 p-0 h-auto text-sm font-medium text-gray-700 bg-transparent focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(propertyIds).map((property) => (
                          <SelectItem key={property} value={property}>
                            {property}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Change Search Button */}
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-none font-medium text-base transition-colors h-full"
                  onClick={() => {
                    refetch();
                  }}
                >
                  Change search
                </Button>
              </div>
            </div>
          </section>
          {/* Enhanced Search Bar */}
          {/* <div className="flex justify-center">
            <div className="relative max-w-2xl w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white z-10" />
              <Input
                type="text"
                placeholder="Search for hotels, locations, or room types..."
                className="pl-12 pr-4 py-4 w-full bg-orange-500 border-2 border-orange-500 rounded-xl text-white placeholder-orange-200 focus:border-orange-600 focus:ring-0 text-lg shadow-lg"
                defaultValue="Sydney, Australia"
              />
            </div>
          </div> */}
        </div>
      </div>
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Available Rooms
                </h2>
                <p className="text-gray-600 text-lg">
                  {roomResults.length} rooms found • {selectedLocation}
                </p>
              </div>

            </div>
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
      {/* Search Results Section */}
      {isError && <div></div>}
      {isLoading && !roomResults?.length && (
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <div className="relative mb-8">
                {/* Animated circles */}
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                </div>

                {/* Pulse effect background */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Finding amazing rooms for you...
              </h3>
              <p className="text-gray-600">
                Searching through our collection of premium pod accommodations
              </p>

              {/* Skeleton cards for preview */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-6">
                  {[1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                    >
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {roomResults.length && (
        <div className="bg-gray-50 min-h-screen py-2">
          <div className="max-w-7xl mx-auto px-4">
            {/* Results Header */}

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomResults.map((room) => {
              let maxRoomsAvailable = room.roomsAvailable - items.filter((i) =>
                      i.roomTypeID === room.roomTypeID &&
                      i.dates.checkIn == checkInDate &&
                      i.dates.checkOut == checkOutDate,
                  )
                  .reduce((acc, item) => acc + item.quantity, 0);
              let bookNowMessage = "Book now!"
              switch (maxRoomsAvailable) {
                case 0:
                  bookNowMessage = "Sold Out!";
                  break;
                case 1:
                  bookNowMessage = `Only 1 ${room.isPrivate ? "room" : "bed"} left – book now!`;
                  break;
                case 2:
                case 3:
                  bookNowMessage = `Only ${maxRoomsAvailable} ${room.isPrivate ? "rooms" : "beds"} left!`;
              }
              return (
                <div
                  key={room.roomTypeID + "-" + room.roomRateID}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={room.roomTypePhotos[0].image}
                      alt={room.roomTypeName}
                      loading="lazy"
                      className="w-full h-64 object-cover"
                    />
                    {roomTypeCategories[room.roomTypeName]?.featuredValue && (
                      <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {roomTypeCategories[room.roomTypeName]?.featuredValue}
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <FavoriteButton
                        itemType="room"
                        itemId={room.roomTypeID}
                        itemData={{
                          name: room.roomTypeName,
                          description: room.roomTypeDescription,
                          location: properties[room.propertyID].propertyName,
                          image: room.roomTypePhotos[0].image
                        }}
                        size="md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    
                    {/* Room Name */}
                    <h3 className="text-15 font-bold text-gray-900 mb-2 leading-tight">
                      {room.roomTypeName}
                    </h3>
                    

                    {/* Location */}
                    <p className="text-sm text-gray-600 mb-2">
                      {properties[room.propertyID].propertyName}
                    </p>
                    {/* Best Value Badge */}
                    {roomTypeCategories[room.roomTypeName]?.featuredValue == "Best Values" && (
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-400 text-sm">✨</span>
                        <span className="text-sm font-medium text-green-600">
                          Best Value
                        </span>
                      </div>
                    )}

                    {/* Room details */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: room.roomTypeDescription,
                      }}
                      className="text-sm text-gray-500 mb-2 line-clamp-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    ></div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 text-left"
                      data-testid={`button-view-details-${room.roomTypeID}`}
                    >
                      View details
                    </button>

                    {/* Feature */}
                    {/* {room.breakfast && (
                    <p className="text-sm text-green-600 mb-3">
                      Breakfast & Dinner Included
                    </p>
                  )} */}

                    {/* Reviews */}
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex text-yellow-400 text-xs">
                        ⭐⭐⭐⭐⭐
                      </div>
                      <span className="text-xs text-gray-500">10 reviews</span>
                    </div>

                    {/* Spacer to push price and button to bottom */}
                    <div className="flex-1"></div>

                    {/* Price */}
                    <div className="mb-2">
                      {maxRoomsAvailable < 4 && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-md font-medium text-gray-600">
                            {bookNowMessage}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        {room.roomDefautRate && (
                          <span className="text-red-500 line-through text-sm">
                            <FormattedPrice price={room.roomDefautRate} />
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          <FormattedPrice price={room.roomRate} />
                        </span>
                      </div>
                      
                    </div>

                    {/* Book Now Button */}
                    <QuantitySelector
                      label={room.isPrivate ? "Quantity" : "Beds"}
                      maxValue={maxRoomsAvailable}
                      isPrivate={room.isPrivate}
                      guestMaxValue={room.maxGuests}
                      onConfirm={(quantity, guests) =>
                        addToCart(room, quantity, guests)
                      }
                    >
                      <Button
                        className="w-full border-2 border-black hover:bg-black hover:text-white text-black bg-white transition-colors duration-300 rounded-lg py-3 text-sm font-medium"
                        data-testid={`button-book-now-${room.roomTypeID}`}
                      >
                        {`Add ${room.isPrivate ? "Rooms" : "Beds"}`}
                      </Button>
                    </QuantitySelector>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      )}
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
