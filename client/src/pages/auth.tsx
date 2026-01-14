import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in sessionStorage for after login
    if (name && email) {
      sessionStorage.setItem('signupData', JSON.stringify({ name, email, emailUpdates }));
    }
    // Redirect to Replit Auth with return URL
    window.location.href = '/api/login';
  };

  const handleOAuthLogin = (provider: string) => {
    // Redirect to Replit Auth with return URL
    window.location.href = '/api/login';
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      <Sidebar />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg" style={{color: 'hsl(225, 81%, 19.6%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const event = new CustomEvent('toggleSidebar');
                  window.dispatchEvent(event);
                }}
                className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
                style={{color: 'hsl(225, 81%, 19.6%)'}}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/">
                <h1 className="text-xl font-bold" style={{color: 'hsl(225, 81%, 19.6%)'}}>AzzurroHotels.</h1>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Form Section */}
      <section className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Sign in or create an account
                </h1>
                <p className="text-15 text-gray-600">
                  Get access to your rewards, referrals, and more
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  />
                </div>

                {/* Email Updates Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="emailUpdates"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="emailUpdates" className="text-base text-gray-700">
                    Email me with updates and offers
                  </label>
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-semibold text-base"
                >
                  SIGN UP
                </Button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-base">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-4">
                {/* Google Button */}
                <Button
                  onClick={() => handleOAuthLogin('google')}
                  variant="outline"
                  className="w-full py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold text-base flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>SIGN IN WITH GOOGLE</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}