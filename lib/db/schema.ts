import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  userEmail: text("user_email").notNull(),
  provider: text("provider").notNull().default("xpayments"),
  providerPaymentId: text("provider_payment_id"),
  amountCents: integer("amount_cents").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const entitlements = pgTable("entitlements", {
  id: serial("id").primaryKey(),
  userEmail: text("user_email").notNull(),
  product: text("product").notNull().default("wkt-militar"),
  active: boolean("active").notNull().default(false),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const workoutProgress = pgTable("workout_progress", {
  id: serial("id").primaryKey(),
  userEmail: text("user_email").notNull(),
  workoutId: integer("workout_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});
