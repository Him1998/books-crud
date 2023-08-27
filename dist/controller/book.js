"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const books_1 = __importDefault(require("../model/books"));
const express_validator_1 = require("express-validator");
const getAllBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_1.default.find();
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const book = yield books_1.default.findById(bookId);
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getBookById = getBookById;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation chain
    const validationChain = [
        (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('author').notEmpty().withMessage('Author is required'),
        (0, express_validator_1.body)('publishedYear')
            .isNumeric()
            .withMessage('Published year must be a valid number'),
    ];
    // Run validation chain
    yield Promise.all(validationChain.map((validation) => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, author, publishedYear } = req.body;
    try {
        const book = yield books_1.default.create({ title, author, publishedYear });
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const { title, author, publishedYear } = req.body;
    try {
        const book = yield books_1.default.findByIdAndUpdate(bookId, { title, author, publishedYear }, { new: true });
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const book = yield books_1.default.findByIdAndDelete(bookId);
        if (book) {
            res.json({ message: 'Book deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteBook = deleteBook;
// Export these functions to use in your routes
exports.default = {
    getAllBooks: exports.getAllBooks,
    getBookById: exports.getBookById,
    createBook: exports.createBook,
    updateBook: exports.updateBook,
    deleteBook: exports.deleteBook,
};
