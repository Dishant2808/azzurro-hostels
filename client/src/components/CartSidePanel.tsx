import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { ShoppingCart, Trash2, X, Calendar, Users, MapPin } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState } from "react";

interface CartSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidePanel({ isOpen, onClose }: CartSidePanelProps) {
  const { items, removeItem, totalItems, totalPrice, clearCart, openCart, isBottomPanelOpen } =
    useCart();
  const { formatPrice } = useCurrency();
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed hidden md:block inset-0 bg-black/50 z-[40] transition-opacity animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out rounded-l-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-azzurro-blue" />
            Your Cart <span className="text-gray-500">({totalItems})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="button-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {totalItems === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-gray-500">
              <div>
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm">Add some rooms to get started</p>
                <Button
                  onClick={onClose}
                  className="mt-4 bg-azzurro-blue hover:bg-azzurro-blue/90"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Clear All */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                  data-testid="button-clear-cart"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {"x" +
                          item.quantity +
                          ` ${item.isPrivate ? " Rooms" : " Beds"}`}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>
                            {new Date(item.dates.checkIn).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 flex-shrink-0" />
                          <span>{item.guests}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-azzurro-blue">
                          {formatPrice(item.price)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          data-testid={`button-remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {totalItems > 0 && (
          <div className="p-5 border-t bg-white sticky bottom-0 z-10">
            <div className="mb-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-azzurro-blue">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Taxes and fees included
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/booking">
                <Button
                  className="w-full bg-black hover:bg-white hover:border-black-2 text-white hover:text-black py-3 font-medium text-base rounded-xl shadow-md"
                  onClick={onClose}
                  data-testid="button-proceed-checkout"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full py-3 text-base rounded-xl"
                onClick={onClose}
                data-testid="button-continue-shopping"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel (Mobile) */}
      {totalItems > 0 && (
        <div
          className={`fixed border-2 md:hidden bottom-0 left-0 right-0 w-screen bg-white shadow z-[60] rounded-t-2xl p-4 transform transition-transform duration-300 ease-in-out ${
            (totalItems > 0 && isBottomPanelOpen) ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(items[0].dates.checkIn).toLocaleDateString("en-AU")}
                  -
                  {new Date(items[0].dates.checkOut).toLocaleDateString(
                    "en-AU",
                  )}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-start text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-azzurro-blue">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Taxes and fees included
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link className="z-[80]" href="/booking">
                <Button
                  className="bg-black hover:bg-white hover:border hover:border-black text-white hover:text-black px-6 py-3 font-medium text-base rounded-xl shadow-md"
                  onClick={onClose}
                  data-testid="button-proceed-checkout"
                >
                  Book Now
                </Button>
              </Link>
              <button
                className="text-azzurro-blue underline underline-offset-4 hover:text-black transition-colors"
                onClick={openCart}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
