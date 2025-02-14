import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateNotifications,
  updatePassword,
} from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/notifications')
  .put(protect, updateNotifications);

router.route('/password')
  .put(protect, updatePassword);

export default router;
