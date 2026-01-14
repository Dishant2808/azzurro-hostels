var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";
import cors from "cors";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  favorites: () => favorites,
  favoritesRelations: () => favoritesRelations,
  insertFavoriteSchema: () => insertFavoriteSchema,
  insertReservationSchema: () => insertReservationSchema,
  insertUserSchema: () => insertUserSchema,
  reservations: () => reservations,
  reservationsRelations: () => reservationsRelations,
  sessions: () => sessions,
  users: () => users,
  usersRelations: () => usersRelations
});
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  boolean,
  integer,
  decimal,
  date
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: varchar("item_type").notNull(),
  // "hotel", "room", "location", etc.
  itemId: varchar("item_id").notNull(),
  // ID of the liked item
  itemData: jsonb("item_data"),
  // Store item details for quick access
  createdAt: timestamp("created_at").defaultNow()
});
var reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  // External reservation details
  reservationId: varchar("reservation_id").notNull().unique(),
  // External system reservation ID
  propertyID: varchar("property_id").notNull(),
  guestId: varchar("guest_id"),
  // External guest ID
  status: varchar("status").notNull().default("pending"),
  // confirmed, pending, cancelled
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
  roomDetails: jsonb("room_details").notNull(),
  // Contains room info, rates, etc.
  // Payment information
  paymentIntentId: varchar("payment_intent_id"),
  paymentStatus: varchar("payment_status").default("pending"),
  // pending, completed, failed
  paymentID: varchar("payment_id"),
  // Points tracking
  pointsAwarded: boolean("points_awarded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  reservations: many(reservations)
}));
var favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id]
  })
}));
var reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true
});
var insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const { points, ...safeUserData } = userData;
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...safeUserData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  // Favorites operations
  async getUserFavorites(userId) {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }
  async addFavorite(favorite) {
    const [newFavorite] = await db.insert(favorites).values(favorite).returning();
    return newFavorite;
  }
  async removeFavorite(userId, itemType, itemId) {
    const result = await db.delete(favorites).where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.itemType, itemType),
        eq(favorites.itemId, itemId)
      )
    );
    return (result.rowCount ?? 0) > 0;
  }
  async isFavorite(userId, itemType, itemId) {
    const [favorite] = await db.select().from(favorites).where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.itemType, itemType),
        eq(favorites.itemId, itemId)
      )
    );
    return !!favorite;
  }
  // Reservations operations
  async getUserReservations(userId) {
    return await db.select().from(reservations).where(eq(reservations.userId, userId)).orderBy(desc(reservations.createdAt));
  }
  async getReservation(id) {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }
  async getReservationByExternalId(reservationId) {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.reservationId, reservationId));
    return reservation;
  }
  async createReservation(reservation) {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }
  async updateReservation(id, updates) {
    const [updatedReservation] = await db.update(reservations).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(reservations.id, id)).returning();
    return updatedReservation;
  }
  async deleteReservation(id) {
    const result = await db.delete(reservations).where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async updateReservationStatus(id, status) {
    const result = await db.update(reservations).set({
      status,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async updatePaymentStatus(id, paymentStatus, paymentIntentId) {
    const result = await db.update(reservations).set({
      paymentStatus,
      ...paymentIntentId && { paymentIntentId },
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Points operations
  async awardPoints(userId, points) {
    const [user] = await db.update(users).set({
      points: sql2`COALESCE(${users.points}, 0) + ${points}`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return user;
  }
  async getUserPoints(userId) {
    const [user] = await db.select({ points: users.points }).from(users).where(eq(users.id, userId));
    return user?.points || 0;
  }
  async markPointsAwarded(id) {
    const result = await db.update(reservations).set({
      pointsAwarded: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(reservations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/services/cloudbeds/api/axios.config.ts
import axios from "axios";
var axiosInstance = (propertyId) => {
  return axios.create({
    baseURL: process.env.CLOUDBEDS_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env[`PROPERTY_${propertyId}_API_KEY`]
    }
  });
};
var axios_config_default = axiosInstance;

// server/services/cloudbeds/api/endpoints/hotel.api.ts
async function getHotelDetails(propertyId) {
  try {
    const res = await axios_config_default(propertyId).get("/getHotelDetails", {
      params: {
        propertyID: propertyId
      }
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
}

// server/services/cloudbeds/api/endpoints/rooms.api.ts
async function getRoomTypes(propertyID) {
  try {
    const res = await axios_config_default(propertyID).get(
      "/getRoomTypes",
      {
        params: {
          propertyID,
          pageSize: 100
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}
async function getAvailableRoomTypes(propertyId, startDate, endDate, adults = 1, children = 0, rooms = 1) {
  try {
    const res = await axios_config_default(propertyId).get(
      "/getAvailableRoomTypes",
      {
        params: {
          propertyID: propertyId,
          startDate,
          endDate,
          adults,
          children,
          rooms,
          pageSize: 100
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}

// server/services/cloudbeds/api/endpoints/rate.api.ts
async function getRoomTypeRatePlans(propertyID, roomTypeID, startDate, endDate, adults = 1, children = 0) {
  try {
    const res = await axios_config_default(propertyID).get(
      "/getRatePlans",
      {
        params: {
          propertyID,
          roomTypeID,
          startDate,
          endDate,
          adults,
          children,
          pageSize: 100
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}

// server/utils/properties.spec.ts
var properties = [
  {
    "propertyID": "311134",
    "organizationID": "311686",
    "propertyName": "Azzurro Boutique Hotel Surry Hills",
    "propertyImage": "https://h-img2.cloudbeds.com/uploads/311134/3_gallery~~65cdea3ab275e.jpeg",
    "propertyDescription": "<div>Welcome to Sydney's first all-female hostel. Our team is dedicated to bringing fresh ideas to life, ensuring your stay is comfortable and homely.&nbsp;<br></div>We prioritize quality, offering delicious breakfast and dinner with daily cleaning services included in your stay. Whether you're travelling solo or with a group, we've created a welcoming space for you in Sydney. Understanding the challenges of settling into a new city, we aim to provide something different from the usual hotel experience.<br>We hope you enjoy our freshly prepared, home-cooked meals, and feel the comfort of a home away from home. We look forward to making your stay in Sydney enjoyable and comfortable.",
    "propertyTimezone": "Australia/Sydney",
    "propertyCurrency": {
      "currencyCode": "AUD",
      "currencySymbol": "$",
      "currencyPosition": "before"
    }
  },
  {
    "propertyID": "311272",
    "organizationID": "311686",
    "propertyName": "Azzurro Pod Hotel Potts Point",
    "propertyImage": "https://h-img1.cloudbeds.com/uploads/311272/whatsapp_image_2023-10-17_at_05.59.54_gallery~~65cdd91845120.jpeg",
    "propertyDescription": "<span>Welcome to Azzurro Pod Hotels, where we blend innovation with hospitality. Our team is dedicated to bringing fresh ideas to life, ensuring your stay is comfortable and homely.&nbsp;<br>We prioritize quality, offering delicious breakfast and dinner with daily cleaning services included in your stay. Whether you're travelling solo or with a group, we've created a welcoming space for you in Sydney. Understanding the challenges of settling into a new city, we aim to provide something different from the usual hotel experience.<br>We hope you enjoy our freshly prepared, home-cooked meals, and feel the comfort of a home away from home. We look forward to making your stay in Sydney enjoyable and comfortable.</span>",
    "propertyTimezone": "Australia/Sydney",
    "propertyCurrency": {
      "currencyCode": "AUD",
      "currencySymbol": "$",
      "currencyPosition": "before"
    }
  },
  {
    "propertyID": "317399",
    "organizationID": "317399",
    "propertyName": "Lisa demo account",
    "propertyImage": "",
    "propertyDescription": "",
    "propertyTimezone": "America/Los_Angeles",
    "propertyCurrency": {
      "currencyCode": "USD",
      "currencySymbol": "$",
      "currencyPosition": "before"
    }
  }
];
var getPropertiesMap = () => {
  return properties.reduce((acc, property) => {
    acc[property.propertyID] = property;
    return acc;
  }, {});
};

// server/controller/rooms.controller.ts
var getRooms = async (req, res) => {
  try {
    let propertyIds = ["311134", "311272"];
    let roomTypesList = [];
    for (let propertyId of propertyIds) {
      const result = await getRoomTypes(propertyId);
      if (result.success) roomTypesList.push(...result.data);
      else return res.status(400).json(result);
    }
    return res.status(200).json({ success: true, data: roomTypesList });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).json({ message: "Failed to fetch hotel details" });
  }
};
var getAvailableRooms = async (req, res) => {
  try {
    const { query } = req;
    if (!query.startDate || !query.endDate)
      return res.status(400).json({ message: "Missing startDate or endDate" });
    const { startDate, endDate, adults, children, rooms } = query;
    const location = query.location;
    console.log(location);
    let propertyIds = location ? location.split(",") : ["311134", "311272", "317399"];
    let roomTypesList = [];
    const allProperties = getPropertiesMap();
    for (let propertyId of propertyIds) {
      const availableRoomTypesPromise = getAvailableRoomTypes(
        propertyId,
        startDate,
        endDate,
        adults,
        children,
        rooms
      );
      const roomTypesPromise = getRoomTypes(propertyId);
      const result = await availableRoomTypesPromise;
      if (result.success && !result.data.length) continue;
      if (result.success) {
        let propertyRooms = result?.data[0].propertyRooms;
        const defaultRates = propertyRooms.reduce(
          (acc, room) => {
            if (room.ratePlanNamePrivate == "default")
              acc[room.roomTypeID] = room.roomRate;
            return acc;
          },
          {}
        );
        const roomTypes = await roomTypesPromise;
        if (roomTypes.success && !roomTypes.data.length) continue;
        if (!roomTypes.success) continue;
        propertyRooms.forEach((room) => {
          const roomType = roomTypes.data.find(
            (roomType2) => roomType2.roomTypeID == room.roomTypeID
          );
          if (roomType) {
            room.isPrivate = roomType.isPrivate;
          }
          room.propertyID = propertyId;
          room.roomDefautRate = defaultRates[room.roomTypeID] ?? room.roomRate + 10;
          roomTypesList.push(room);
        });
      } else return res.status(400).json(result);
    }
    return res.status(200).json({ success: true, data: roomTypesList });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).json({ message: "Failed to fetch hotel details" });
  }
};
var getRoomTypeRate = async (req, res) => {
  try {
    const { query } = req;
    if (!query.startDate || !query.endDate)
      return res.status(400).json({ message: "Missing startDate or endDate" });
    const { roomTypeID, propertyID, startDate, endDate, adults, children } = query;
    const roomTypeRatePlansResponse = await getRoomTypeRatePlans(
      propertyID,
      roomTypeID,
      startDate,
      endDate,
      adults,
      children
    );
    if (!roomTypeRatePlansResponse.success) return res.status(400).json(roomTypeRatePlansResponse);
    return res.status(200).json({ success: true, data: roomTypeRatePlansResponse.data });
  } catch (error) {
    console.error("Error fetching room rate details:", error);
    res.status(500).json({ message: "Failed to fetch room rate details" });
  }
};

// server/services/cloudbeds/api/endpoints/reservation.api.ts
import qs from "qs";
async function postReservation(data) {
  try {
    const res = await axios_config_default(data.propertyID).post(
      "/postReservation",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}

// server/services/airwallex/api/axios.config.ts
import axios2 from "axios";
var airwallexApi = axios2.create({
  baseURL: process.env.AIRWALLEX_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
airwallexApi.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => {
  return Promise.reject(err);
});
async function getToken() {
  try {
    const result = await axios2.post(`${process.env.AIRWALLEX_BASE_URL}/authentication/login`, null, {
      headers: {
        "x-client-id": process.env.AIRWALLEX_CLIENT_ID,
        "x-api-key": process.env.AIRWALLEX_API_KEY
      }
    });
    return result.data.token || result.data;
  } catch (error) {
    console.error("Failed to get Airwallex token:", error);
    throw error;
  }
}
var axios_config_default2 = airwallexApi;

// server/services/airwallex/api/endpoints/payments.endpoints.ts
var createPaymentIntent = async (intentData) => {
  try {
    const result = await axios_config_default2.post("/pa/payment_intents/create", intentData);
    return result.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// server/controller/reservation.controller.ts
import { v4 as uuid } from "uuid";
async function randomPayIntent(req, res) {
  const paymentIntentData = {
    amount: 123.45,
    currency: "AUD",
    merchant_order_id: uuid(),
    request_id: `res_${uuid()}`,
    descriptor: "Reservation for Azzurro",
    return_url: `${process.env.FRONTEND_BASE_URL}/booking-confirmation`
  };
  const paymentIntent = await createPaymentIntent(paymentIntentData);
  res.status(201).json({
    success: true,
    message: "Reservation created successfully",
    paymentIntent
  });
}
async function createReservation(req, res) {
  try {
    const reservationData = req.body;
    if (!reservationData.guestInfo || !reservationData.bookingItems || reservationData.bookingItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required reservation data"
      });
    }
    const eighteenYearsBack = /* @__PURE__ */ new Date();
    eighteenYearsBack.setFullYear(eighteenYearsBack.getFullYear() - 18);
    if (new Date(reservationData.guestInfo.dateOfBirth) > eighteenYearsBack) {
      return res.status(400).json({
        success: false,
        message: "Age restriction: You must be at least 18 years old to book a reservation."
      });
    }
    const adults = [];
    reservationData.bookingItems.map((item) => {
      for (let i = 0; i < item.quantity; i++) {
        adults.push({
          roomTypeID: item.roomTypeID,
          quantity: item.guests ?? 1
        });
      }
    });
    const children = reservationData.bookingItems.map((item) => ({
      roomTypeID: item.roomTypeID,
      quantity: 0
    }));
    const newReservation = {
      propertyID: reservationData.propertyID,
      startDate: reservationData.checkInDate,
      endDate: reservationData.checkOutDate,
      guestFirstName: reservationData.guestInfo.firstName,
      guestLastName: reservationData.guestInfo.lastName,
      guestEmail: reservationData.guestInfo.email,
      guestPhone: reservationData.guestInfo.phoneNumber,
      guestCountry: reservationData.guestInfo.country,
      guestGender: reservationData.guestInfo.gender,
      guestZip: reservationData.guestInfo.zipCode,
      rooms: reservationData.bookingItems.map((item) => ({
        roomTypeID: item.roomTypeID,
        roomRateID: item.roomRateID,
        quantity: item.quantity
      })),
      adults,
      children,
      paymentMethod: "credit" /* CREDIT */
    };
    const reservationResult = await postReservation(newReservation);
    if (!reservationResult.success) {
      return res.status(400).json(reservationResult);
    }
    const paymentIntentData = {
      amount: 80.59,
      currency: "AUD",
      merchant_order_id: reservationResult.reservationID,
      request_id: `res_${reservationResult.reservationID}`,
      descriptor: "Reservation for Azzurro",
      return_url: `${process.env.FRONTEND_BASE_URL}/booking-confirmation`
    };
    const paymentIntent = await createPaymentIntent(paymentIntentData);
    const reservation = {
      userId: req.user?.claims?.sub || null,
      reservationId: reservationResult.reservationID,
      propertyID: reservationData.propertyID,
      guestId: reservationResult.guestID,
      status: reservationResult.status,
      guestFirstName: reservationData.guestInfo.firstName,
      guestLastName: reservationData.guestInfo.lastName,
      guestEmail: reservationData.guestInfo.email,
      guestGender: reservationData.guestInfo.gender,
      startDate: reservationData.checkInDate,
      endDate: reservationData.checkOutDate,
      grandTotal: reservationResult.grandTotal.toString(),
      currency: paymentIntent.currency,
      roomDetails: reservationData.bookingItems,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status
    };
    await storage.createReservation(reservation);
    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservationResult,
      paymentIntent
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
async function getReservation(req, res) {
  try {
    const userId = req.user?.claims?.sub;
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Reservation ID is required" });
    console.log(id);
    const reservation = await storage.getReservationByExternalId(id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Failed to fetch reservation details" });
  }
}

// server/services/cloudbeds/api/endpoints/payment.api.ts
import qs2 from "qs";
async function postPayment(data) {
  try {
    const res = await axios_config_default(data.propertyID).post(
      "/postPayment",
      qs2.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}

// shared/config/rewards.ts
var REWARDS_CONFIG = {
  // Points awarded for different actions
  POINTS_PER_BOOKING: 100,
  // Bonus multipliers (future use)
  FIRST_BOOKING_BONUS: 1.5,
  // 150 points for first booking
  VIP_MEMBER_MULTIPLIER: 2,
  // Double points for VIP members
  // Minimum thresholds
  MIN_BOOKING_VALUE_FOR_POINTS: 0,
  // Minimum booking value to earn points (in AUD)
  // Point redemption (future use)
  POINTS_TO_CURRENCY_RATIO: 0.01,
  // 1 point = $0.01 AUD
  MIN_POINTS_FOR_REDEMPTION: 500,
  // Minimum points needed to redeem
  // Display settings
  POINTS_DISPLAY_NAME: "Azzurro Points",
  POINTS_CURRENCY_SYMBOL: "pts",
  // Feature flags
  ENABLE_POINT_EXPIRY: false,
  // Whether points expire
  POINT_EXPIRY_MONTHS: 12,
  // Points expire after X months
  // Notifications
  NOTIFY_ON_POINT_AWARD: true,
  NOTIFY_ON_MILESTONE: true,
  // Notify when user reaches certain point milestones
  MILESTONE_THRESHOLDS: [100, 500, 1e3, 2500, 5e3]
  // Point milestones for notifications
};
var calculateBookingPoints = (bookingValue, isFirstBooking = false, isVipMember = false) => {
  let basePoints = REWARDS_CONFIG.POINTS_PER_BOOKING;
  if (isFirstBooking) {
    basePoints = Math.floor(basePoints * REWARDS_CONFIG.FIRST_BOOKING_BONUS);
  }
  if (isVipMember) {
    basePoints = Math.floor(basePoints * REWARDS_CONFIG.VIP_MEMBER_MULTIPLIER);
  }
  return basePoints;
};

// server/controller/airwallex.controller.ts
var webhookListener = async (req, res) => {
  try {
    const data = req.body;
    const eventName = data.name;
    const intentId = data.data.object.id;
    const { request_id, merchant_order_id } = data.data.object;
    const status = data.data.object.status;
    console.log(data);
    const reservation = await storage.getReservationByExternalId(merchant_order_id);
    if (!reservation) throw Error("Reservation not found");
    if (reservation.paymentIntentId !== intentId)
      throw Error("Payment intent ID does not match");
    switch (eventName) {
      case "payment_intent.created" /* PAYMENT_INTENT_CREATED */:
        reservation.paymentStatus = "PENDING" /* PENDING */;
        break;
      case "payment_intent.updated" /* PAYMENT_INTENT_UPDATED */:
        reservation.paymentStatus = "PENDING" /* PENDING */;
        break;
      case "payment_intent.succeeded" /* PAYMENT_INTENT_SUCCEEDED */:
        reservation.paymentStatus = "SUCCESSFULL" /* SUCCESSFULL */;
        break;
      case "payment_intent.requires_customer_action" /* PAYMENT_INTENT_REQUIRES_CUSTOMER_ACTION */:
        reservation.paymentStatus = "PROCESSING" /* PROCESSING */;
        break;
      case "payment_intent.requires_capture" /* PAYMENT_INTENT_REQUIRES_CAPTURE */:
        reservation.paymentStatus = "PROCESSING" /* PROCESSING */;
        break;
      case "payment_intent.pending" /* PAYMENT_INTENT_PENDING */:
        reservation.paymentStatus = "PENDING" /* PENDING */;
        break;
      case "payment_intent.cancelled" /* PAYMENT_INTENT_CANCELLED */:
        reservation.paymentStatus = "CANCELLED" /* CANCELLED */;
        break;
      default:
        console.log("Webhook Received: ", eventName);
        console.log("Intent ID: ", intentId);
    }
    if (status === "SUCCEEDED" && eventName == "payment_intent.succeeded" /* PAYMENT_INTENT_SUCCEEDED */) {
      const paymentData = {
        propertyID: reservation.propertyID,
        reservationID: reservation.reservationId,
        type: "thirdparty",
        amount: data.data.object.amount,
        cardType: null,
        description: null
      };
      const paymentMethod = data.data.object.latest_payment_attempt.payment_method;
      switch (paymentMethod.type) {
        case "card":
          paymentData.type = "credit";
          paymentData.cardType = paymentMethod.card.brand;
          break;
        case "googlepay":
          paymentData.type = "thirdparty";
          break;
        case "applepay":
          paymentData.type = "thirdparty";
          break;
        default:
          paymentData.type = "thirdparty";
      }
      const paymentResponse = await postPayment(paymentData);
      if (!paymentResponse.success)
        throw Error("Cloudbeds: Payment creation failed");
      reservation.paymentID = paymentResponse.paymentID;
      if (reservation.userId && !reservation.pointsAwarded) {
        try {
          const bookingValue = parseFloat(reservation.grandTotal);
          const userReservations = await storage.getUserReservations(reservation.userId);
          const isFirstBooking = userReservations.length === 1;
          const pointsToAward = calculateBookingPoints(bookingValue, isFirstBooking, false);
          await storage.awardPoints(reservation.userId, pointsToAward);
          await storage.markPointsAwarded(reservation.id);
          console.log(`Awarded ${pointsToAward} points to user ${reservation.userId} for booking ${reservation.reservationId}`);
        } catch (error) {
          console.error("Error awarding points:", error);
        }
      } else if (reservation.pointsAwarded) {
        console.log(`Points already awarded for reservation ${reservation.reservationId}`);
      }
    }
    await storage.updatePaymentStatus(
      reservation.id,
      reservation.paymentStatus || "",
      intentId
    );
    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    res.status(200).json({ message: "Webhook received but failed to process" });
    console.error("Error processing webhook:", error);
  }
};

// server/middleware/verifyWebhook.ts
import crypto from "crypto";
var verifyWebhookSignature = (req, res, next) => {
  try {
    const signature = req.headers["x-signature"];
    const xTimestamp = req.headers["x-timestamp"];
    const secret = process.env.AIRWALLEX_WEBHOOK_SECRET;
    if (!signature || !xTimestamp || !secret) return res.status(400).json({ message: "Missing signature or timestamp" });
    console.log(signature, xTimestamp);
    const valueToDigest = xTimestamp + JSON.stringify(req.body);
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(valueToDigest).digest("hex");
    console.log(digest);
    if (digest !== signature) return res.status(400).json({ message: "Invalid signature" });
    next();
  } catch (error) {
  }
};

// server/routes.ts
async function registerRoutes(app2) {
  app2.options("/api/*", (req, res) => {
    res.status(204).end();
  });
  await setupAuth(app2);
  app2.get("/api/test1", (req, res) => {
    res.json({ message: "Hell O from Azzuro x Replit!" });
  });
  app2.get("/api/test-deployment", (req, res) => {
    res.json({
      status: "success",
      message: "API is running and updated!",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      cors: {
        allowedOrigins: [
          "https://azzurrohostels.vercel.app",
          "http://localhost:4000"
        ],
        configured: true
      },
      environment: process.env.NODE_ENV || "development",
      serverTime: (/* @__PURE__ */ new Date()).toLocaleString()
    });
  });
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/user/points", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const points = await storage.getUserPoints(userId);
      res.json({ points });
    } catch (error) {
      console.error("Error fetching user points:", error);
      res.status(500).json({ message: "Failed to fetch user points" });
    }
  });
  app2.get("/api/favorites", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const userFavorites = await storage.getUserFavorites(userId);
      res.json(userFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });
  app2.post("/api/favorites", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const favoriteData = insertFavoriteSchema.parse({
        ...req.body,
        userId
      });
      const isAlreadyFavorite = await storage.isFavorite(
        userId,
        favoriteData.itemType,
        favoriteData.itemId
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
  app2.delete(
    "/api/favorites/:itemType/:itemId",
    isAuthenticated,
    async (req, res) => {
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
    }
  );
  app2.get(
    "/api/favorites/check/:itemType/:itemId",
    isAuthenticated,
    async (req, res) => {
      try {
        const userId = req.user?.claims?.sub;
        const { itemType, itemId } = req.params;
        const isFav = await storage.isFavorite(userId, itemType, itemId);
        res.json({ isFavorite: isFav });
      } catch (error) {
        console.error("Error checking favorite:", error);
        res.status(500).json({ message: "Failed to check favorite" });
      }
    }
  );
  app2.get("/api/hotelDetails/:propertyId", async (req, res) => {
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
  app2.get("/api/roomTypes", getRooms);
  app2.get("/api/availableRooms", getAvailableRooms);
  app2.get("/api/roomTypeRate", getRoomTypeRate);
  app2.post("/api/createReservation", createReservation);
  app2.get("/api/reservations", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const userReservations = await storage.getUserReservations(userId);
      res.json(userReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });
  app2.get("/api/reservation-details/:id", getReservation);
  app2.get("/api/randomPayIntent", randomPayIntent);
  app2.post("/api/airwallex/webhook", verifyWebhookSignature, webhookListener);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: ["*.trycloudflare.com"],
    host: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    if (req.method === "OPTIONS") {
      return next();
    }
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    if (req.method === "OPTIONS") {
      return next();
    }
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
var allowedOrigins = [
  "https://azzurrohostels.vercel.app",
  "http://localhost:4000",
  "http://localhost:5173"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      const normalizedOrigin = origin.replace(/\/$/, "").toLowerCase();
      const matchedOrigin = allowedOrigins.find(
        (allowed) => allowed.replace(/\/$/, "").toLowerCase() === normalizedOrigin
      );
      if (matchedOrigin) {
        return callback(null, origin);
      }
      log(`CORS blocked origin: ${origin}. Allowed origins: ${allowedOrigins.join(", ")}`);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Content-Type"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (req.path.startsWith("/api") && origin) {
    log(`API Request: ${req.method} ${req.path} from origin: ${origin}`);
  }
  if (origin && allowedOrigins.some(
    (allowed) => allowed.replace(/\/$/, "").toLowerCase() === origin.replace(/\/$/, "").toLowerCase()
  )) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
    if (req.method === "OPTIONS") {
      log(`OPTIONS preflight handled for origin: ${origin}`);
      return res.status(204).end();
    }
  }
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0"
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
