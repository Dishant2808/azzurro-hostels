import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ExternalLink, Gift, Star, Calendar, Heart } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import GlobalHeader from "@/components/GlobalHeader";


export default function Profile() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Fetch user points
  const { data: pointsData, isLoading: pointsLoading } = useQuery<{ points: number }>({
    queryKey: ['/api/user/points'],
    enabled: isAuthenticated,
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GlobalHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-15">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-32">
        
        {/* Rewards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{color: 'hsl(225, 81%, 19.6%)'}}>My Rewards</h2>
          <Card className="border-2 border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>Azzurro Points</h3>
                    <p className="text-sm text-gray-600">Earn points with every booking</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-700" data-testid="text-points">
                    {pointsLoading ? 'Loading...' : `${pointsData?.points || 0}`}
                  </div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium" style={{color: 'hsl(225, 81%, 19.6%)'}}>How to Earn</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Complete a booking: <span className="font-semibold text-teal-700">100 points</span></p>
                  <p>• First booking bonus: <span className="font-semibold text-teal-700">150 points</span></p>
                  <p className="text-xs text-gray-500 mt-2">Points are automatically added after successful payment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manage Bookings Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{color: 'hsl(225, 81%, 19.6%)'}}>My Bookings</h2>
          <Card 
            className="border-2 border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => window.location.href = '/my-bookings'}
            data-testid="card-manage-bookings"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>Manage Bookings</h3>
                    <p className="text-sm text-gray-600">View and manage your reservations</p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{color: 'hsl(225, 81%, 19.6%)'}}>My Favorites</h2>
          <Card 
            className="border-2 border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => window.location.href = '/favorites'}
            data-testid="card-favorites"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>My Favorites</h3>
                    <p className="text-sm text-gray-600">View your saved hotels and rooms</p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Links Section */}
        <div className="mb-8 space-y-4">
          <Link href="/faq">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 px-2 rounded">
              <h3 className="text-15 font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>FAQs</h3>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
          
          <Link href="/contact">
            <div className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 px-2 rounded">
              <h3 className="text-15 font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>Contact Us</h3>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}