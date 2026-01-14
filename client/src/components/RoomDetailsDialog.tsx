import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Users, Check } from "lucide-react";
import { AvailableRoomType, RoomType } from "@/api/room.types";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getPropertiesMap } from "@/lib/properties.spec";

interface RoomDetailsDialogProps {
  room: AvailableRoomType | RoomType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  allowBooking?: boolean;
  onBookNow: (room: AvailableRoomType, quantity: number) => void;
}

const FormattedPrice = ({ price }: { price: number }) => {
  const { formatPrice } = useCurrency();
  return <span>{formatPrice(price)}</span>;
};

export default function RoomDetailsDialog({
  room,
  isOpen,
  onOpenChange,
  allowBooking=false,
  onBookNow,
}: RoomDetailsDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const properties = getPropertiesMap();

  if (!room) return null;

  // Handle different photo formats between RoomType and AvailableRoomType
  const images = room.roomTypePhotos || [];
  const getImageUrl = (
    photo: string | { thumb: string; image: string },
  ): string => {
    return typeof photo === "string" ? photo : photo.image;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Sample amenities - in a real app, these would come from the room data
  const amenities = [
    {
      category: "Power & Connectivity",
      items: ["110-120 volt circuits", "Wireless internet (Wifi)"],
    },
    { category: "Comfort", items: ["Towels", "Extra Blankets", "Padlocks"] },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl border-0 p-0 gap-0 overflow-hidden">
        {/* Close button */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-20 bg-white/80 hover:bg-white p-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image Gallery */}
          <div className="relative h-80 bg-gray-100">
            {images.length > 0 && (
              <>
                <img
                  src={getImageUrl(images[currentImageIndex])}
                  alt={`${room.roomTypeName} - Photo ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
              {images.slice(0, 6).map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageUrl(photo)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 pb-8">
            {/* Room Header */}
            <div className="mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {room.roomTypeName}
              </DialogTitle>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span className="text-sm">Accommodates</span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">4</span>
                </div>
              </div>

              {/* Description */}
              <div
                dangerouslySetInnerHTML={{
                  __html: room.roomTypeDescription,
                }}
                className="text-gray-700 leading-relaxed mb-6"
              />

              {/* Key Features */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    Private Bathroom available inside the room
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    Complimentary Breakfast & Dinner included in price
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    Wardrobe & Locker available for storage
                  </span>
                </li>
              </ul>
            </div>

            {/* Accommodation Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Accommodation Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {amenities.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="grid grid-cols-2 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing and Book Button */}
            {allowBooking && <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  {"roomRate" in room ? (
                    <div className="flex items-center gap-2 mb-1">
                      {room.roomDefautRate && (
                        <span className="text-red-500 line-through text-lg">
                          <FormattedPrice price={room.roomDefautRate} />
                        </span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">
                        <FormattedPrice price={room.roomRate} />
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-900">
                      Price available on booking
                    </div>
                  )}
                  <p className="text-sm text-gray-600">per night</p>
                </div>

                {"roomRate" in room ? (
                  <Button
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full border-0 text-lg font-medium"
                    onClick={() => {
                      onBookNow(room as AvailableRoomType, 3);
                      onOpenChange(false);
                    }}
                    data-testid={`button-book-now-details-${room.roomTypeID}`}
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    className="px-8 py-3 bg-gray-400 text-white rounded-full border-0 text-lg font-medium cursor-not-allowed"
                    disabled
                    data-testid={`button-unavailable-${room.roomTypeID}`}
                  >
                    Check Availability
                  </Button>
                )}
              </div>
            </div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
