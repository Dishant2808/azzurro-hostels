import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Check,
  Calendar,
  Plus,
  Minus,
} from "lucide-react";
import { AvailableRoomType, RoomType } from "@/api/room.types";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getPropertiesMap } from "@/lib/properties.spec";
import { useToast } from "@/hooks/use-toast";
import { FormattedPrice, PriceWithOriginal } from "@/components/Price";
import { useRoomRate } from "@/hooks/useRoomRate";
import { useCart } from "@/contexts/CartContext";
import mixedPodTwinRoom from "@assets/mixed_pod_twin_room.png";

interface RoomBookingDialogProps {
  selectedRoomForBooking: AvailableRoomType;
  close: () => void;
}

export default function RoomBookingDialog({
  selectedRoomForBooking,
  close
}: RoomBookingDialogProps) {
  if (!selectedRoomForBooking) return null;

  const properties = getPropertiesMap();

  const { toast } = useToast();
  const { items, addItem } = useCart();

  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [minValue, setMinValue] = useState(1);
  const [guestMaxValue, setGuestMaxValue] = useState(1);
  const [initialValue, setInitialValue] = useState(1);
  const [quantity, setQuantity] = useState(maxValue > 0 ? initialValue : 0);
  const [guestQuantity, setGuestQuantity] = useState(guestMaxValue);

  const { data, isLoading, isError } = useRoomRate(
    selectedRoomForBooking.propertyID,
    selectedRoomForBooking.roomTypeID,
    checkInDate,
    checkOutDate,
    adults,
    children,
  );

  useEffect(() => {
    if (!data) return;
    let tempMaxValue =
      data.roomsAvailable -
      items
        .filter(
          (i) =>
            i.roomTypeID === data.roomTypeID &&
            i.dates.checkIn == checkInDate &&
            i.dates.checkOut == checkOutDate,
        )
        .reduce((acc, item) => acc + item.quantity, 0);

    setQuantity(tempMaxValue > 0 ? quantity : 0);
    setGuestMaxValue(selectedRoomForBooking.maxGuests);
    setMaxValue(tempMaxValue);
  }, [selectedRoomForBooking, data]);

  const handleIncrement = () => {
    if (quantity < maxValue) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: `Sorry! No more quantity available`,
        description: `Your current selection only has ${maxValue} quantity available.`,
        duration: 3000,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > minValue) {
      setQuantity(quantity - 1);
    }
  };

  const handleGuestDecrement = () => {
    if (guestQuantity > minValue) {
      setGuestQuantity(guestQuantity - 1);
    }
  };

  const handleGuestIncrement = () => {
    if (guestQuantity < guestMaxValue) {
      setGuestQuantity(guestQuantity + 1);
    }
  };

  const handleConfirm = () => {
    if (!data) return;

    if (quantity > 0 && quantity <= data.roomsAvailable)
      addToCart(selectedRoomForBooking, quantity, guestQuantity);
    close();
    
  };

  const handleCancel = () => {
    setQuantity(maxValue > 0 ? initialValue : 0);
    setGuestQuantity(guestMaxValue);
    close();
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

  function daysBetween() {
    try {
      // Convert both dates to UTC to avoid timezone issues
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);

      // Calculate the difference in milliseconds
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error("Invalid date");
      }

      const diffInMs: number = Math.abs(d2.getTime() - d1.getTime());
      return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* Date Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Date</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="relative">
            <input
              type="date"
              value={checkInDate}
              onChange={handleCheckinDateChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              style={{ colorScheme: "light" }}
              min={new Date().toISOString().split("T")[0]}
              onFocus={(e) => e.target.showPicker?.()}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              style={{ colorScheme: "light" }}
              min={
                new Date(new Date(checkInDate).getTime() + 86400000)
                  .toISOString()
                  .split("T")[0]
              }
              onFocus={(e) => e.target.showPicker?.()}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      

      {/* Room Selection */}
      {isLoading ? (
        /* Loading Animation */
      <div>
        <div className="mb-6 p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="relative mb-6">
              {/* Animated circles */}
              <div className="flex justify-center items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              </div>
              
              {/* Pulse effect background */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            
            <p className="text-gray-700 font-medium mb-1">
              Loading data for updated dates...
            </p>
            <p className="text-gray-500 text-sm">
              Updating availability and pricing
            </p>
          </div>
        </div>
      </div>
      ) : selectedRoomForBooking && data && maxValue > 0 ? (
        /* Room Data Available */
        <div>
          {/* Guests Section */}
          <div className="mb-6">
            <div className={`flex ${maxValue>3 ? 'hidden':''} items-center justify-between mb-3`}>
              <h3 className="text-sm font-medium text-gray-700">
                Add {selectedRoomForBooking.isPrivate ? "Rooms" : "Beds"}
              </h3>
              <span className="text-xs text-gray-500">(Max {maxValue})</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-900 text-sm">
                  {selectedRoomForBooking.isPrivate ? "Rooms" : "Beds"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Guest quantity for room*/}
            {selectedRoomForBooking.isPrivate && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Set Guests</h3>
                  <span className="text-xs text-gray-500">
                    (Max {guestMaxValue})
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md mb-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-900 text-sm">
                      Adults
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleGuestDecrement}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {guestQuantity}
                    </span>
                    <button
                      onClick={handleGuestIncrement}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Age Requirement Notice */}
            <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-blue-700">
                <span className="font-medium">Age Requirement:</span> All guests
                must be 18 years or older
              </p>
            </div>
          </div>
          <div>
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4 gap-3">
              <div>
                <h4 className="text-15 font-semibold text-gray-900 mb-1">
                  {selectedRoomForBooking.roomTypeName}
                </h4>
                <div className="text-gray-600 text-sm mb-2">
                  per {selectedRoomForBooking.isPrivate ? "Room" : "Bed"} x{" "}
                  {daysBetween()} nights
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    <FormattedPrice audPrice={data.totalRate} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">
                <FormattedPrice audPrice={data.totalRate * quantity} />
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">Payable Now</span>
              <span className="text-15 font-semibold">
                <FormattedPrice audPrice={data.totalRate * quantity} />
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            className="w-full border-2 border-black hover:bg-black hover:text-white text-black bg-white transition-colors duration-300 rounded-lg py-4 font-semibold text-15 mb-4 flex items-center justify-center space-x-2"
            onClick={() => {
              // Only add to cart if dates are selected and room is selected
              if (selectedRoomForBooking && checkInDate && checkOutDate) {
                handleConfirm();
              } else {
                toast({
                  title: "Please Complete Selection",
                  description:
                    "Please select your check-in and check-out dates before booking.",
                  variant: "destructive",
                  duration: 3000,
                });
              }
            }}
          >
            <span>Book Now</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        </div>
      ) : (
        /* No Data Available */
        <div className="mb-6 p-8 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No rooms available for your selection
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Unfortunately, there are no rooms available for the dates and guest count you've selected. Please try:
            </p>
            
            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Selecting different dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Reducing the number of guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Checking our other room types</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
