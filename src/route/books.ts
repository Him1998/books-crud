import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controller/book';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear')
    .isNumeric()
    .withMessage('Published year must be a valid number'),
];

// Routes
router.get('/api/books', getAllBooks);
router.get('/api/books/:id', getBookById);
router.post('/api/books', validateBook, createBook);
router.put('/api/books/:id', validateBook, updateBook);
router.delete('/api/books/:id', deleteBook);

export default router;
