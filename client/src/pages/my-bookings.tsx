import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Users, MapPin, CreditCard, Briefcase, Clock } from "lucide-react";
import { format } from "date-fns";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { Reservation } from "@shared/schema";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { getPropertiesMap } from "@/lib/properties.spec";
import { useLocation } from "wouter";

export default function MyBookings() {
  const { isAuthenticated, user } = useAuth();
  const { formatPrice } = useCurrency();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  const { data: reservations, isLoading, error } = useQuery<Reservation[]>({
    queryKey: ['/api/reservations'],
    enabled: isAuthenticated,
  });

  const propertyDetails = getPropertiesMap();

  if (!isAuthenticated) {
    return (
      <div className="font-inter bg-white min-h-screen pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Global Header */}
        <GlobalHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <div className="pt-16">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to view your bookings</h2>
              <p className="text-gray-600 mb-4">Access your booking history and manage your trips.</p>
              <Button onClick={() => window.location.href = '/api/login'}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Global Header */}
        <GlobalHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

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

  if (error) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Global Header */}
        <GlobalHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <div className="pt-16">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 mb-4">Failed to load bookings</div>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'SUCCEEDED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationName = (propertyID: any) => {
    return propertyDetails[propertyID]?.propertyName || 'Azzurro Pod Hotel';
  };

  const getRooms = (roomDetails: any) => {
    if (roomDetails || Array.isArray(roomDetails) ) {
      return roomDetails.count;
    }
    return "Pod"
  };

  const getTotalGuests = (roomDetails: any) => {
    if (!roomDetails || !Array.isArray(roomDetails)) {
      return 1;
    }
    
    return roomDetails.reduce((total, room) => {
      return total + (room.adults || 0) + (room.children || 0);
    }, 0) || 1;
  };

  const getThumbnailImage = (propertyID: any) => {
    // Default pod room image
    return propertyDetails[propertyID]?.propertyImage || '/api/placeholder/300/200';
  };

  const handleViewDetails = (reservationId: string) => {
    setLocation(`/booking-confirmation/${reservationId}`);
  };

  return (
    <div className="font-inter bg-white min-h-screen pt-8">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Global Header */}
      <GlobalHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Page Content */}
      <div className="pt-16">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Briefcase className="h-8 w-8" style={{color: 'hsl(225, 81%, 19.6%)'}} />
            <h1 className="text-3xl font-bold" style={{color: 'hsl(225, 81%, 19.6%)'}}>
              My Bookings & Trips
            </h1>
          </div>
          <p className="text-gray-600">
            View and manage your booking history at Azzurro Pod Hotels
          </p>
            </div>

            {/* Bookings List */}
            {!reservations || reservations.length === 0 ? (
              <div className="text-center py-16">
            <Briefcase className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start exploring our amazing pod hotels and make your first booking!</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Explore Hotels
            </Button>
              </div>
            ) : (
              <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Thumbnail Image */}
                    <div className="md:w-64 h-48 md:h-auto">
                      <img 
                        src={getThumbnailImage(reservation.propertyID)}
                        alt={getLocationName(reservation.propertyID)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-xl font-semibold mb-1" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                            {getLocationName(reservation.propertyID)}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {getRooms(reservation.roomDetails)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Booking ID: {reservation.reservationId}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(reservation.status)}`}>
                            {reservation.status?.charAt(0).toUpperCase() + reservation.status?.slice(1)}
                          </div>
                          {reservation.paymentStatus && (
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getPaymentStatusColor(reservation.paymentStatus)}`}>
                              {reservation.paymentStatus?.charAt(0).toUpperCase() + reservation.paymentStatus?.slice(1)}
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator className="mb-4" />

                      {/* Booking Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <p className="font-medium">Check-in</p>
                            <p className="text-gray-600">
                              {format(new Date(reservation.startDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <p className="font-medium">Check-out</p>
                            <p className="text-gray-600">
                              {format(new Date(reservation.endDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <p className="font-medium">Guests</p>
                            <p className="text-gray-600">
                              {getTotalGuests(reservation.roomDetails)} guest{getTotalGuests(reservation.roomDetails) !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <p className="font-medium">Total Amount</p>
                            <p className="text-lg font-bold" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                              {formatPrice(parseFloat(reservation.grandTotal))}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(reservation.reservationId)}
                            data-testid={`button-view-details-${reservation.reservationId}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <h3 className="text-xl font-semibold text-white mb-6">Azzurro Hotels</h3>
                <p className="text-white leading-relaxed mb-8 text-sm max-w-[200px] break-words">
                  For Better Comfort and Experience.
                </p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-3">
                  <a href="https://www.facebook.com/profile.php?id=61563267666626" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/azzurropodhostels" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@azzurropodhostels" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/61440133104" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-white hover:text-blue-200 transition-colors">Home</a></li>
                  <li><a href="/locations" className="text-white hover:text-blue-200 transition-colors">Locations</a></li>
                  <li><a href="/about" className="text-white hover:text-blue-200 transition-colors">About Us</a></li>
                  <li><a href="/breakfast-dinner" className="text-white hover:text-blue-200 transition-colors">Breakfast & Dinner</a></li>
                  <li><a href="/discounts-offers" className="text-white hover:text-blue-200 transition-colors">Rewards</a></li>
                </ul>
              </div>

              {/* Properties */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold text-white mb-4">Our Properties</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/potts-point" className="text-white hover:text-blue-200 transition-colors">Potts Point</a></li>
                  <li><a href="/surry-hills" className="text-white hover:text-blue-200 transition-colors">Surry Hills</a></li>
                  <li><a href="/central-sydney" className="text-white hover:text-blue-200 transition-colors">Central Sydney</a></li>
                  <li><a href="/darling-harbour" className="text-white hover:text-blue-200 transition-colors">Darling Harbour</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/faq" className="text-white hover:text-blue-200 transition-colors">FAQ</a></li>
                  <li><a href="mailto:info@azzurrohotels.com" className="text-white hover:text-blue-200 transition-colors">Contact Us</a></li>
                  <li><a href="/privacy-policy" className="text-white hover:text-blue-200 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms-conditions" className="text-white hover:text-blue-200 transition-colors">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-white">📧 info@azzurrohotels.com</p>
                  <p className="text-white">📱 +61 440 133 104</p>
                  <p className="text-white">🏢 Sydney, Australia</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 pt-8 text-center">
              <p className="text-sm text-white">
                &copy; 2024 Azzurro Pod Hotels. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}