import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, User, Heart, Settings, LogOut, Mail, Lock, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

interface ProfileSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSlidePanel({ isOpen, onClose }: ProfileSlidePanelProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [password, setPassword] = useState("");
  
  const { isAuthenticated, user } = useAuth();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    console.log("Sign up:", { name, email, emailUpdates });
    // For now, redirect to Replit auth for actual authentication
    window.location.href = '/api/login';
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
    console.log("Sign in:", { email, password });
    // For now, redirect to Replit auth for actual authentication
    window.location.href = '/api/login';
  };

  const handleGoogleSignIn = () => {
    window.location.href = '/api/login';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-70 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide Panel */}
      <div className={`fixed top-10 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-15 font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>
            {isAuthenticated ? 'My Account' : (isSignIn ? 'Sign In' : 'Sign in or create an account')}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            style={{color: 'hsl(225, 81%, 19.6%)'}}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Authenticated User View */}
          {isAuthenticated ? (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{color: 'hsl(225, 81%, 19.6%)'}}>
                    {(user as any)?.firstName || 'User'}
                  </h3>
                  <p className="text-sm text-gray-600">{(user as any)?.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <Link href="/profile" onClick={onClose}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <User className="h-5 w-5" style={{color: 'hsl(225, 81%, 19.6%)'}} />
                    <span style={{color: 'hsl(225, 81%, 19.6%)'}}>My Profile</span>
                  </div>
                </Link>
                
                <Link href="/my-bookings" onClick={onClose}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Briefcase className="h-5 w-5" style={{color: 'hsl(225, 81%, 19.6%)'}} />
                    <span style={{color: 'hsl(225, 81%, 19.6%)'}}>My Bookings & Trips</span>
                  </div>
                </Link>
                
                <Link href="/favorites" onClick={onClose}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Heart className="h-5 w-5" style={{color: 'hsl(225, 81%, 19.6%)'}} />
                    <span style={{color: 'hsl(225, 81%, 19.6%)'}}>My Favorites</span>
                  </div>
                </Link>
                
              </div>

              {/* Sign Out */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => window.location.href = '/api/logout'}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5 text-red-600" />
                  <span className="text-red-600">Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated User View */
            <div className="space-y-6">
              
              {/* Description */}
              {!isSignIn && (
                <p className="text-gray-600 text-sm">
                  Get access to your rewards, referrals, and more
                </p>
              )}

              {/* Toggle Sign In / Sign Up */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsSignIn(false)}
                  className={`pb-2 border-b-2 transition-colors ${
                    !isSignIn 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSignIn(true)}
                  className={`pb-2 border-b-2 transition-colors ${
                    isSignIn 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={isSignIn ? handleSignIn : handleSignUp} className="space-y-4">
                
                {/* Name field (only for sign up) */}
                {!isSignIn && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>
                )}

                {/* Email field */}
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {/* Password field (for both sign in and sign up) */}
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {/* Email updates checkbox (only for sign up) */}
                {!isSignIn && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-updates"
                      checked={emailUpdates}
                      onCheckedChange={(checked) => setEmailUpdates(checked === true)}
                    />
                    <label htmlFor="email-updates" className="text-sm text-gray-700">
                      Email me with updates and offers
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 rounded-full"
                >
                  {isSignIn ? 'SIGN IN' : 'SIGN UP'}
                </Button>
              </form>

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
                type="button"
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>SIGN IN WITH GOOGLE</span>
              </Button>

              {/* Forgot Password (only for sign in) */}
              {isSignIn && (
                <div className="text-center">
                  <button className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}