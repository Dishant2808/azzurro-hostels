import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, MapPin, Info, Utensils, Gift, 
  HelpCircle, FileText, Home, ChevronDown, ChevronUp
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [locationsOpen, setLocationsOpen] = useState(false);

  const locationItems = [
    { href: "/potts-point", label: "Potts Point" },
    { href: "/surry-hills", label: "Surry Hills" },
    { href: "/central-sydney", label: "Central Sydney" },
    { href: "/darling-harbour", label: "Darling Harbour" }
  ];

  // Check if we're on desktop (md screens and larger)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { href: "/about", label: "About Us", icon: Info },
    { href: "/breakfast-dinner", label: "Breakfast & Dinner", icon: Utensils },
    // Only show Rewards on mobile (not desktop)
    ...(isDesktop ? [] : [{ href: "/discounts-offers", label: "Rewards", icon: Gift }]),
    { href: "/faq", label: "FAQ", icon: HelpCircle },

  ];

  return (
    <>
      {/* Sidebar Toggle Button - moved to navigation bar */}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out bg-white shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={onClose}>
              <h1 className="text-2xl font-bold" style={{color: 'hsl(225, 81%, 19.6%)'}}>AzzurroHotels.</h1>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{color: 'hsl(225, 81%, 19.6%)'}}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {/* Home - Always at top */}
            <Link href="/" onClick={onClose}>
              <div className="flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-100" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </div>
            </Link>

            {/* Locations Dropdown */}
            <div>
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="w-full flex items-center justify-between space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-100"
                style={{color: 'hsl(225, 81%, 19.6%)'}}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Locations</span>
                </div>
                {locationsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {/* Dropdown Items */}
              {locationsOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  <Link href="/search-results" onClick={onClose}>
                    <div className="flex items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                      <span className="text-sm">All Locations</span>
                    </div>
                  </Link>
                  {locationItems.map((location) => (
                    <Link key={location.href} href={location.href} onClick={onClose}>
                      <div className="flex items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                        <span className="text-sm">{location.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <div className="flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-100" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Book Now Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/booking" onClick={onClose}>
              <Button 
                className="w-full font-semibold py-3 text-white"
                style={{backgroundColor: 'hsl(225, 81%, 19.6%)'}}
              >
                Book Your Stay
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm mb-3" style={{color: 'hsl(225, 81%, 19.6%)'}}>Need Help?</p>
            <div className="space-y-2">
              <button 
                onClick={() => window.open('tel:+61440133104', '_blank')}
                className="text-sm transition-colors"
                style={{color: 'hsl(225, 81%, 19.6%)'}}
              >
                📱 Call: +61 440 133 104
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:frontdesk@azzurrohotels.com'}
                className="block text-sm transition-colors"
                style={{color: 'hsl(225, 81%, 19.6%)'}}
              >
                ✉️ frontdesk@azzurrohotels.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}