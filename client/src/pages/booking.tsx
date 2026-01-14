import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Star,
  Search,
  ShoppingCart,
  User,
  Globe,
  Calendar,
  Users,
  MapPin,
  BookOpen,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Import the room image
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { init, createElement } from "@airwallex/components-sdk";

interface BookingItem {
  id: string;
  roomTypeID: string;
  roomRateID: string;
  guests: number;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  phoneCountry: string;
  zipCode: string;
  dateOfBirth: string;
  country: string;
}

interface ReservationData {
  propertyID: string;
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  bookingItems: BookingItem[];
  totalItems: number;
}

export default function BookingPage() {
  const [,setLocation] = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items, totalPrice, clearCart, closeBottomPanel } = useCart();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [ageError, setAgeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationCompleted, setReservationCompleted] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [hasShownLoginPrompt, setHasShownLoginPrompt] = useState(false);

  // Booking form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("US");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gender, setGender] = useState("");

  // Country data with phone codes and flags
  const countries = [
    {
      code: "AU",
      name: "Australia",
      phone: "+61",
      flag: "https://flagcdn.com/w20/au.png",
    },
    {
      code: "US",
      name: "United States",
      phone: "+1",
      flag: "https://flagcdn.com/w20/us.png",
    },
    {
      code: "SG",
      name: "Singapore",
      phone: "+65",
      flag: "https://flagcdn.com/w20/sg.png",
    },
    {
      code: "GB",
      name: "United Kingdom",
      phone: "+44",
      flag: "https://flagcdn.com/w20/gb.png",
    },
    {
      code: "CA",
      name: "Canada",
      phone: "+1",
      flag: "https://flagcdn.com/w20/ca.png",
    },
    {
      code: "NZ",
      name: "New Zealand",
      phone: "+64",
      flag: "https://flagcdn.com/w20/nz.png",
    },
    {
      code: "JP",
      name: "Japan",
      phone: "+81",
      flag: "https://flagcdn.com/w20/jp.png",
    },
    {
      code: "KR",
      name: "South Korea",
      phone: "+82",
      flag: "https://flagcdn.com/w20/kr.png",
    },
    {
      code: "CN",
      name: "China",
      phone: "+86",
      flag: "https://flagcdn.com/w20/cn.png",
    },
    {
      code: "IN",
      name: "India",
      phone: "+91",
      flag: "https://flagcdn.com/w20/in.png",
    },
    {
      code: "DE",
      name: "Germany",
      phone: "+49",
      flag: "https://flagcdn.com/w20/de.png",
    },
    {
      code: "FR",
      name: "France",
      phone: "+33",
      flag: "https://flagcdn.com/w20/fr.png",
    },
    {
      code: "IT",
      name: "Italy",
      phone: "+39",
      flag: "https://flagcdn.com/w20/it.png",
    },
    {
      code: "ES",
      name: "Spain",
      phone: "+34",
      flag: "https://flagcdn.com/w20/es.png",
    },
    {
      code: "NL",
      name: "Netherlands",
      phone: "+31",
      flag: "https://flagcdn.com/w20/nl.png",
    },
    {
      code: "BR",
      name: "Brazil",
      phone: "+55",
      flag: "https://flagcdn.com/w20/br.png",
    },
    {
      code: "MX",
      name: "Mexico",
      phone: "+52",
      flag: "https://flagcdn.com/w20/mx.png",
    },
    {
      code: "TH",
      name: "Thailand",
      phone: "+66",
      flag: "https://flagcdn.com/w20/th.png",
    },
    {
      code: "MY",
      name: "Malaysia",
      phone: "+60",
      flag: "https://flagcdn.com/w20/my.png",
    },
    {
      code: "ID",
      name: "Indonesia",
      phone: "+62",
      flag: "https://flagcdn.com/w20/id.png",
    },
  ];

  // Gender options
  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "N/A", label: "Prefer not to say" },
  ];

  useEffect(() => {
    closeBottomPanel();
    
    const loadDropInElement = async () => {
      try {
        // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
        await init({
          env: "demo",
          enabledElements: ["payments"],
        });
      } catch (error) {
        console.error(error);
      }
    };
    loadDropInElement();
    // STEP #6: Add an event listener to handle events when the element is mounted
    const onReady = (event: CustomEvent): void => {
      /**
       * Handle events on element mount
       */
      console.log(`Element is mounted: ${JSON.stringify(event.detail)}`);
    };

    // STEP #7: Add an event listener to handle events when the payment is successful.
    const onSuccess = (event: CustomEvent): void => {
      /**
       * Handle events on success
       */
      clearCart();
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
      setLocation("/booking-confirmation/"+event.detail.intent.merchant_order_id);
    };

    // STEP #8: Add an event listener to handle events when the payment has failed.
    const onError = (event: CustomEvent) => {
      /**
       * Handle events on error
       */
      const { error } = event.detail;
      console.error('There is an error', error);
    };
    const domElement = document.getElementById('dropIn');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onSuccess', onSuccess as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);
    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onSuccess', onSuccess as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
    };
  }, []);

  // Show login prompt when page loads if user is not authenticated
  useEffect(() => {
    // Only show prompt once per session and if user isn't already authenticated
    if (!authLoading && !isAuthenticated && !hasShownLoginPrompt) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
        setHasShownLoginPrompt(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [authLoading, isAuthenticated, hasShownLoginPrompt]);

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    window.location.href = '/api/login';
  };

  const selectedPhoneCountry =
    countries.find((c) => c.code === phoneCountry) || countries[0];

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
    // Validate date of birth is 18+
    const eighteenYearsBack = new Date();
    eighteenYearsBack.setFullYear(eighteenYearsBack.getFullYear() - 18);
    if (new Date(e.target.value) > eighteenYearsBack) setAgeError(true);
    else setAgeError(false);
  };

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !country ||
      !zipCode ||
      !gender
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // Validate date of birth is 18+
    const eighteenYearsBack = new Date();
    eighteenYearsBack.setFullYear(eighteenYearsBack.getFullYear() - 18);
    if (new Date(dateOfBirth) > eighteenYearsBack) {
      toast({
        title: "Age restriction",
        description:
          "You must be 18 years or older to make a booking at this property",
        variant: "destructive",
      });
      return;
    }

    // Validate cart has items
    if (items.length === 0) {
      toast({
        title: "No Rooms Selected",
        description: "Please add rooms to your cart before proceeding",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare comprehensive booking data
      const reservationData: ReservationData = {
        // Guest information
        guestInfo: {
          firstName,
          lastName,
          email,
          phoneNumber: `${selectedPhoneCountry.phone}${phoneNumber}`,
          phoneCountry,
          dateOfBirth,
          country,
          zipCode,
          gender,
        },
        // Booking items from cart
        bookingItems: items.map((item) => ({
          id: item.id,
          roomTypeID: item.roomTypeID,
          roomRateID: item.roomRateID,
          isPrivate: item.isPrivate,
          quantity: item.quantity,
          guests: item.guests,
        })),
        propertyID: items[0].propertyID,
        checkInDate: items[0].dates.checkIn,
        checkOutDate: items[0].dates.checkOut,
        totalItems: items.length,
      };

      console.log("Submitting reservation:", reservationData);

      // Make POST request to backend
      const response = await fetch("/api/createReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();
      console.log("Reservation result:", result);

      if (response.ok && result.success) {
        toast({
          title: "Reservation Created",
          description: "Your booking details have been saved successfully!",
        });
        const options = {
          locale: "en" as const,
          env: "demo" as const,
          enabledElements: ["payments" as const],
        };

        await init(options);
        const airwallexDropInElement = await createElement("dropIn", {
          intent_id: result.paymentIntent.id,
          client_secret: result.paymentIntent.client_secret,
          currency: result.paymentIntent.currency,
          methods: ["card", "paypal", "googlepay", "applepay"],
          applePayRequestOptions: {
            countryCode: "AU"
          },
          googlePayRequestOptions: {
            countryCode: "AU"
          }
        });

        airwallexDropInElement.mount("dropIn");

        // Set state to show payment section
        setReservationCompleted(true);
        setReservationId(result.reservationId);
      } else {
        throw new Error(result.message || "Failed to create reservation");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-col justify-center min-h-screen bg-gray-50">
      {/* Header */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <GlobalHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Progress Steps */}
      <div className="bg-white border-b pt-32">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Back Button */}
          <div className="mb-4">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="font-medium text-green-600">Your selection</span>
            </div>

            <div className="flex-1 mx-4 h-px bg-green-600"></div>

            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  reservationCompleted
                    ? "bg-green-600 text-white"
                    : "bg-[#0b1957] text-white"
                }`}
              >
                {reservationCompleted ? "✓" : "2"}
              </div>
              <span
                className={`font-medium ${reservationCompleted ? "text-green-600" : "text-gray-900"}`}
              >
                Your details
              </span>
            </div>

            <div
              className={`flex-1 mx-4 h-px ${reservationCompleted ? "bg-green-600" : "bg-gray-300"}`}
            ></div>

            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  reservationCompleted
                    ? "bg-[#0b1957] text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={
                  reservationCompleted
                    ? "font-medium text-gray-900"
                    : "text-gray-500"
                }
              >
                Finish booking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Booking Details */}
          <div className="space-y-6">
            {items.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No items in cart
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add some rooms to your cart to continue booking.
                  </p>
                  <Link href="/search-results">
                    <Button className="bg-[#0b1957] hover:bg-[#0d1f6b] text-white">
                      Browse Rooms
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                {items.map((item, index) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-6">
                        <div className="flex items-center space-x-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {item.name}
                        </h2>

                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="space-x-1 text-sm text-gray-600 mb-2 mx-1">
                            {item.quantity +
                              " x" +
                              ` ${item.isPrivate ? " Rooms" : " Beds"}`}
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Check-in:{" "}
                              {new Date(item.dates.checkIn).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Check-out:{" "}
                              {new Date(item.dates.checkOut).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          {item.isPrivate && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>
                                {Math.ceil(
                                  (new Date(item.dates.checkOut).getTime() -
                                    new Date(item.dates.checkIn).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )}{" "}
                                night(s), {item.guests} guest(s) per Room
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Individual Item Price */}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Room rate</span>
                            <span className="text-gray-900 font-semibold">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Total Summary */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Taxes included</span>
                        <span className="text-gray-900">—</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span className="text-gray-900">Total</span>
                          <span className="text-[#0b1957]">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Right Side - Conditional Content */}
          <div>
            {!reservationCompleted ? (
              /* Booking Form */
              <Card>
                <CardContent className="p-6">
                  <div id="dropIn"></div>
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <User className="h-4 w-4" />
                      <span>
                        Sign in to book your saved details or register your
                        booking on the go!
                      </span>
                    </div>
                  </div>

                  <h3 className="text-15 font-semibold text-gray-900 mb-6">
                    Enter your details
                  </h3>

                  {/* Error Message */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                    <p className="text-red-600 text-sm">
                      Almost done! Just fill in the * required info.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name *</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name *</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number *</Label>
                      <div className="flex">
                        <Select
                          value={phoneCountry}
                          onValueChange={setPhoneCountry}
                        >
                          <SelectTrigger className="w-32 rounded-r-none border-r-0">
                            <div className="flex items-center">
                              <img
                                src={selectedPhoneCountry.flag}
                                alt={selectedPhoneCountry.code}
                                className="w-5 h-3 mr-1"
                              />
                              <span className="text-sm">
                                {selectedPhoneCountry.phone}
                              </span>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.code}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={country.flag}
                                    alt={country.code}
                                    className="w-5 h-3 mr-2"
                                  />
                                  <span className="text-sm mr-2">
                                    {country.phone}
                                  </span>
                                  <span className="text-sm">
                                    {country.name}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="rounded-l-none flex-1"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Needed in case we need to contact you about your booking
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        placeholder="DD/MM/YYYY"
                        required
                        style={{ colorScheme: "light" }}
                      />
                      {ageError && (
                        <p className="text-xs text-red-500">
                          You must be 18 years or older to make a booking at
                          this property
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Use DD/MM/YYYY format (Australian standard)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country/region *</Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country/region" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center">
                                <img
                                  src={country.flag}
                                  alt={country.code}
                                  className="w-5 h-3 mr-2"
                                />
                                <span>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter your zip/postal code"
                        required
                      />
                    </div>

                    <Button
                      onClick={handleNextStep}
                      disabled={isSubmitting || items.length === 0}
                      className="w-full bg-[#0b1957] hover:bg-[#0b1957]/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 mt-8 text-base font-medium"
                    >
                      {isSubmitting ? "Creating Reservation..." : "Next Step"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              /* Payment Section */
              <Card className="border border-gray-200 rounded-lg">
                <CardContent className="p-6">
                  {/* Payment Method Selection */}
                  <div id="airwallex-payment-element" className="mb-6"></div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>
              Sign in or create an account
            </DialogTitle>
            <DialogDescription className="text-left text-gray-600 text-sm">
              Get access to your rewards, referrals, and more
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Sign In Button */}
            <Button
              onClick={handleLoginRedirect}
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 rounded-full"
              data-testid="button-login-prompt-signin"
            >
              SIGN IN
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              onClick={handleLoginRedirect}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border-gray-300 hover:bg-gray-50 transition-colors"
              data-testid="button-google-signin"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>SIGN IN WITH GOOGLE</span>
            </Button>

            {/* Continue as Guest */}
            <Button
              variant="ghost"
              onClick={handleLoginPromptClose}
              className="w-full text-gray-600 hover:text-gray-800 py-2"
              data-testid="button-continue-as-guest"
            >
              Continue as guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
