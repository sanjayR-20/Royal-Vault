import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Production configuration for connection handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                          // Maximum concurrent connections in pool
  idleTimeoutMillis: 30000,         // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000,    // Return an error if connection takes > 2s
});

export const db = drizzle(pool, { schema });