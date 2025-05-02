import express from 'express';
import {
  uploadMovie,
  getAllMovies,
  getMovieByName,
  getMoviesByCategory,
} from '../controllers/movieController.js';

const router = express.Router();

router.post('/upload', uploadMovie);
router.get('/', getAllMovies);
router.get('/name/:name', getMovieByName);
router.get('/category/:categoryId', getMoviesByCategory);

export default router;
