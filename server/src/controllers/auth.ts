import { Request, Response } from 'express';
import { db } from '../index';
import { users } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, passwordHash, trustScore } = req.body;

    if (!fullName || !email || !passwordHash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = await db
      .insert(users)
      .values({
        fullName,
        email,
        passwordHash,
        trustScore: trustScore || 100,
      })
      .returning();

    res.json({ user: newUser[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || user.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // TODO: Implement password verification

    res.json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
