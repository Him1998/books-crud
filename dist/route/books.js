"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controller/book");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// Validation middleware
const validateBook = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('author').notEmpty().withMessage('Author is required'),
    (0, express_validator_1.body)('publishedYear')
        .isNumeric()
        .withMessage('Published year must be a valid number'),
];
// Routes
router.get('/api/books', book_1.getAllBooks);
router.get('/api/books/:id', book_1.getBookById);
router.post('/api/books', validateBook, book_1.createBook);
router.put('/api/books/:id', validateBook, book_1.updateBook);
router.delete('/api/books/:id', book_1.deleteBook);
exports.default = router;
