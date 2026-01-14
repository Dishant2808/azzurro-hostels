import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      icons: ["💳", "💳", "💳"] // Mastercard, Visa, PayPal icons placeholder
    },
    {
      id: "paypal",
      name: "Paypal",
      icons: ["💳"]
    },
    {
      id: "afterpay",
      name: "Afterpay",
      icons: []
    },
    {
      id: "zip",
      name: "Zip",
      icons: []
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icons: ["G Pay"]
    },
    {
      id: "alipay",
      name: "Alipay",
      icons: []
    },
    {
      id: "wechat-pay",
      name: "WeChat Pay",
      icons: []
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Header */}
      <div className="bg-navy text-white py-4" style={{backgroundColor: '#0b1957'}}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-xl font-bold">AzzurroHotels.</div>
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="flex items-center border border-white/30 rounded-full px-4 py-3 min-w-80">
              <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                value="Find your kind of stay"
                className="bg-transparent text-white text-sm flex-1 outline-none"
                readOnly
              />
            </div>
            
            {/* Currency Selector */}
            <div className="flex items-center border border-white/30 rounded-full px-4 py-3">
              <img src="https://flagcdn.com/w20/us.png" alt="USD" className="w-5 h-4 mr-2" />
              <span className="text-sm text-white mr-2">USD</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Icon Buttons */}
            <div className="flex space-x-3">
              <button className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5A2 2 0 015 3h1a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM3 13a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1zM11 5a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1z" />
                </svg>
              </button>
              <button className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Hotel Details */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/attached_assets/mixed_pod_twin_room.png" 
                  alt="6 Beds Mixed Bed Shared Bathroom"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <div className="w-4 h-4 bg-yellow-400 rounded ml-1"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Azzurro Pod Hotels</h2>
                <p className="text-gray-600 mb-4">6 Beds Mixed Bed Shared Bathroom</p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm mb-4">
                  <p className="text-gray-600 mb-1">Check-in: Sun, Jun 23</p>
                  <p className="text-gray-600 mb-1">Check-out: Mon, Jun 24</p>
                  <p className="text-gray-600">1 night, 2 adults</p>
                </div>
                
                {/* Pricing Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room rate (1 night)</span>
                      <span className="text-gray-900">$45.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes included</span>
                      <span className="text-gray-900">—</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">$45.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Payment Form */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <div className="mb-4">
              <Link 
                href="/booking" 
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back</span>
              </Link>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8 space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="ml-2 text-gray-600">Your selection</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="ml-2 text-gray-600">Your details</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="ml-2 font-semibold text-gray-900">Finish booking</span>
              </div>
            </div>

            {/* Payment Section */}
            <Card className="border border-gray-200 rounded-lg">
              <CardContent className="p-6">
                {/* Payment Info */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">You'll pay directly to the property</h3>
                  <p className="text-sm text-gray-600">
                    The property will handle payment. The date you'll be charged depends on your booking conditions.
                  </p>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-15 font-semibold text-gray-900 mb-4">How would you like to pay?</h3>
                  
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label 
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-900">{method.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.id === "credit-card" && (
                            <div className="flex space-x-1">
                              <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">MC</div>
                              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">V</div>
                              <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center">PP</div>
                            </div>
                          )}
                          {method.id === "paypal" && (
                            <div className="w-16 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">PayPal</div>
                          )}
                          {method.id === "google-pay" && (
                            <div className="w-12 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">G Pay</div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pay Now Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                  style={{backgroundColor: '#0b1957'}}
                  onClick={() => {
                    window.location.href = '/booking-confirmation';
                    setTimeout(() => window.scrollTo(0, 0), 100);
                  }}
                >
                  Pay Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}