import {
  users,
  favorites,
  reservations,
  type User,
  type UpsertUser,
  type Favorite,
  type InsertFavorite,
  type Reservation,
  type InsertReservation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Points operations
  awardPoints(userId: string, points: number): Promise<User | undefined>;
  getUserPoints(userId: string): Promise<number>;
  
  // Favorites operations
  getUserFavorites(userId: string): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: string, itemType: string, itemId: string): Promise<boolean>;
  isFavorite(userId: string, itemType: string, itemId: string): Promise<boolean>;
  
  // Reservations operations
  getUserReservations(userId: string): Promise<Reservation[]>;
  getReservation(id: string): Promise<Reservation | undefined>;
  getReservationByExternalId(reservationId: string): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(id: string, updates: Partial<InsertReservation>): Promise<Reservation | undefined>;
  deleteReservation(id: string): Promise<boolean>;
  updateReservationStatus(id: string, status: string): Promise<boolean>;
  updatePaymentStatus(id: string, paymentStatus: string, paymentIntentId?: string): Promise<boolean>;
  markPointsAwarded(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Extract points from userData to prevent accidental overwriting
    const { points, ...safeUserData } = userData;
    
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...safeUserData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Favorites operations
  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async addFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const [newFavorite] = await db
      .insert(favorites)
      .values(favorite)
      .returning();
    return newFavorite;
  }

  async removeFavorite(userId: string, itemType: string, itemId: string): Promise<boolean> {
    const result = await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.itemType, itemType),
          eq(favorites.itemId, itemId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  async isFavorite(userId: string, itemType: string, itemId: string): Promise<boolean> {
    const [favorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.itemType, itemType),
          eq(favorites.itemId, itemId)
        )
      );
    return !!favorite;
  }

  // Reservations operations
  async getUserReservations(userId: string): Promise<Reservation[]> {
    return await db
      .select()
      .from(reservations)
      .where(eq(reservations.userId, userId))
      .orderBy(desc(reservations.createdAt));
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    const [reservation] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, id));
    return reservation;
  }

  async getReservationByExternalId(reservationId: string): Promise<Reservation | undefined> {
    const [reservation] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.reservationId, reservationId));
    return reservation;
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [newReservation] = await db
      .insert(reservations)
      .values(reservation)
      .returning();
    return newReservation;
  }

  async updateReservation(id: string, updates: Partial<InsertReservation>): Promise<Reservation | undefined> {
    const [updatedReservation] = await db
      .update(reservations)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id))
      .returning();
    return updatedReservation;
  }

  async deleteReservation(id: string): Promise<boolean> {
    const result = await db
      .delete(reservations)
      .where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async updateReservationStatus(id: string, status: string): Promise<boolean> {
    const result = await db
      .update(reservations)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async updatePaymentStatus(id: string, paymentStatus: string, paymentIntentId?: string): Promise<boolean> {
    const result = await db
      .update(reservations)
      .set({
        paymentStatus,
        ...(paymentIntentId && { paymentIntentId }),
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Points operations
  async awardPoints(userId: string, points: number): Promise<User | undefined> {
    // Atomic operation: increment points using COALESCE to handle NULL values
    const [user] = await db
      .update(users)
      .set({
        points: sql`COALESCE(${users.points}, 0) + ${points}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getUserPoints(userId: string): Promise<number> {
    const [user] = await db
      .select({ points: users.points })
      .from(users)
      .where(eq(users.id, userId));
    return user?.points || 0;
  }

  async markPointsAwarded(id: string): Promise<boolean> {
    const result = await db
      .update(reservations)
      .set({
        pointsAwarded: true,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
