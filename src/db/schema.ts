import { pgTable, uuid, varchar, integer, numeric, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Define enums to match Postgres
export const kycStatusEnum = pgEnum('kyc_status_enum', ['PENDING', 'VERIFIED', 'REJECTED']);
export const itemStatusEnum = pgEnum('item_status_enum', ['IN_VAULT', 'RENTED', 'IN_TRANSIT', 'MAINTENANCE']);
export const bookingStatusEnum = pgEnum('booking_status_enum', ['REQUESTED', 'CONFIRMED', 'DISPATCHED', 'RETURNED', 'COMPLETED']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  trustScore: integer('trust_score').notNull().default(100),
  kycStatus: kycStatusEnum('kyc_status').notNull().default('PENDING'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const jewelryItems = pgTable('jewelry_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  sku: varchar('sku', { length: 50 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  weightGrams: numeric('weight_grams', { precision: 6, scale: 3 }).notNull(),
  purity: varchar('purity', { length: 10 }).notNull(),
  status: itemStatusEnum('status').notNull().default('IN_VAULT'),
  rentalRatePerDay: numeric('rental_rate_per_day', { precision: 10, scale: 2 }).notNull(),
  securityDeposit: numeric('security_deposit', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});