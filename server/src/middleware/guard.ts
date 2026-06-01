import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for input validation middleware
  next();
};
