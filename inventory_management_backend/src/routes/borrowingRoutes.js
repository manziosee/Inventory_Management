import express from 'express';
import {
  createBorrowing,
  getBorrowings,
  returnItem,
  getOverdueBorrowings,
  exportBorrowings,
  exportDamageReports,
} from '../controllers/borrowingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createBorrowing)
  .get(protect, getBorrowings);

router.get('/overdue', protect, getOverdueBorrowings);
router.put('/:id/return', protect, admin, returnItem);
router.get('/export-borrowings', protect, admin, exportBorrowings);
router.get('/export-damage-reports', protect, admin, exportDamageReports);

export default router;
