import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imdbRating: { type: Number, min: 0, max: 10 },
  link: { type: String },
  screenshots: [{ type: String }],
  storyline: { type: String },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }],
  uploadedBy: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;