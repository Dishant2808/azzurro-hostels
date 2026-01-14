import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertFavoriteSchema } from "@shared/schema";
import {
  getHotelDetails,
  getRoomTypes,
} from "./services/cloudbeds/api/endpoints";
import {
  getAvailableRooms,
  getRooms,
  getRoomTypeRate,
} from "./controller/rooms.controller";
import {
  createReservation,
  getReservation,
  randomPayIntent,
} from "./controller/reservation.controller";
import { webhookListener } from "./controller/airwallex.controller";
import { verifyWebhookSignature } from "./middleware/verifyWebhook";

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle OPTIONS preflight requests for all API routes
  app.options("/api/*", (req, res) => {
    res.status(204).end();
  });
  
  // Auth middleware
  await setupAuth(app);

  app.get("/api/test1", (req: any, res) => {
    res.json({ message: "Hell O from Azzuro x Replit!" });
  });

  // Test endpoint to verify deployment and CORS configuration
  app.get("/api/test-deployment", (req: any, res) => {
    res.json({
      status: "success",
      message: "API is running and updated!",
      timestamp: new Date().toISOString(),
      cors: {
        allowedOrigins: [
          "https://azzurrohostels.vercel.app",
          "http://localhost:4000",
        ],
        configured: true,
      },
      environment: process.env.NODE_ENV || "development",
      serverTime: new Date().toLocaleString(),
    });
  });

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User points route
  app.get("/api/user/points", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const points = await storage.getUserPoints(userId);
      res.json({ points });
    } catch (error) {
      console.error("Error fetching user points:", error);
      res.status(500).json({ message: "Failed to fetch user points" });
    }
  });

  // Favorites routes
  app.get("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const userFavorites = await storage.getUserFavorites(userId);
      res.json(userFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const favoriteData = insertFavoriteSchema.parse({
        ...req.body,
        userId,
      });

      // Check if already favorited
      const isAlreadyFavorite = await storage.isFavorite(
        userId,
        favoriteData.itemType,
        favoriteData.itemId,
      );
      if (isAlreadyFavorite) {
        return res.status(400).json({ message: "Item already in favorites" });
      }

      const favorite = await storage.addFavorite(favoriteData);
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete(
    "/api/favorites/:itemType/:itemId",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user?.claims?.sub;
        const { itemType, itemId } = req.params;

        const removed = await storage.removeFavorite(userId, itemType, itemId);
        if (removed) {
          res.json({ message: "Favorite removed" });
        } else {
          res.status(404).json({ message: "Favorite not found" });
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ message: "Failed to remove favorite" });
      }
    },
  );

  app.get(
    "/api/favorites/check/:itemType/:itemId",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user?.claims?.sub;
        const { itemType, itemId } = req.params;

        const isFav = await storage.isFavorite(userId, itemType, itemId);
        res.json({ isFavorite: isFav });
      } catch (error) {
        console.error("Error checking favorite:", error);
        res.status(500).json({ message: "Failed to check favorite" });
      }
    },
  );

  app.get("/api/hotelDetails/:propertyId", async (req, res) => {
    try {
      const { propertyId } = req.params;
      const result = await getHotelDetails(propertyId);
      if (result.success) return res.status(200).json(result);
      return res.status(400).json(result);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      res.status(500).json({ message: "Failed to fetch hotel details" });
    }
  });

  app.get("/api/roomTypes", getRooms);

  app.get("/api/availableRooms", getAvailableRooms);

  app.get("/api/roomTypeRate", getRoomTypeRate);

  app.post("/api/createReservation", createReservation);

  // Reservations routes
  app.get("/api/reservations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const userReservations = await storage.getUserReservations(userId);
      res.json(userReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.get("/api/reservation-details/:id", getReservation);

  app.get("/api/randomPayIntent", randomPayIntent);

  app.post("/api/airwallex/webhook", verifyWebhookSignature, webhookListener);

  const httpServer = createServer(app);
  return httpServer;
}
