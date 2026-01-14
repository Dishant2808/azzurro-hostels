import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/home";
import LocationsPage from "@/pages/locations";
import PottsPointPage from "@/pages/potts-point";
import PropertyDemoPage from "@/pages/property-deomo";
import SurryHillsPage from "@/pages/surry-hills";
import CentralSydneyPage from "@/pages/central-sydney";
import DarlingHarbourPage from "@/pages/darling-harbour";
import AboutPage from "@/pages/about";
import BreakfastDinnerPage from "@/pages/breakfast-dinner";
import DiscountsOffersPage from "@/pages/discounts-offers";
import FAQPage from "@/pages/faq";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import { TermsConditionsPage } from "@/pages/terms-conditions";

import BookingPage from "@/pages/booking";
import PaymentPage from "@/pages/payment";
import BookingConfirmationPage from "@/pages/booking-confirmation";
import SearchPage from "@/pages/search";
import SearchResultsPage from "@/pages/search-results";
import AuthPage from "@/pages/auth";
import UserProfileDashboardPage from "@/pages/rewards-dashboard";
import SignUpPage from "@/pages/signup";
import ManageBookingsPage from "@/pages/manage-bookings";
import ProfilePage from "@/pages/profile";
import FavoritesPage from "@/pages/favorites";
import MyBookingsPage from "@/pages/my-bookings";
import JobsInternshipsPage from "@/pages/jobs-internships";
import PartnershipsPage from "@/pages/partnerships";
import FiltersDemoPage from "@/pages/filters-demo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <PageTransition>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/locations" component={LocationsPage} />
          <Route path="/property-demo" component={PropertyDemoPage} />
          <Route path="/potts-point" component={PottsPointPage} />
          <Route path="/surry-hills" component={SurryHillsPage} />
          <Route path="/central-sydney" component={CentralSydneyPage} />
          <Route path="/darling-harbour" component={DarlingHarbourPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/breakfast-dinner" component={BreakfastDinnerPage} />
          <Route path="/discounts-offers" component={DiscountsOffersPage} />
          <Route path="/rewards" component={DiscountsOffersPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/privacy-policy" component={PrivacyPolicyPage} />
          <Route path="/terms-conditions" component={TermsConditionsPage} />
          <Route path="/booking" component={BookingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/booking-confirmation/:id" component={BookingConfirmationPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/search-results" component={SearchResultsPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/User-Profile-Dashboard" component={UserProfileDashboardPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/manage-bookings" component={ManageBookingsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/my-bookings" component={MyBookingsPage} />
          <Route path="/jobs-internships" component={JobsInternshipsPage} />
          <Route path="/partnerships" component={PartnershipsPage} />
          <Route path="/filters-demo" component={FiltersDemoPage} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
