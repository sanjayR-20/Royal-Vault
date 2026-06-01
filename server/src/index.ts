import * as dotenv from 'dotenv';
import express from 'express';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../src/db/schema';

// Import routes
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, { schema });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function main() {
  try {
    await client.connect();
    console.log('✓ Connected to PostgreSQL');

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

main();
