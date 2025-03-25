import { Movie } from '../models/index.js';


export async function createMovie(req, res) {
    const { title,genre, releaseDate } = req.body;
    try {
        const movie = await Movie.create({
            title,
            genre,
            releaseDate,
        });
        return res.status(201).json({
            status: "success",
            data: movie,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
}


export async function getMovies(req, res) {
    try {
        const movies = await Movie.findAll();
        return res.status(200).json({
            status: "success",
            data: movies,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateMovie(req, res) {
    const { id } = req.params;
    const { title, genre, releaseDate } = req.body;
    try {
        const movie = await Movie.findOne({ where: { id: Number(id) } });
        if (movie) {
            await movie.update({ title, genre, releaseDate });
            return res.status(200).json({
                status: "success",
                data: movie,
            });
        }
        return res.status(404).json({ status: "error", error: "Movie not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export async function getOneMovie(req, res) {
    const { id } = req.params;
    try {
        const movie = await Movie.findOne({ where: { id: Number(id) } });
        if (movie) {
            return res.status(200).json({
                status: "success",
                data: movie,
            });
        }
        return res.status(404).json({ status: "error", error: "Movie not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteMovie(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Movie.destroy({ where: { id: Number(id) } });
        if (deleted) {
            return res.status(204).send("Movie deleted");
        }
        throw new Error("Movie not found");
    } catch (error) {
        return res.status(500).json({ error: error.message
        });
    }
}