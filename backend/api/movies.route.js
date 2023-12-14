import { Router } from 'express';
import MoviesController from './movies.controller.js';

const router = Router();
router.route('/').get(MoviesController.apiGetMovies);

export default router;
