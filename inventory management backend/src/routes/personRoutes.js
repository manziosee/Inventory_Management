// src/routes/personRoutes.js
import express from 'express';
import {
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
} from '../controllers/personController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createPerson).get(protect, getPeople);
router
  .route('/:id')
  .get(protect, getPersonById)
  .put(protect, admin, updatePerson)
  .delete(protect, admin, deletePerson);

export default router;  // Change this line