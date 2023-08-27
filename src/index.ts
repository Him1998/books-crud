import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bookRoutes from './route/books';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(bookRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect('mongodb+srv://himanshup702:uoBqTaXWbtb2h0C9@cluster0.wazskqq.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
