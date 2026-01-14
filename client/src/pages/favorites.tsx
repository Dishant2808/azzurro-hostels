import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, X } from "lucide-react";
import { Link } from "wouter";
import GlobalHeader from "@/components/GlobalHeader";
import RoomBookingDialog from "@/components/RoomBookingDialog";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    favorites = [],
    isLoading: favoritesLoading,
    removeFavorite,
  } = useFavorites();
  const { toast } = useToast();

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] =
    useState<any>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to view your favorites.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
    }
  }, [authLoading, isAuthenticated, toast]);

  // Manage body scroll when booking modal is open
  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBookingModalOpen]);

  if (authLoading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GlobalHeader />
        <div className="max-w-4xl mx-auto px-4 py-8 pt-32">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const getItemIcon = (itemType: string) => {
    switch (itemType) {
      case "location":
        return <MapPin className="h-5 w-5" />;
      case "room":
        return <Bed className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  const getItemLink = (itemType: string, itemId: string) => {
    switch (itemType) {
      case "location":
        return `/${itemId}`;
      case "room":
        return `/${itemId}`;
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader />

      <div className="max-w-4xl mx-auto px-4 py-8 pt-32 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500" />
          <h1
            className="text-3xl font-bold"
            style={{ color: "hsl(225, 81%, 19.6%)" }}
          >
            My Favorites
          </h1>
        </div>

        {!Array.isArray(favorites) || favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-gray-600 mb-6">
                Start exploring and save your favorite hotels and locations!
              </p>
              <Link href="/">
                <Button>Explore Hotels</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite: any) => {
              // Create a mock room object for the favorites that looks like the home page rooms
              const mockRoom = {
                roomTypeID: favorite.itemId,
                roomTypeName:
                  favorite.itemData?.name || `Room ${favorite.itemId}`,
                roomTypeDescription: favorite.itemData?.description || "",
                roomTypePhotos: [
                  {
                    image: favorite.itemData?.image || "/placeholder-room.jpg",
                  },
                ],
                propertyID: "311134", // Default property ID
                isPrivate: true,
                roomRate: 29, // Default rate
              };

              return (
                <div
                  key={favorite.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={favorite.itemData?.image || "/placeholder-room.jpg"}
                      alt={favorite.itemData?.name || "Room"}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <FavoriteButton
                        itemType="room"
                        itemId={favorite.itemId}
                        itemData={{
                          name: favorite.itemData?.name,
                          description: favorite.itemData?.description,
                          location: favorite.itemData?.location,
                          image: favorite.itemData?.image,
                        }}
                        size="md"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {/* Room Name */}
                    <h3 className="text-15 font-bold text-gray-900 mb-2 leading-tight">
                      {favorite.itemData?.name || `Room ${favorite.itemId}`}
                    </h3>

                    {/* Location */}
                    {favorite.itemData?.location && (
                      <p className="text-sm text-gray-600 mb-2">
                        {favorite.itemData.location}
                      </p>
                    )}

                    {/* Description */}
                    {favorite.itemData?.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: favorite.itemData.description,
                        }}
                        className="text-sm text-gray-500 mb-2 line-clamp-2"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      />
                    )}

                    {/* Feature */}
                    <p className="text-sm text-green-600 mb-3">
                      Breakfast & Dinner Included
                    </p>

                    {/* Spacer to push button to bottom */}
                    <div className="flex-1"></div>

                    {/* Book Now Button */}
                    <Button
                      className="w-full border-2 border-black hover:bg-black hover:text-white text-black bg-white transition-colors duration-300 rounded-lg py-3 text-sm font-medium"
                      onClick={() => {
                        setSelectedRoomForBooking(mockRoom);
                        setIsBookingModalOpen(true);
                      }}
                      data-testid={`button-book-now-${favorite.itemId}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Booking Modal */}
        {isBookingModalOpen &&
          selectedRoomForBooking &&
          createPortal(
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 w-screen h-screen z-[90]"
              onClick={(e) => {
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
              </div>
            </div>,
            document.body,
          )}
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
    </div>
  );
}
