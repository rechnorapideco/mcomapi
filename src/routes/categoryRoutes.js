import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryByName,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.get('/:name', getCategoryByName);

export default router;
