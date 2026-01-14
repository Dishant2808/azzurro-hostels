import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { FormattedPrice, PriceWithOriginal } from "@/components/Price";
import FavoriteButton from "@/components/FavoriteButton";

import {
  MapPin,
  Users,
  Heart,
  Bed,
  Plug,
  Lightbulb,
  Lock,
  Sofa,
  Wifi,
  UtensilsCrossed,
  Clock,
  Footprints,
  Building,
  Star,
  Train,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Search,
  Shield,
  Coffee,
  Car,
  CheckCircle,
  ShoppingCart,
  Wind,
  Zap,
  Shirt,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import azzurroHotelSign from "@assets/image_1753335926121.png";
import azzurroHotelSignNew from "@assets/スクリーンショット 2025-07-24 154511_1753339585924.png";

import azzurroPodInterior from "@assets/image_1753339632326.png";
import azzurroMeal from "@assets/20250708_193900_1753340191338.jpg";
import bestSellerRoom1 from "@assets/image_1753338024561.png";
import bestSellerRoom2 from "@assets/image_1753338208902.png";
import bestSellerRoom3 from "@assets/image_1753338972556.png";
import budgetExplorerBackpacks from "@assets/image_1753773430768.png";
import coupleGetawayView from "@assets/image_1753774343034.png";
import mixedPodTwinRoom from "@assets/mixed_pod_twin_room.png";
import schoolBusImage from "@assets/image_1753769577515.png";
import mixedPodRoom4People from "@assets/_1019424_1753345796262.jpg";
import femalePodroom6People from "@assets/female_podroom_6_people.jpg";
import pottsPointExterior from "@assets/20250610_160057 (1)_1753347090131.jpg";
import comfyPodsImage from "@assets/image_1753713004175.png";
import googlepay from "@assets/google-pay-mark_800.svg";
import applepay from "@assets/apple-pay-mark.svg";
import mastercard from "@assets/mastercard-logo.png";
import primeLocationImage from "@assets/image_1753713238116.png";
import homeCookedDinnersImage from "@assets/image_1753713375098.png";
import teamPhoto from "@assets/ChatGPT Image Jun 10, 2025, 11_34_22 PM_1753695822328.png";
import centralSydneyExterior from "@assets/Central Sydney - front entrance image 2_1753678302967.png";
import doubleBedroom from "@assets/ChatGPT Image Jul 24, 2025, 06_53_57 PM_1753347578570.png";
import mixedPodBalcony from "@assets/IMG_4793_1753348870423.jpg";
import mixedPodPrivateBathroom from "@assets/_6040098_1753349196590.jpg";
import mixedPodSharedBathroom from "@assets/_6040048_1753349947349.jpg";
import mixedPod4PeoplePrivate from "@assets/_6040006_1753350649460.jpg";
import newDarlingHarbourImg from "@assets/ChatGPT Image Jul 28, 2025, 02_52_33 PM_1753678362730.png";
import azzurroBuildingExterior from "@assets/azzurro_building_exterior.png";
import surryHillsExterior from "@assets/ChatGPT Image Jul 28, 2025, 04_12_37 PM_1753683186067.png";
import darlingHarbourExterior from "@assets/ChatGPT Image Jul 28, 2025, 02_52_33 PM_1753678362730.png";
import sydneyHeroImage from "@assets/_8260096_1753708700093.jpg";
import familyRetreatImage from "@assets/image_1753752742778.png";
import { AvailableRoomType, RoomType } from "@/api/room.types";
import { getPropertiesMap, roomTypeCategories } from "@/lib/properties.spec";
import RoomDetailsDialog from "@/components/RoomDetailsDialog";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useAvailableRooms } from "@/hooks/useAvailableRooms";
import RoomBookingDialog from "@/components/RoomBookingDialog";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navShadow, setNavShadow] = useState(false);
  const [roomScrollPosition, setRoomScrollPosition] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] =
    useState<any>(null);
  const [rooms, setRooms] = useState<AvailableRoomType[]>([]);
  const [categoryFilteredRooms, setCategoryFilteredRooms] = useState<
    AvailableRoomType[]
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoomType | null>(
    null,
  );
  const [isRoomDetailsOpen, setIsRoomDetailsOpen] = useState(false);

  const { addItem, openBottomPanel } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    openBottomPanel();
  }, []);

  // Property IDs for each location
  const propertyIds = ["311134", "311272", "317399"];

  const properties = getPropertiesMap();

  const { data, isLoading, isError, error, refetch } = useAvailableRooms(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    1,
    0,
    1,
    propertyIds.join(","),
  );

  useEffect(() => {
    if (data) {
      setRooms(data);
      let rooms: AvailableRoomType[] = data;
      let category = "All Rooms";
      let newRooms = rooms.filter((room) => {
        if (!roomTypeCategories[room.roomTypeName]) {
          console.log(room.roomTypeName);
          return false;
        }
        return true;
      });
      setCategoryFilteredRooms(newRooms);
    }
  }, [data]);

  const handleViewDetails = (room: AvailableRoomType) => {
    setSelectedRoom(room);
    setIsRoomDetailsOpen(true);
  };

  // Effect to manage body scroll when modal opens/closes
  useEffect(() => {
    if (isBookingModalOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBookingModalOpen]);

  // Fetch room types from API
  // useEffect(() => {
  //   const fetchRoomTypes = async () => {
  //     try {
  //       const response = await fetch("/api/roomTypes");
  //       const data = await response.json();

  //       if (data.success) {
  //         console.log("Room Types:", data.data);
  //         setRooms(data.data);
  //         let rooms: AvailableRoomType[] = data.data;
  //         let category = "All Rooms"
  //         let newRooms = rooms.filter((room) => {
  //           if (!roomTypeCategories[room.roomTypeName]) {
  //             console.log(room.roomTypeName);
  //             return false;
  //           }
  //           return true;
  //         });
  //         setCategoryFilteredRooms(newRooms);
  //       } else {
  //         console.error("Failed to fetch room types:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching room types:", error);
  //     }
  //   };

  //   // fetchRoomTypes();
  // }, []);

  // Gallery images for Why Choose Azzurro section
  const galleryImages = [
    {
      src: comfyPodsImage,
      alt: "Comfy Pods with features",
      text: "",
    },
    {
      src: primeLocationImage,
      alt: "Prime Location near transport",
      text: "",
    },
    {
      src: homeCookedDinnersImage,
      alt: "Home cooked dinner with rice, chicken and salad",
      text: "",
    },
  ];

  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("All Rooms");

  // Calculate booking details
  const calculateNights = () => {
    // Simple calculation for demo - in real app would use proper date parsing
    return 3;
  };

  const propertyMap: { [key: string]: string } = {
    "311272": "Potts Point",
    "311134": "Surry Hills",
  };

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Additional logic to filter rooms based on the selected category
    let newRooms = rooms.filter((room) => {
      if (!roomTypeCategories[room.roomTypeName]) {
        console.log(room.roomTypeName);
        return false;
      }
      if (category === "All Rooms") {
        return true;
      }
      return (
        roomTypeCategories[room.roomTypeName] &&
        roomTypeCategories[room.roomTypeName].category === category
      );
    });
    setCategoryFilteredRooms(newRooms);
  };

  // Add room to cart function
  const addRoomToCart = (room: any) => {
    const cartItem = {
      id: `${room.id}-${Date.now()}`, // Unique ID with timestamp
      name: room.name,
      price: room.price,
      image: room.image,
      dates: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
      },
      guests: adults + children,
      location: room.location,
      propertyID: room.propertyID,
      roomTypeID: room.roomTypeID,
      roomRateID: room.roomRateID,
    };

    // addItem(cartItem);

    toast({
      title: "Added to Cart",
      description: `${room.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const calculateTotals = () => {
    const nights = calculateNights();
    const basePrice = 46.6;
    const subtotal = basePrice * nights;
    const discount = subtotal * 0.05;
    const total = subtotal + 45.9; // Adding fees
    const payableNow = total * 0.14; // 14% upfront

    return {
      nights,
      basePrice,
      subtotal: subtotal.toFixed(1),
      total: total.toFixed(1),
      payableNow: payableNow.toFixed(1),
      discountAmount: discount.toFixed(1),
    };
  };

  const totals = calculateTotals();

  // Room data for different categories
  const roomCategories = [
    "Family Retreat",
    "Solo Explorer",
    "Couple's Getaway",
    "School trips",
    "All Rooms",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setNavShadow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const scrollRooms = (direction: "left" | "right") => {
    const container = document.getElementById("rooms-container");
    if (container) {
      const scrollAmount = 320; // Width of one card plus gap
      const newPosition =
        direction === "left"
          ? Math.max(0, roomScrollPosition - scrollAmount)
          : Math.min(
              container.scrollWidth - container.clientWidth,
              roomScrollPosition + scrollAmount,
            );

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setRoomScrollPosition(newPosition);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

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
    <div className="flex flex-col justify-center font-inter text-gray-900 bg-white min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Global Header */}
      <GlobalHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Hero Section */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{ height: "573px" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${sydneyHeroImage}")`,
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center pt-8 pb-8">
          <div className="content-centered w-full px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h1
                className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
              >
                $29/Night with free meals?
              </h1>
              <p
                className="text-15 mb-8 text-white leading-relaxed max-w-lg mx-auto"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
              >
                Experience premium pod accommodation in the heart of Sydney with
                complimentary breakfast and dinner included in your stay.
              </p>

              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full font-medium inline-flex items-center space-x-1.5 shadow-lg mb-8 text-sm w-fit"
              >
                <a
                  href="tel:+61440133104"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Chat Now</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="pt-20 pb-48 bg-white">
        <div className="content-centered px-4">
          {/* Shop By Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Shops By Category
            </h2>
          </div>

          {/* Category Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roomCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Scrollable Room Cards Container, Loading State, or Empty State */}
          {isLoading ? (
            /* Cool Loading Animation */
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
          ) : categoryFilteredRooms && categoryFilteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No rooms available
              </h3>
              <p className="text-gray-600">
                No rooms found in the "{selectedCategory}" category. Try
                selecting a different category.
              </p>
            </div>
          ) : (
            <div
              id="rooms-container"
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div
                className="flex space-x-6 pb-4"
                style={{ width: "max-content" }}
              >
                {categoryFilteredRooms &&
                  categoryFilteredRooms.map((room, inde) => (
                    <div
                      key={room.roomTypeID + "_" + inde}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 flex flex-col w-80"
                    >
                      <div className="relative">
                        <img
                          src={room.roomTypePhotos[0].image}
                          alt={room.roomTypeName}
                          className="w-full h-64 object-cover"
                        />

                        {roomTypeCategories[room.roomTypeName] &&
                        roomTypeCategories[room.roomTypeName].featuredValue ? (
                          <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                            {
                              roomTypeCategories[room.roomTypeName]
                                .featuredValue
                            }
                          </div>
                        ) : null}

                        <div className="absolute top-4 right-4">
                          <FavoriteButton
                            itemType="room"
                            itemId={room.roomTypeID}
                            itemData={{
                              name: room.roomTypeName,
                              description: room.roomTypeDescription,
                              location: propertyMap[room.propertyID],
                              image: room.roomTypePhotos[0].image,
                            }}
                            size="md"
                          />
                        </div>
                      </div>

                      <div className={`flex flex-col flex-1 p-6`}>
                        {/* Best Value text with shiny icon (only for Darling Harbour Premium Pod) */}
                        {room.roomTypeName ===
                          "Darling Harbour Premium Pod" && (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-yellow-400 text-sm">✨</span>
                            <span className="text-sm font-medium text-green-600">
                              Best Value
                            </span>
                          </div>
                        )}

                        {/* Room Name with capacity */}
                        <h3 className="text-15 font-bold text-gray-900 mb-2 leading-tight">
                          {room.roomTypeName}
                        </h3>

                        {/* Location */}
                        <p className="text-sm text-gray-600 mb-2">
                          {propertyMap[room.propertyID]}
                        </p>

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
                        <p className="text-sm text-green-600 mb-3">
                          Breakfast & Dinner Included
                        </p>

                        {/* Reviews */}
                        <div className="flex items-center space-x-2 mb-6">
                          <div className="flex text-yellow-400 text-xs">
                            ⭐⭐⭐⭐⭐
                          </div>
                          <span className="text-xs text-gray-500">
                            {"232"} reviews
                          </span>
                        </div>

                        {/* Spacer to push price and button to bottom */}
                        <div className="flex-1"></div>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            {room.roomDefautRate &&
                              room.roomDefautRate > room.roomRate && (
                                <span className="text-red-500 line-through text-sm">
                                  <FormattedPrice
                                    audPrice={room.roomDefautRate}
                                  />
                                </span>
                              )}
                            <span className="text-2xl font-bold text-gray-900">
                              <FormattedPrice audPrice={room.roomRate} />
                            </span>
                          </div>
                        </div>

                        {/* Book Now Button */}
                        <Button
                          className="w-full border-2 border-black hover:bg-black hover:text-white text-black bg-white transition-colors duration-300 rounded-lg py-3 text-sm font-medium"
                          onClick={() => {
                            setSelectedRoomForBooking(room);
                            setIsBookingModalOpen(true);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Browse More Button */}
          <div className="text-center mt-12">
            <Link
              href={`/search-results?category=${encodeURIComponent(selectedCategory)}`}
            >
              <Button
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                data-testid="button-browse-more"
              >
                Browse More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Azzurro Section */}
      <section
        id="about"
        className="py-20 px-4"
        style={{ backgroundColor: "#f3fadc" }}
      >
        <div className="content-centered">
          <div className="flex flex-col lg:flex-row items-center gap-12 transition-all duration-500 ease-in-out">
            {/* Left Side - Pod Image Gallery */}
            <div className="flex-none lg:w-1/2 transition-all duration-500 ease-in-out">
              <div className="relative">
                <div className="relative mb-8">
                  <img
                    src={galleryImages[currentImageIndex].src}
                    alt={galleryImages[currentImageIndex].alt}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  {/* Overlay text - bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <h3 className="text-white text-2xl font-bold uppercase">
                      {galleryImages[currentImageIndex].text}
                    </h3>
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? "bg-gray-800"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 text-gray-900 transition-all duration-500 ease-in-out">
              <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
                COUNTLESS STAYS TRANSFORMED
              </p>

              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black">
                STAY SMART,
                <br />
                EXPLORE MORE.
              </h3>

              <p className="text-gray-700 text-15 mb-8 leading-relaxed">
                Like home, but better — cozy beds, easy access, and home-cooked
                meals
              </p>

              {/* Three Key Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    Prime Location - 3-5 min to transport
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    Cozy Pods - Privacy curtains & storage
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    Free Meals - Breakfast & dinner included
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-black border-2 border-orange-500 px-8 py-4 rounded-full font-semibold text-15 transition-colors duration-300"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section
        className="py-8 overflow-hidden"
        style={{ backgroundColor: "#f3fadc" }}
      >
        <div className="content-centered px-4">
          <div className="relative reviews-container">
            <div className="flex space-x-6 scroll-animation">
              {/* Review 1 */}
              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Clean location near Central Station. Helpful staff."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="James L."
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      James L.
                    </p>
                    <p className="text-xs text-gray-500">Business Traveler</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Loved the free breakfast! Perfect for budget travel."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Sarah M."
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      Sarah M.
                    </p>
                    <p className="text-xs text-gray-500">Backpacker from UK</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Great location in Darling Harbour. Felt safe and secure."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Michael R."
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      Michael R.
                    </p>
                    <p className="text-xs text-gray-500">Tourist from USA</p>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Clean, modern pods with great security."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Lisa T."
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      Lisa T.
                    </p>
                    <p className="text-xs text-gray-500">
                      Student from Germany
                    </p>
                  </div>
                </div>
              </div>

              {/* Duplicate reviews for seamless continuous scroll */}
              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Clean location near Central Station. Helpful staff."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="James L."
                    flex-col
                    md:flex-row
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      max-w-lg
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      James L.
                    </p>
                    <p className="text-xs text-gray-500">Business Traveler</p>
                  </div>
                </div>
              </div>

              <div className="flex-none w-80 bg-white rounded-lg p-4 shadow-md h-fit">
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs mb-3 leading-tight text-gray-700">
                  "Loved the free breakfast! Perfect for budget travel."
                </p>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Sarah M."
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--azzurro-navy)" }}
                    >
                      Sarah M.
                    </p>
                    <p className="text-xs text-gray-500">Backpacker from UK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Star Reviews Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-3 md:flex-row items-start md:items-center justify-between">
            {/* Left side - Stats and CTA */}
            <div className="flex-1 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                150k+ 5-Star
                <br />
                Reviews
                <br />
                Don't Lie
              </h2>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium mt-6">
                Read Our Reviews
              </Button>
            </div>

            {/* Center - Review */}
            <div className="flex-1 max-w-md md:mx-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Like Sleeping On A Cloud
                </h3>
                <p className="text-gray-600 mb-4">
                  "Literally the best sleep I've gotten in ages. I never want to
                  get out of bed..."
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">Sarah T.</p>
              </div>
            </div>

            {/* Right side - Navigation */}
            <div className="flex flex-row justify-center space-x-3">
              <button
                className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  /* Previous review logic */
                }}
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  /* Next review logic */
                }}
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="content-centered">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Explore <span className="text-black">Azzurro</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Discover our four prime Sydney locations, each offering comfort,
              convenience, and a vibrant local experience. All our properties
              are within 3–5 minutes from public transport.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Potts Point */}
            <div className="relative bg-cover bg-center overflow-hidden h-72 group cursor-pointer">
              <Link
                href="/potts-point"
                className="absolute inset-0 z-10"
              ></Link>
              <img
                src={pottsPointExterior}
                alt="Potts Point location"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative p-8 h-full flex flex-col justify-end text-white">
                <div className="mb-4">
                  <h3 className="text-15 font-bold mb-3">Potts Point</h3>
                  <Button
                    asChild
                    className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold w-fit transition-colors duration-300 relative z-20"
                  >
                    <Link href="/potts-point">View Location →</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Surry Hills */}
            <div className="relative bg-cover bg-center overflow-hidden h-72 group cursor-pointer">
              <Link
                href="/surry-hills"
                className="absolute inset-0 z-10"
              ></Link>
              <img
                src={surryHillsExterior}
                alt="Surry Hills location"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
              <div className="relative p-8 h-full flex flex-col justify-end text-white">
                <div className="mb-4">
                  <h3 className="text-15 font-bold mb-3">Surry Hills</h3>
                  <Button
                    asChild
                    className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold w-fit transition-colors duration-300 relative z-20"
                  >
                    <Link href="/surry-hills">View Location →</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Central Sydney */}
            <div className="relative bg-cover bg-center overflow-hidden h-72 group cursor-pointer">
              <Link
                href="/central-sydney"
                className="absolute inset-0 z-10"
              ></Link>
              <img
                src={centralSydneyExterior}
                alt="Central Sydney location"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative p-8 h-full flex flex-col justify-end text-white">
                <div className="mb-4">
                  <h3 className="text-15 font-bold mb-3">Central Sydney</h3>
                  <Button
                    asChild
                    className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold w-fit transition-colors duration-300 relative z-20"
                  >
                    <Link href="/central-sydney">View Location →</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Darling Harbour */}
            <div className="relative bg-cover bg-center overflow-hidden h-72 group cursor-pointer">
              <Link
                href="/darling-harbour"
                className="absolute inset-0 z-10"
              ></Link>
              <img
                src={darlingHarbourExterior}
                alt="Darling Harbour location"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative p-8 h-full flex flex-col justify-end text-white">
                <div className="mb-4">
                  <h3 className="text-15 font-bold mb-3">Darling Harbour</h3>
                  <Button
                    asChild
                    className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold w-fit transition-colors duration-300 relative z-20"
                  >
                    <Link href="/darling-harbour">View Location →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white px-4">
        <div className="content-centered">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <img
                src={teamPhoto}
                alt="Azzurro team - Professional group photo"
                className="w-full h-[500px] object-contain rounded-lg bg-gray-50"
              />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  OUR STORY
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The Stay we Always wanted
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You know that feeling when you arrive in a new city… and all
                  you want is something easy, warm, and just a little familiar?
                </p>
                <p className="text-gray-700 leading-relaxed">
                  That's how Azzurro Hotels started — out of all the little
                  moments that didn't quite work when we were traveling.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We'd get to a place late and miss dinner because we didn't
                  make a reservation. We'd want to cook… but hotels didn't have
                  a kitchen. We'd crave comfort, but didn't want to splurge.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  So we built the kind of stay we always wished we had.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Azzurro is for the in-between moments — where a hot,
                  home-cooked meal is waiting (no booking needed), where beds
                  are affordable yet private, and where the vibe is homely,
                  cozy, and genuine.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  We're not a hotel. We're not a hostel.
                  <br />
                  We're what happens when real travelers build a place for other
                  real travelers.
                </p>
              </div>

              <Button
                asChild
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center"
              >
                <Link href="/about">READ ABOUT US</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 azzurro-light-green-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-15 font-medium text-gray-900">
                  Can I request a bottom bunk?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === 1 ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQ === 1 && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    Yes, you can request a bottom bunk when making your
                    reservation or during check-in. While we do our best to
                    accommodate such requests, they are subject to availability
                    and cannot be guaranteed.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-15 font-medium text-gray-900">
                  Do you allow pets or emotional support animals?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === 2 ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQ === 2 && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    Unfortunately, we do not allow pets or emotional support
                    animals in our pod accommodations. This policy ensures the
                    comfort and safety of all our guests and maintains our
                    hygiene standards.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(3)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-15 font-medium text-gray-900">
                  Can I pay with cash?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === 3 ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQ === 3 && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    No, we do not accept cash payments. All bookings must be
                    paid using a valid credit or debit card. We accept all major
                    credit cards including Visa, Mastercard, and American
                    Express.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(4)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-15 font-medium text-gray-900">
                  What is your cancellation and refund policy?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === 4 ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQ === 4 && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    Refundable Rate: Breakfast & Dinner Included with
                    cancellation up to 48 hours before check-in.
                    <br />
                    <br />
                    Non-Refundable Rate: No refunds will be issued from the time
                    of booking.
                    <br />
                    <br />
                    Please check your booking confirmation for the applicable
                    rate.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(5)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-15 font-medium text-gray-900">
                  Is early check-in or late check-out available?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFAQ === 5 ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQ === 5 && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    Early check-in and late check-out are available upon request
                    and subject to availability. Additional charges may apply.
                    Please contact the front desk in advance to arrange this
                    service.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button
              asChild
              className="border-2 border-black hover:bg-black hover:text-white text-black bg-white transition-colors duration-300 rounded-lg px-8 py-3 text-15 font-medium"
            >
              <Link href="/faq">View More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-100">
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
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
                    href="/search-results"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    All Locations
                  </Link>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Central Sydney
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Surry Hills
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Darling Harbour
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Potts Point
                  </a>
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

      {/* Booking Modal */}
      {isBookingModalOpen &&
        selectedRoomForBooking &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 w-screen h-screen z-[90]"
            onClick={(e) => {
              // Close modal when clicking on backdrop
              if (e.target === e.currentTarget) {
                setIsBookingModalOpen(false);
              }
            }}
          >
            <div
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    setIsBookingModalOpen(false);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <RoomBookingDialog
                selectedRoomForBooking={selectedRoomForBooking}
                close={() => {
                  setIsBookingModalOpen(false);
                }}
              />

              {/* Payment Methods */}
              <div className="text-center">
                <div className="text-gray-600 text-sm mb-3">We accept:</div>
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-5 rounded text-white flex items-center justify-center text-xs font-bold">
                    <img src={mastercard} alt="mastercard" />
                  </div>
                  <div className="rounded text-white flex items-center justify-center text-xs font-bold">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                      alt="visa"
                      className="h-5 w-auto"
                    />
                  </div>
                  <div className="h-5 text-white flex items-center justify-center text-xs font-bold">
                    <img src={applepay} alt="applepay" className="h-8 w-auto" />
                  </div>
                  <div className="rounded text-white flex items-center justify-center text-xs font-bold">
                    <img src={googlepay} alt="googlepay" className="h-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
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
