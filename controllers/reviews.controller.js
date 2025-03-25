
import { Review } from '../models/reviews.model.js';
import { User } from '../models/users.model.js';
import { Movie } from '../models/movies.model.js';

export async function createReview(req, res) {
    const review = await Review.create({
        text: req.body.text,
        rating: req.body.rating,
        movieId: +req.params.movieId,
        userId: req.user.id
    });
    return res.status(201).json(review);
}


export async function getReviewsByMovieId(req, res) {
    const reviews = await Review.findAll({
        where: {
            movieId: +req.params.movieId
        },
        
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name']
            },
            {
                model: Movie,
                as: 'movie',
                attributes: ['title']
            }
        ]
    });
    return res.status(200).json(reviews);
}

export async function getReviewsByUserId(req, res) {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Movie,
                as: 'movie',
                attributes: ['title']
            }
        ]
    });
    return res.status(200).json(reviews);
}