import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  User,
  ShoppingCart,
  Globe,
  Menu,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import CartButton from "./CartButton";
import PromoBanner from "./PromoBanner";
import ProfileSlidePanel from "./ProfileSlidePanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { properties, roomTypes } from "@/lib/properties.spec";
import Fuse from "fuse.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor, PopoverPortal } from "@radix-ui/react-popover";
import { set } from "date-fns";
import { getRoomCategoriesAsUrlQuery } from "@/lib/utils";

interface GlobalHeaderProps {
  onMenuClick?: () => void;
}

export default function GlobalHeader({ onMenuClick }: GlobalHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("EN");
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [searchResult, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currency, setCurrency, currencies } = useCurrency();

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "PT", name: "Português", flag: "🇵🇹" },
    { code: "JA", name: "日本語", flag: "🇯🇵" },
    { code: "KO", name: "한국어", flag: "🇰🇷" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
  ];

  const fuse = new Fuse(properties, {
    keys: ["propertyName", "propertyTimezone", "propertyDescription"],
  });

  const roomTypesFuse = new Fuse(roomTypes, {
    keys: ["roomTypeName"]
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
    if (e.target.value.trim()) {
      // Implement global search functionality
      // setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const results: any[] = []
      const propertyResults = fuse.search(e.target.value.trim());
      const roomTypeResults = roomTypesFuse.search(e.target.value.trim());
      results.push(...propertyResults, ...roomTypeResults);
      
      console.log(results);
      setSearchResults(results.slice(0,5));
      
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // Implement global search functionality
        // setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        const results = fuse.search(searchQuery);
        console.log(results);
      }
    };

  const selectedCurrency =
    currencies.find((c) => c.code === currency) || currencies[0];
  const selectedLanguage =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <>
      {/* Promo Banner */}
      <PromoBanner />

      <header
        className="fixed top-10 left-0 right-0 bg-white shadow-lg z-40"
        style={{ color: "hsl(225, 81%, 19.6%)" }}
      >
        <div className="mx-auto px-4 sm:px-2">
          {/* MOBILE LAYOUT - visible on screens smaller than md */}
          <div className="md:hidden flex items-center justify-between h-16">
            {/* Mobile Left - Menu and Search */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2"
                style={{ color: "hsl(225, 81%, 19.6%)" }}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5 z-50" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/search-results")}
                className="p-2 rounded-full w-8 h-8 border"
                style={{
                  color: "hsl(225, 81%, 19.6%)",
                  borderColor: "hsl(225, 81%, 19.6%)",
                }}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Center - Logo */}
            <div className="flex items-center justify-center flex-1">
              <Link href="/">
                <h1
                  className="text-15 font-bold transition-colors"
                  style={{ color: "hsl(225, 81%, 19.6%)" }}
                >
                  AzzurroHotels.
                </h1>
              </Link>
            </div>

            {/* Mobile Right - Heart (Like), User, Cart */}
            <div className="flex items-center space-x-1">
              {/* Mobile Heart/Like Icon */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLocation("/favorites");
                }}
                className="p-1.5 rounded-full w-8 h-8 border"
                style={{
                  color: "hsl(225, 81%, 19.6%)",
                  borderColor: "hsl(225, 81%, 19.6%)",
                }}
                aria-label="Favorites"
              >
                <Heart className="h-4 w-4" />
              </Button>

              {/* Mobile User Account */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfilePanelOpen(true)}
                className="p-1.5 rounded-full w-8 h-8 border"
                style={{
                  color: "hsl(225, 81%, 19.6%)",
                  borderColor: "hsl(225, 81%, 19.6%)",
                }}
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
              </Button>

              {/* Mobile Shopping Cart */}
              <CartButton />
            </div>
          </div>

          {/* DESKTOP LAYOUT - visible on md screens and larger */}
          <div className="hidden md:flex items-center h-16 relative w-full">
            {/* Desktop Left - Menu with REWARD text */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2"
                style={{ color: "hsl(225, 81%, 19.6%)" }}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/discounts-offers">
                <span
                  className="font-semibold text-sm tracking-wide transition-colors cursor-pointer"
                  style={{ color: "hsl(225, 81%, 19.6%)" }}
                >
                  REWARD
                </span>
              </Link>
            </div>

            {/* Desktop Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <h1
                  className="text-xl font-bold transition-colors"
                  style={{ color: "hsl(225, 81%, 19.6%)" }}
                >
                  AzzurroHotels.
                </h1>
              </Link>
            </div>

            {/* Desktop Right - Search Bar, Currency, Language, User, Cart */}
            <div className="flex items-center space-x-2 ml-auto pr-2 h-8">
              {/* Desktop Search Bar */}
              <div className="hidden lg:flex">
                <form onSubmit={handleSubmit} className="w-auto">
                  <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <PopoverAnchor asChild>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search
                            className="h-4 w-4"
                            style={{ color: "hsl(225, 81%, 19.6%)" }}
                          />
                        </div>
                        <Input
                          type="text"
                          placeholder="Find your stay"
                          value={searchQuery}
                          onChange={handleSearch}

                          className="w-64 pl-10 pr-3 py-2 bg-white rounded-full focus:ring-2 text-sm"
                          style={{
                            color: "hsl(225, 81%, 19.6%)",
                            borderColor: "hsl(225, 81%, 19.6%)",
                          }}
                        />
                      </div>
                    </PopoverAnchor>
                    <PopoverPortal>
                      <PopoverContent onOpenAutoFocus={(e)=>e.preventDefault()} align="end" className="w-64 p-0">

                        {searchResult.map((item) => (
                          <div
                            key={item.item.roomTypeID || item.item.propertyID}
                            onClick={()=>setLocation(item.item.roomTypeID ? `/search-results?${getRoomCategoriesAsUrlQuery(item.item)}` : `${item.item.pageLink}`)}
                            className="flex items-center space-x-2 w-60 my-2 cursor-pointer mx-2">
                            <div className="w-14 h-14 flex-shrink-0">
                              <img
                                src={item.item.propertyImage || item.item.roomTypePhotos[0]}
                                alt={item.item.propertyName || item.item.roomTypeName}
                                className="w-14 h-14 object-cover rounded"
                              />
                            </div>
                            <div className="flex flex-col justify-space-between ">
                              <div className="text-sm text-gray-700">{item.item.propertyName || item.item.roomTypeName}</div>
                              <div className="text-xs text-gray-500">
                                {item.item.roomTypeID ? 
                                (<>{item.item.isPrivate ? "Private Room" : "Shared Room"}</>) : 
                                "Hotel"}
                              </div>
                            </div>
                            
                            <hr/>
                          </div>
                        ))}
                      </PopoverContent>
                    </PopoverPortal>
                  </Popover>
                </form>
              </div>

              {/* Desktop Currency - With Flag */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 py-0 rounded-full border"
                    style={{
                      color: "hsl(225, 81%, 19.6%)",
                      borderColor: "hsl(225, 81%, 19.6%)",
                    }}
                  >
                    <span className="mr-2">{selectedCurrency.flag}</span>
                    <span className="font-semibold">
                      {selectedCurrency.code}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className="flex items-center space-x-2"
                    >
                      <span>{curr.flag}</span>
                      <span className="font-medium">{curr.code}</span>
                      <span className="text-gray-500">- {curr.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full w-8 h-8 border"
                    style={{
                      color: "hsl(225, 81%, 19.6%)",
                      borderColor: "hsl(225, 81%, 19.6%)",
                    }}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Account */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfilePanelOpen(true)}
                className="p-2 rounded-full w-8 h-8 border"
                style={{
                  color: "hsl(225, 81%, 19.6%)",
                  borderColor: "hsl(225, 81%, 19.6%)",
                }}
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Desktop Shopping Cart */}
              <CartButton />
            </div>
          </div>
        </div>
      </header>
      {/* Profile Slide Panel */}
      <ProfileSlidePanel
        isOpen={isProfilePanelOpen}
        onClose={() => setIsProfilePanelOpen(false)}
      />
    </>
  );
}
