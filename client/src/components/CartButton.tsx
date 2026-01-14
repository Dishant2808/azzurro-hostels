import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  className?: string;
  showBadge?: boolean;
  iconSize?: number;
  badgeClassName?: string;
}

export default function CartButton({ 
  className = "", 
  showBadge = true, 
  iconSize = 4,
  badgeClassName = ""
}: CartButtonProps) {
  const { totalItems, toggleCart } = useCart();

  return (
    <button 
      onClick={toggleCart}
      className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors relative ${className}`}
      style={{color: 'hsl(225, 81%, 19.6%)', borderColor: 'hsl(225, 81%, 19.6%)'}}
      data-testid="button-toggle-cart"
    >
      <ShoppingCart className={`w-${iconSize} h-${iconSize}`} />
      {showBadge && totalItems > 0 && (
        <span 
          className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ${badgeClassName}`}
          data-testid="cart-item-count"
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}