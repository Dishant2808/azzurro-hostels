import { useCurrency } from "@/contexts/CurrencyContext";

interface PriceProps {
  audPrice: number;
  className?: string;
  showOriginal?: boolean;
  originalClassName?: string;
}

export default function Price({ audPrice, className = "", showOriginal = false, originalClassName = "" }: PriceProps) {
  const { formatPrice, currency } = useCurrency();
  
  if (showOriginal && currency !== "AUD") {
    return (
      <div className="flex items-center space-x-2">
        <span className={className}>{formatPrice(audPrice)}</span>
        <span className={`text-sm text-gray-500 line-through ${originalClassName}`}>
          A${audPrice}
        </span>
      </div>
    );
  }
  
  return <span className={className}>{formatPrice(audPrice)}</span>;
}

// Shorthand components for common use cases
export function FormattedPrice({ audPrice, className = "" }: { audPrice: number; className?: string }) {
  return <Price audPrice={audPrice} className={className} />;
}

export function PriceWithOriginal({ 
  audPrice, 
  className = "", 
  originalClassName = "text-red-500 line-through" 
}: { 
  audPrice: number; 
  className?: string; 
  originalClassName?: string; 
}) {
  return (
    <Price 
      audPrice={audPrice} 
      className={className} 
      showOriginal={true} 
      originalClassName={originalClassName} 
    />
  );
}