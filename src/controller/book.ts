import { Request, Response } from 'express';
import Book, { IBook } from '../model/books';
import {body , validationResult } from 'express-validator';

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  // Validation chain
  const validationChain = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('publishedYear')
      .isNumeric()
      .withMessage('Published year must be a valid number'),
  ];

  // Run validation chain
  await Promise.all(validationChain.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, publishedYear } = req.body;

  try {
    const book = await Book.create({ title, author, publishedYear });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { title, author, publishedYear } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author, publishedYear },
      { new: true }
    );

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (book) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export these functions to use in your routes
export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
