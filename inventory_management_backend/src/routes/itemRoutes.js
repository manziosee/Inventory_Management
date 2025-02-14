// src/routes/itemRoutes.js
import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  exportItems,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createItem)
  .get(protect, getItems);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, admin, updateItem)
  .delete(protect, admin, deleteItem);

router.get('/export', protect, admin, exportItems);

export default router;
