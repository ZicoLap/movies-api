import express from 'express';
import  * as moviesController from '../controllers/movies.controller.js';
import { asyncHandler } from '../utils/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/', 
    
    authenticateUser,
    asyncHandler(isAdmin),
    asyncHandler(moviesController.createMovie));

router.put('/:id', 
    authenticateUser,
    asyncHandler(isAdmin),
    asyncHandler(moviesController.updateMovie));

router.get('/',
    authenticateUser,
    asyncHandler(moviesController.getMovies));

router.get('/:id', 
    authenticateUser,
    asyncHandler(moviesController.getOneMovie));

router.delete('/:id', 
    authenticateUser,
    asyncHandler(isAdmin),
    asyncHandler(moviesController.deleteMovie));

export default router;
