import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FormattedPrice } from "@/components/Price";

import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Eye,
  Lightbulb,
  Star,
  Bed,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AvailableRoomType } from "@/api/room.types";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/contexts/CartContext";
import mixedPodTwinRoom from "@assets/mixed_pod_twin_room.png";
import { getPropertiesMap } from "@/lib/properties.spec";

export default function RoomCard({ room, checkInDate, checkOutDate }: { room: AvailableRoomType, checkInDate: string, checkOutDate: string }) {
  const { toast } = useToast();
  const { addItem, items } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);


  const properties = getPropertiesMap();

  const addToCart = (
    room: AvailableRoomType,
    quantity: number,
    guests: number = 1,
  ) => {
    // Create cart item with proper structure
    const cartItem = {
      id: `${room.roomTypeID}-${Date.now()}`, // Unique ID with timestamp
      name: room.roomTypeName || room.roomTypeNameShort || "Room",
      price: quantity*room.roomRate || 0,
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
  
  const photos = room.roomTypePhotos || [];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Mobile Design (Vertical Card) */}
      <Card className="bg-white max-w-md mx-auto lg:hidden">
        <CardContent className="p-0 h-auto flex flex-col">
          {/* Room Title */}
          <div className="p-4 pb-2">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <h4 className="text-15 font-semibold text-gray-900 mb-1">
                  {room.roomTypeName}
                </h4>
                <p className="text-sm text-gray-600">
                  1 Bunk Bed - Shared Bathroom
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                  Excellent
                </span>
                <span className="bg-blue-900 text-white px-2 py-1 rounded text-xs font-bold">
                  9.0
                </span>
              </div>
            </div>
          </div>

          {/* Room Image */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out w-full h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.image}
                  alt={room.roomTypeName}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
            <Heart className="absolute top-3 right-3 h-8 w-8 bg-gray-600 bg-opacity-50 text-white hover:text-red-500 cursor-pointer fill-current rounded-full p-1" />

            {/* Image Navigation */}
            <button className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all" onClick={prevImage}>
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
              <ChevronRight className="h-4 w-4 text-gray-700" onClick={nextImage}/>
            </button>

            <div className="absolute bottom-3 right-3 bg-white rounded px-2 py-1">
              <span className="text-blue-600 text-xs font-medium">
                Winter Deal
              </span>
            </div>
          </div>

          <div className="flex flex-col p-4 pb-4">
            {/* Reviews Header */}
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                67 reviews → see more reviews
              </button>
            </div>

            {/* Review */}
            <p className="text-sm text-gray-500 mb-4 italic text-center">
              "Mixlandhas helped us become much more efficient. Provided
              consistency in messaging too. It's not a lot of voices."
            </p>

            {/* Harper Review */}
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Harper</p>
                <p className="text-xs text-gray-500">United Kingdom</p>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3 w-3 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Bedside Plugs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye className="h-4 w-4" />
                <span>Pod Curtains</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lightbulb className="h-4 w-4" />
                <span>Bedside Lights</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Bed className="h-4 w-4" />
                <span>Beddings</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-right mb-3 ">
              <p className="text-xs text-gray-500 mb-1">
                1 night, 2 adults
              </p>
              <div className="flex items-center justify-end space-x-2 mb-1">
                {room.roomDefautRate > room.roomRate && <FormattedPrice
                  audPrice={room.roomDefautRate}
                  className="text-red-500 line-through text-base font-medium"
                />}
                <FormattedPrice
                  audPrice={room.roomRate}
                  className="text-xl font-bold text-gray-900"
                />
                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center ml-1">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-right"> Taxes
                and fees included
              </p>

              {/* Book Now Button */}
              <QuantitySelector
                label={room.isPrivate ? "Quantity" : "Beds"}
                maxValue={room.roomsAvailable-items.filter(i=>(i.roomTypeID===room.roomTypeID)&&(i.dates.checkIn == checkInDate && i.dates.checkOut == checkOutDate)).reduce((acc,item)=>acc+item.quantity,0)}
                isPrivate={room.isPrivate}
                guestMaxValue={room.maxGuests}
                onConfirm={(quantity, guests) =>
                  addToCart(room, quantity, guests)
                }
              >
                <Button
                  className="w-full mt-2 border-2 border-blue-900 bg-blue-900 text-white hover:text-blue-900 hover:bg-white transition-colors duration-300 rounded-lg py-3 text-sm font-medium"
                  data-testid={`button-book-now-${room.roomTypeID}`}
                >
                  {`Add ${room.isPrivate ? "Rooms" : "Beds"}`}
                </Button>
              </QuantitySelector>
            </div>

            {/* Reserve Button */}
            {/* <div className="mt-8">
              <Link href="/booking">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 font-semibold rounded-lg text-base">
                  + I'll reserve
                </Button>
              </Link>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Desktop/Laptop Design (Horizontal Layout) */}
      <Card className="overflow-hidden bg-white hidden lg:block">
        <CardContent className="p-0">
          <div className="flex h-full">
            {/* Left Side - Room Image */}
            <div className="w-72 relative rounded-l-lg overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out w-full h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.image}
                    alt={room.roomTypeName}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
              <Heart className="absolute top-3 right-3 h-8 w-8 bg-gray-600 bg-opacity-50 text-white hover:text-red-500 cursor-pointer fill-current rounded-full p-1" />
              {/* Image Navigation Buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-md"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-md"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-3 bg-white rounded px-2 py-1">
                <span className="text-blue-600 text-xs font-medium">
                  Winter Deal
                </span>
              </div>
            </div>

            {/* Middle Section - Room Details & Amenities */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-15 font-semibold text-gray-900 mb-1">
                    {room.roomTypeName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    1 Bunk Bed - Shared Bathroom
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                    Excellent
                  </span>
                  <span className="bg-blue-900 text-white px-3 py-1 rounded text-sm font-bold">
                    9.0
                  </span>
                </div>
              </div>

              {/* Amenities in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Zap className="h-4 w-4" />
                  <span>Bedside Plugs</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Eye className="h-4 w-4" />
                  <span>Pod Curtains</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lightbulb className="h-4 w-4" />
                  <span>Bedside Lights</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Bed className="h-4 w-4" />
                  <span>Beddings</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  Breakfast included
                </span>
              </div>
            </div>

            {/* Right Section - Reviews & Pricing */}
            <div className="w-96 p-4 border-l border-gray-100 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-500">67 reviews</p>
              </div>

              <p className="text-sm text-gray-500 mb-4 italic">
                "Mixlandhas helped us become much more efficient. Provided
                consistency in messaging too. It's not a lot of voices."
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    H
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Harper</p>
                    <p className="text-xs text-gray-500">United Kingdom</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-3 w-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button className="text-sm text-gray-400 hover:text-blue-600">
                  →
                </button>
              </div>

              <div className="mt-auto">
                <div className="text-right mb-3">
                  <p className="text-xs text-gray-500 mb-1">
                    1 night, 2 adults
                  </p>
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    {room.roomDefautRate > room.roomRate && <FormattedPrice
                      audPrice={room.roomDefautRate}
                      className="text-red-500 line-through text-base font-medium"
                    />}
                    <FormattedPrice
                      audPrice={room.roomRate}
                      className="text-xl font-bold text-gray-900"
                    />
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center ml-1">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-right"> Taxes
                    and fees included
                  </p>

                  {/* Book Now Button */}
                  <QuantitySelector
                    label={room.isPrivate ? "Quantity" : "Beds"}
                    maxValue={room.roomsAvailable-items.filter(i=>(i.roomTypeID===room.roomTypeID)&&(i.dates.checkIn == checkInDate && i.dates.checkOut == checkOutDate)).reduce((acc,item)=>acc+item.quantity,0)}
                    isPrivate={room.isPrivate}
                    guestMaxValue={room.maxGuests}
                    onConfirm={(quantity, guests) =>
                      addToCart(room, quantity, guests)
                    }
                  >
                    <Button
                      className="w-full border-2 border-blue-900 bg-blue-900 text-white hover:text-blue-900 hover:bg-white transition-colors duration-300 rounded-lg py-3 text-sm font-medium"
                      data-testid={`button-book-now-${room.roomTypeID}`}
                    >
                      {`Add ${room.isPrivate ? "Rooms" : "Beds"}`}
                    </Button>
                  </QuantitySelector>
                </div>
                {/* <Link href="/booking">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 mt-2 font-semibold rounded-lg">
                    + I'll reserve
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
