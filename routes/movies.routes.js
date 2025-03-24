import express from 'express';
import  * as moviesController from '../controllers/movies.controller.js';
import { asyncHandler } from '../utils/helpers.js';

const router = express.Router();

router.post('/', asyncHandler(moviesController.createMovie));


export default router;
