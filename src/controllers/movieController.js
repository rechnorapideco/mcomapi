import Movie from '../models/Movie.js';
import Category from '../models/Category.js';

export const uploadMovie = async (req, res) => {
    try {
      const {
        name,
        description,
        imdbRating,
        link,
        screenshots,
        storyline,
        categoryId,
        uploadedBy,
        gmail,
      } = req.body;
  
      if (screenshots?.length > 10)
        return res.status(400).json({ error: 'Max 10 screenshots allowed' });
  
      const movie = new Movie({
        name,
        description,
        imdbRating,
        link,
        screenshots,
        storyline,
        category: categoryId,
        uploadedBy,
        gmail,
      });
  
      await movie.save();
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate('category', 'name');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMovieByName = async (req, res) => {
  try {
    const { name } = req.params;
    const movie = await Movie.findOne({ name }).populate('category', 'name');
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const movies = await Movie.find({ category: categoryId }).populate('category', 'name');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
