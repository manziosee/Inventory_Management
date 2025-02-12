import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 */
router.route('/')
  .post(protect, admin, createItem)
  .get(protect, getItems);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, admin, updateItem)
  .delete(protect, admin, deleteItem);

export default router;