-- Units: distance is stored in miles, elevation_gain in feet. Manual entry
-- only for now, so no unit conversion happens anywhere in this schema or app.

-- Drops data and recreates a branch new one for every run on postgresql
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS users;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar(50) UNIQUE NOT NULL,
  "email" varchar(50) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "full_name" varchar(100) NOT NULL,
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "rides" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES users(id), -- FK: each ride belongs to one user
  -- this is an inline FK, the other syntax is CONSTRAINT...
  "title" varchar(30),
  "description" varchar(500),
  "distance" DECIMAL(5, 1) CHECK ("distance" >= 0),
  "avg_speed" DECIMAL(4, 1) CHECK ("avg_speed" >= 0),
  "avg_power" integer CHECK ("avg_power" >= 0),
  "duration_seconds" integer CHECK ("duration_seconds" >= 0),
  "elevation_gain" integer CHECK ("elevation_gain" >= 0),
  "ride_type" varchar(20),
  "xp_earned" integer CHECK ("xp_earned" >= 0),
  "ride_date" date NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ON "rides" ("user_id", "ride_date");