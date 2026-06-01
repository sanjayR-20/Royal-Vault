import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth';
import { validateJWT } from '../middleware/guard';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', validateJWT, getProfile);

export default router;
