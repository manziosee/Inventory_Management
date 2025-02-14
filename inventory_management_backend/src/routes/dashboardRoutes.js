import express from 'express';
import {
  getDashboardStats,
  getRecentActivities,
  getInventoryStatus,
  exportDashboardData,
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/activities', protect, getRecentActivities);
router.get('/inventory-status', protect, getInventoryStatus);
router.get('/export', protect, exportDashboardData);

export default router;
