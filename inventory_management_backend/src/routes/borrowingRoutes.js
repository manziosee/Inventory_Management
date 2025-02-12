import express from 'express';
import {
  createBorrowing,
  getBorrowings,
  returnItem,
  getOverdueBorrowings,
} from '../controllers/borrowingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/borrowings:
 *   post:
 *     summary: Create a new borrowing record
 *     tags: [Borrowings]
 *     security:
 *       - bearerAuth: []
 */
router.route('/')
  .post(protect, admin, createBorrowing)
  .get(protect, getBorrowings);

router.get('/overdue', protect, getOverdueBorrowings);
router.put('/:id/return', protect, admin, returnItem);

export default router;