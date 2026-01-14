import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'wouter';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  Calendar,
  Users,
  MapPin
} from 'lucide-react';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, totalItems, totalPrice, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8 h-8 rounded-full border transition-colors"
          style={{color: 'hsl(225, 81%, 19.6%)', borderColor: 'hsl(225, 81%, 19.6%)'}}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-12 w-80 md:w-80 sm:w-72 bg-white rounded-lg shadow-lg border z-50">
            <div className="p-4 text-center text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Your cart is empty</p>
              <p className="text-sm">Add some rooms to get started</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full border transition-colors relative"
        style={{color: 'hsl(225, 81%, 19.6%)', borderColor: 'hsl(225, 81%, 19.6%)'}}
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-12 w-96 md:w-96 sm:w-80 bg-white rounded-lg shadow-xl border z-50 flex flex-col" style={{maxHeight: 'calc(100vh - 120px)'}}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Your Cart ({totalItems})</h3>
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-0">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b hover:bg-gray-50">
                  <div className="flex space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <div className="text-xs text-gray-500 mt-1">{"x"+item.quantity+` ${item.isPrivate?" Rooms":" Beds"}`}</div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.dates.checkIn} - {item.dates.checkOut}</span>
                        </div>
                        
                        {/* Conditionally render guests if isPrivate is true */}
                        {item.isPrivate?<div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{item.guests} guests</span>
                        </div>:null}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">${item.price}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-gray-50 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-xl">${totalPrice}</span>
              </div>
              <div className="space-y-2">
                <Link href="/booking">
                  <Button className="w-full bg-black hover:bg-white hover:text-black hover:border-2 text-white">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}