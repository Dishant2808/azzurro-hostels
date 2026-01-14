import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export function useFavorites() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/favorites"],
    enabled: isAuthenticated,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async (item: { itemType: string; itemId: string; itemData?: any }) => {
      return await apiRequest("POST", "/api/favorites", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to Favorites",
        description: "Item successfully added to your favorites.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to favorites.",
        variant: "destructive",
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async ({ itemType, itemId }: { itemType: string; itemId: string }) => {
      return await apiRequest("DELETE", `/api/favorites/${itemType}/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from Favorites",
        description: "Item removed from your favorites.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites.",
        variant: "destructive",
      });
    },
  });

  const checkFavorite = useQuery({
    queryKey: ["/api/favorites/check"],
    enabled: false, // We'll enable this manually when needed
  });

  const isFavorite = (itemType: string, itemId: string) => {
    return Array.isArray(favorites) && favorites.some((fav: any) => fav.itemType === itemType && fav.itemId === itemId);
  };

  const toggleFavorite = (itemType: string, itemId: string, itemData?: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      // Redirect to login
      window.location.href = "/api/login";
      return;
    }

    const isCurrentlyFavorite = isFavorite(itemType, itemId);
    
    if (isCurrentlyFavorite) {
      removeFavoriteMutation.mutate({ itemType, itemId });
    } else {
      addFavoriteMutation.mutate({ itemType, itemId, itemData });
    }
  };

  return {
    favorites,
    isLoading,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    toggleFavorite,
    isFavorite,
    isAddingFavorite: addFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
  };
}