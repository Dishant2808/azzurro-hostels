import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dialog, DialogPortal, DialogDescription, DialogOverlay, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import CartSidePanel from '@/components/CartSidePanel';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string; 
  dates: {
    checkIn: string;
    checkOut: string;
  };
  isPrivate: boolean;
  quantity: number;
  guests: number;
  location: string;
  propertyID: string;
  roomTypeID: string;
  roomRateID: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  showClearDialog: boolean;
  setShowClearDialog: (show: boolean) => void;
  isCartOpen: boolean;
  isBottomPanelOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openBottomPanel: () => void;
  closeBottomPanel: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('azzurro-cart');
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  const [showClearDialog, setShowClearDialog] = useState(false);
  const [newAddItem, setNewAddItem] = useState<CartItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);

  const { toast } = useToast();

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('azzurro-cart', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    
    setItems(prevItems => {
      const conflictItemExists = prevItems.find(i => 
         (i.propertyID !== item.propertyID || (i.dates.checkIn != item.dates.checkIn || i.dates.checkOut != item.dates.checkOut)));
      if (conflictItemExists){
        setShowClearDialog(true);
        setNewAddItem(item);
        return prevItems;
      }
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // Update existing item (replace dates/guests)
        return prevItems.map(i => i.id === item.id ? item : i);
      }

      toast({
        title: "Room Added to Cart",
        description: `${item.name} has been added to your booking cart.`,
        duration: 3000,
      });
      openCart();
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
    } else {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setShowClearDialog(false);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const openBottomPanel = () => setIsBottomPanelOpen(true);
  const closeBottomPanel = () => setIsBottomPanelOpen(false);

  const clearAndUpdateCart = () => {
    clearCart();
    if (newAddItem) {
      addItem(newAddItem);
      setNewAddItem(null);
    }
  }

  const totalItems = items.length;
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      showClearDialog,
      setShowClearDialog,
      isCartOpen,
      isBottomPanelOpen,
      openCart,
      closeCart,
      toggleCart,
      openBottomPanel,
      closeBottomPanel
    }}>
      {children}
      
      {/* Cart Side Panel */}
      <CartSidePanel isOpen={isCartOpen} onClose={closeCart} />
      
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-xl border-0 p-0 gap-0">
          {/* Close button */}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex flex-col p-6">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <DialogTitle className="text-lg font-semibold text-orange-600 m-0">
                Are you sure?
              </DialogTitle>
            </div>

            {/* Description */}
            <DialogDescription className="text-gray-700 mb-6 text-sm leading-relaxed">
              Changing your stay date or location will clear your current accommodations in cart
            </DialogDescription>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
                >
                  Close
                </Button>
              </DialogClose>
              <Button 
                onClick={clearAndUpdateCart}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full border-0"
              >
                Update Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}