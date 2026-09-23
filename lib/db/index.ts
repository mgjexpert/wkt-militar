import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let schemaReadyPromise: Promise<void> | null = null;

const DATABASE_ENV_CANDIDATES = [
  "DATABASE_URL",
  "wkt_DATABASE_URL",
  "wkt_POSTGRES_URL",
  "wkt_POSTGRES_PRISMA_URL",
  "wkt_DATABASE_URL_UNPOOLED",
  "wkt_POSTGRES_URL_NON_POOLING",
] as const;

export function getDatabaseEnvSource() {
  for (const key of DATABASE_ENV_CANDIDATES) {
    if (process.env[key]) return key;
  }
  return null;
}

export function getDatabaseUrl() {
  const key = getDatabaseEnvSource();
  return key ? process.env[key] || null : null;
}

export function getDb() {
  const url = getDatabaseUrl();
  if (!url) return null;
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export async function ensurePaymentSchema() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("Database connection is not configured.");
  }

  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const sql = neon(url);

      await sql`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" serial PRIMARY KEY NOT NULL,
          "email" text NOT NULL UNIQUE,
          "name" text,
          "password_hash" text,
          "created_at" timestamp with time zone DEFAULT now() NOT NULL
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS "orders" (
          "id" serial PRIMARY KEY NOT NULL,
          "external_id" text NOT NULL UNIQUE,
          "user_email" text NOT NULL,
          "provider" text DEFAULT 'xpayments' NOT NULL,
          "provider_payment_id" text,
          "amount_cents" integer NOT NULL,
          "status" text DEFAULT 'pending' NOT NULL,
          "created_at" timestamp with time zone DEFAULT now() NOT NULL,
          "paid_at" timestamp with time zone
        )
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS "orders_provider_payment_id_uidx"
        ON "orders" ("provider_payment_id")
        WHERE "provider_payment_id" IS NOT NULL
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS "entitlements" (
          "id" serial PRIMARY KEY NOT NULL,
          "user_email" text NOT NULL,
          "product" text DEFAULT 'wkt-militar' NOT NULL,
          "active" boolean DEFAULT false NOT NULL,
          "starts_at" timestamp with time zone,
          "expires_at" timestamp with time zone
        )
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS "entitlements_user_product_uidx"
        ON "entitlements" ("user_email", "product")
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS "workout_progress" (
          "id" serial PRIMARY KEY NOT NULL,
          "user_email" text NOT NULL,
          "workout_id" integer NOT NULL,
          "completed" boolean DEFAULT false NOT NULL,
          "completed_at" timestamp with time zone
        )
      `;
    })();
  }

  try {
    await schemaReadyPromise;
  } catch (error) {
    schemaReadyPromise = null;
    throw error;
  }
}
