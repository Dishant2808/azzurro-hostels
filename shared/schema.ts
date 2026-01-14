import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  integer,
  decimal,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User favorites/likes table
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: varchar("item_type").notNull(), // "hotel", "room", "location", etc.
  itemId: varchar("item_id").notNull(), // ID of the liked item
  itemData: jsonb("item_data"), // Store item details for quick access
  createdAt: timestamp("created_at").defaultNow(),
});

// User reservations table
export const reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  
  // External reservation details
  reservationId: varchar("reservation_id").notNull().unique(), // External system reservation ID
  propertyID: varchar("property_id").notNull(),
  guestId: varchar("guest_id"), // External guest ID
  status: varchar("status").notNull().default("pending"), // confirmed, pending, cancelled
  
  // Guest information
  guestFirstName: varchar("guest_first_name").notNull(),
  guestLastName: varchar("guest_last_name").notNull(),
  guestEmail: varchar("guest_email").notNull(),
  guestGender: varchar("guest_gender"),
  
  // Reservation dates
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  
  // Financial details
  grandTotal: decimal("grand_total", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("AUD"),
  
  // Room details (stored as JSON for flexibility)
  roomDetails: jsonb("room_details").notNull(), // Contains room info, rates, etc.
  
  // Payment information
  paymentIntentId: varchar("payment_intent_id"),
  paymentStatus: varchar("payment_status").default("pending"), // pending, completed, failed
  paymentID: varchar("payment_id"),
  
  // Points tracking
  pointsAwarded: boolean("points_awarded").default(false),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
// Relations
export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  reservations: many(reservations),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
