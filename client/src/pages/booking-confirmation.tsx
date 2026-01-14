import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import GlobalHeader from "@/components/GlobalHeader";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Reservation } from "@shared/schema";
import { useReservation } from "@/hooks/useReservation";
import { getPropertiesMap } from "@/lib/properties.spec";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/contexts/CartContext";

export default function BookingConfirmationPage() {
  const { closeBottomPanel } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { formatPrice } = useCurrency();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [match, params] = useRoute("/booking-confirmation/:id");

  useEffect(() => {
    closeBottomPanel();
  },[])

  const {
    data: reservation,
    isLoading,
    error,
  } = useReservation(params?.id || null);

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Helper function to calculate nights
  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Global Header */}
        <GlobalHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <div className="pt-16">
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Global Header */}
        <GlobalHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <div className="pt-16">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 mb-4">Failed to load bookings</div>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const propertyDetails = getPropertiesMap();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
      case "requires_payment_method":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
      case "requires_payment_method":
        return <Clock className="w-4 h-4" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
        return "Payment Successful";
      case "completed":
        return "Payment Completed";
      case "pending":
        return "Payment Pending";
      case "requires_payment_method":
        return "Payment Required";
      case "failed":
        return "Payment Failed";
      case "cancelled":
        return "Payment Cancelled";
      default:
        return "Payment Status Unknown";
    }
  };

  const getLocationName = (propertyID: any) => {
    return propertyDetails[propertyID]?.propertyName || "Azzurro Pod Hotel";
  };

  const getRooms = (roomDetails: any) => {
    if (roomDetails || Array.isArray(roomDetails)) {
      return roomDetails.count;
    }
    return "Pod";
  };

  const getTotalGuests = (roomDetails: any) => {
    if (!roomDetails || !Array.isArray(roomDetails)) {
      return 1;
    }

    return (
      roomDetails.reduce((total, room) => {
        return total + (room.adults || 0) + (room.children || 0);
      }, 0) || 1
    );
  };

  const getThumbnailImage = (propertyID: any) => {
    // Default pod room image
    return (
      propertyDetails[propertyID]?.propertyImage || "/api/placeholder/300/200"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <GlobalHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      {!reservation ? (
        <div className="text-center py-16">
          <Briefcase className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start exploring our amazing pod hotels and make your first booking!
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Explore Hotels
          </Button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
          {/* Status Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Booking Status */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Booking Status</h3>
                    <p className="text-sm text-gray-600">Reservation ID: {reservation.reservationId}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </div>
                </div>
              </Card>

              {/* Payment Status */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Status</h3>
                    <p className="text-sm text-gray-600">{getPaymentStatusText(reservation.paymentStatus || 'pending')}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getPaymentStatusColor(reservation.paymentStatus || 'pending')}`}>
                    {getPaymentStatusIcon(reservation.paymentStatus || 'pending')}
                    {reservation.paymentStatus?.toUpperCase() || 'PENDING'}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Booking Summary */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Your Booking Summary
              </h1>

              {/* Room Details Card */}
              <Card className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={getThumbnailImage(reservation.propertyID)}
                      alt={getLocationName(reservation.propertyID)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-15 font-semibold text-gray-900 mb-2">
                      {getLocationName(reservation.propertyID)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {reservation.roomDetails?.roomTypeName || 'Pod Room'}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)} • {calculateNights(reservation.startDate, reservation.endDate)} night{calculateNights(reservation.startDate, reservation.endDate) > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{getTotalGuests(reservation.roomDetails)} guest{getTotalGuests(reservation.roomDetails) > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{reservation.guestFirstName} {reservation.guestLastName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pricing Breakdown */}
              <Card className="border border-gray-200 rounded-lg">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Pricing Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {reservation.roomDetails?.roomTypeName || 'Pod Room'}
                      </span>
                      <span className="text-gray-900">{formatPrice(parseFloat(reservation.grandTotal))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {calculateNights(reservation.startDate, reservation.endDate)} night{calculateNights(reservation.startDate, reservation.endDate) > 1 ? 's' : ''} • {getRooms(reservation.roomDetails)} room{getRooms(reservation.roomDetails) > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-900"></span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes included</span>
                      <span className="text-gray-900"></span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Currency</span>
                      <span className="text-gray-900">{reservation.currency}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-15 font-semibold">
                        <span className="text-gray-900">Total Paid</span>
                        <span className="text-gray-900">{formatPrice(parseFloat(reservation.grandTotal))}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Information */}
              <Card className="border border-gray-200 rounded-lg mt-6">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Guest Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">{reservation.guestFirstName} {reservation.guestLastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{reservation.guestEmail}</span>
                    </div>
                    {reservation.guestGender && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="text-gray-900">{reservation.guestGender}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Map */}
            <div>
              <Card className="border border-gray-200 rounded-lg overflow-hidden h-96">
                <div className="relative w-full h-full">
                  {/* Map Placeholder - You can replace this with actual Google Maps integration */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
                    {/* Map elements */}
                    <div className="absolute inset-0">
                      {/* Streets */}
                      <div className="absolute top-1/4 left-0 w-full h-1 bg-white opacity-70"></div>
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-white opacity-70"></div>
                      <div className="absolute top-3/4 left-0 w-full h-1 bg-white opacity-70"></div>
                      <div className="absolute left-1/4 top-0 w-1 h-full bg-white opacity-70"></div>
                      <div className="absolute left-1/2 top-0 w-1 h-full bg-white opacity-70"></div>
                      <div className="absolute left-3/4 top-0 w-1 h-full bg-white opacity-70"></div>
                    </div>

                    {/* Location Markers */}
                    <div className="absolute top-16 right-16 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      📍
                    </div>

                    {/* Hotel Marker - Red A for Azzurro */}
                    <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-azzurro-blue text-white rounded-full w-10 h-10 flex items-center justify-center text-15 font-bold border-2 border-white shadow-lg">
                        A
                      </div>
                    </div>

                    {/* Points of Interest for Sydney */}
                    <div className="absolute top-20 right-24 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow">
                      Darling Harbour
                    </div>
                    <div className="absolute top-32 right-12 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow">
                      Sydney Opera House
                    </div>
                    <div className="absolute bottom-20 left-16 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow">
                      Sydney Harbour Bridge
                    </div>
                    <div className="absolute bottom-16 right-20 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow">
                      Central Station
                    </div>

                    {/* Hotel Info */}
                    <div className="absolute top-1/2 left-1/2 transform translate-x-4 -translate-y-8 bg-azzurro-blue/10 px-3 py-2 rounded-lg shadow-lg border border-azzurro-blue/20">
                      <div className="text-sm font-semibold text-azzurro-blue">
                        {getLocationName(reservation.propertyID)}
                      </div>
                      <div className="text-xs text-azzurro-blue/80">
                        Sydney, Australia
                      </div>
                    </div>

                    {/* Show on Map Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        className="bg-azzurro-blue hover:bg-azzurro-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Show on Map
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => window.location.href = '/my-bookings'}
                >
                  View All Bookings
                </Button>
                <Button 
                  className="w-full bg-azzurro-blue hover:bg-azzurro-blue/90 text-white"
                  onClick={() => window.location.href = '/'}
                >
                  Book Another Stay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
