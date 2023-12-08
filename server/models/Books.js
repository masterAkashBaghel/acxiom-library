// Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
   
  author: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
   subject:{
    type: String,
    required: true,
   }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
 