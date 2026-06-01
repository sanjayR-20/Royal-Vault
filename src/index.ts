import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './db/schema';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  const db = drizzle(client, { schema });

  console.log('Connected to PostgreSQL database');
  console.log('Database instance created with Drizzle ORM');

  await client.end();
}

main().catch(console.error);
