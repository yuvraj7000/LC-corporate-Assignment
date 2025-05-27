import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number,
  publishedDate: Date
});

export default mongoose.model('Book', bookSchema);
