import express from 'express';
import {
  createDamageReport,
  getDamageReports,
  updateDamageReport,
} from '../controllers/damageReportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/damage-reports:
 *   post:
 *     summary: Create a new damage report
 *     tags: [Damage Reports]
 *     security:
 *       - bearerAuth: []
 */
router.route('/')
  .post(protect, createDamageReport)
  .get(protect, getDamageReports);

router.route('/:id')
  .put(protect, admin, updateDamageReport);

export default router;