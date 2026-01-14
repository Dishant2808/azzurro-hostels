import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
  Tv
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCurrency } from '@/lib/currency';

// Room Results Interface
interface RoomResult {
  id: string;
  name: string;
  location: string;
  roomType: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  breakfast?: boolean;
  deal?: string;
  popular?: boolean;
  bestValue?: boolean;
}

// FormattedPrice Component
const FormattedPrice = ({ price }: { price: number }) => {
  const { formatPrice } = useCurrency();
  return <span>{formatPrice(price)}</span>;
};

export default function SearchResults() {
  const { toast } = useToast();

  // Sample room data - 3 column grid layout
  const roomResults: RoomResult[] = [
    {
      id: '1',
      name: 'Mixed Dorm - 8 Bed',
      location: 'Potts Point, Sydney',
      roomType: '8-bed mixed dormitory',
      image: '/api/placeholder/300/200',
      rating: 4.3,
      reviews: 1247,
      price: 45,
      originalPrice: 55,
      breakfast: true,
      deal: '15% off',
      popular: true
    },
    {
      id: '2', 
      name: 'Female Only Dorm - 6 Bed',
      location: 'Surry Hills, Sydney',
      roomType: '6-bed female dormitory',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      reviews: 892,
      price: 48,
      breakfast: true,
      bestValue: true
    },
    {
      id: '3',
      name: 'Private Pod Room',
      location: 'Central Sydney',
      roomType: 'Single occupancy pod',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      reviews: 634,
      price: 78,
      originalPrice: 89,
      breakfast: true,
      deal: '12% off'
    },
    {
      id: '4',
      name: 'Twin Share Pod',
      location: 'Darling Harbour, Sydney',
      roomType: '2-bed private pod',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      reviews: 445,
      price: 95,
      breakfast: true
    },
    {
      id: '5',
      name: 'Standard Mixed Dorm - 12 Bed',
      location: 'Potts Point, Sydney',
      roomType: '12-bed mixed dormitory',
      image: '/api/placeholder/300/200',
      rating: 4.1,
      reviews: 723,
      price: 38,
      originalPrice: 45,
      breakfast: false,
      deal: '16% off'
    },
    {
      id: '6',
      name: 'Deluxe Pod Suite',
      location: 'Central Sydney',
      roomType: 'Premium single pod',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviews: 289,
      price: 125,
      breakfast: true,
      popular: true
    }
  ];

  const addToCart = (room: RoomResult) => {
    toast({
      title: "Room Added to Cart",
      description: `${room.name} has been added to your booking cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600 mt-1">{roomResults.length} rooms found • Sydney, Australia</p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
              
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results - 3 Column Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomResults.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {/* Deal Badge */}
                {room.deal && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {room.deal}
                  </div>
                )}
                {/* Popular Badge */}
                {room.popular && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Popular Choice
                  </div>
                )}
                {/* Best Value Badge */}
                {room.bestValue && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Best Value
                  </div>
                )}
                {/* Heart Icon */}
                <button 
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
                  onClick={() => {
                    toast({
                      title: "Added to Favorites",
                      description: `${room.name} has been added to your favorites.`,
                      duration: 3000,
                    });
                  }}
                >
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Room Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>
                
                {/* Location */}
                <div className="text-sm text-gray-600 mb-2">{room.location}</div>
                
                {/* Room Type */}
                <div className="text-sm text-gray-600 mb-3">{room.roomType}</div>
                
                {/* Breakfast Included */}
                {room.breakfast && (
                  <div className="text-sm text-teal-600 font-medium mb-3">Breakfast & Dinner Included</div>
                )}
                
                {/* Rating and Reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(room.rating) 
                            ? 'fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{room.reviews.toLocaleString()} reviews</span>
                </div>

                {/* Pricing Section */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {room.originalPrice && (
                      <div className="text-sm text-red-500 line-through">
                        <FormattedPrice price={room.originalPrice} />
                      </div>
                    )}
                    <div className="text-xl font-bold text-gray-900">
                      <FormattedPrice price={room.price} />
                    </div>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium"
                  onClick={() => addToCart(room)}
                  data-testid={`button-book-now-${room.id}`}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}