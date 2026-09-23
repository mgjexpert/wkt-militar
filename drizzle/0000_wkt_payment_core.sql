CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "name" text,
  "password_hash" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

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
);

CREATE UNIQUE INDEX IF NOT EXISTS "orders_provider_payment_id_uidx"
ON "orders" ("provider_payment_id")
WHERE "provider_payment_id" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "entitlements" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_email" text NOT NULL,
  "product" text DEFAULT 'wkt-militar' NOT NULL,
  "active" boolean DEFAULT false NOT NULL,
  "starts_at" timestamp with time zone,
  "expires_at" timestamp with time zone
);

CREATE UNIQUE INDEX IF NOT EXISTS "entitlements_user_product_uidx"
ON "entitlements" ("user_email", "product");

CREATE TABLE IF NOT EXISTS "workout_progress" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_email" text NOT NULL,
  "workout_id" integer NOT NULL,
  "completed" boolean DEFAULT false NOT NULL,
  "completed_at" timestamp with time zone
);
