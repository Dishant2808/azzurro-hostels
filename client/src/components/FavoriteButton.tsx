import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  itemType: string;
  itemId: string;
  itemData?: any;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function FavoriteButton({
  itemType,
  itemId,
  itemData,
  size = "md",
  showText = false,
}: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite, isAddingFavorite, isRemovingFavorite } = useFavorites();

  const isCurrentlyFavorite = isFavorite(itemType, itemId);
  const isLoading = isAddingFavorite || isRemovingFavorite;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(itemType, itemId, itemData);
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const buttonSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "transition-all duration-200 hover:scale-110 bg-white/80 hover:bg-white rounded-full transition-colors"
      )}
      aria-label={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          isCurrentlyFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-400 hover:text-red-500"
        )}
      />
      {showText && (
        <span className="ml-2 text-sm">
          {isCurrentlyFavorite ? "Favorited" : "Add to Favorites"}
        </span>
      )}
    </Button>
  );
}