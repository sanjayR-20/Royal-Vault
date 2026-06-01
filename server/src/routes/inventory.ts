import { Router } from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/inventory';
import { validateJWT } from '../middleware/guard';

const router = Router();

// Public routes
router.get('/', getItems);
router.get('/:id', getItemById);

// Protected routes (require authentication)
router.post('/', validateJWT, createItem);
router.put('/:id', validateJWT, updateItem);
router.delete('/:id', validateJWT, deleteItem);

export default router;
