import express from 'express';
import Book from '../models/book.js';

const router = express.Router();


router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

router.put('/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

export default router;
