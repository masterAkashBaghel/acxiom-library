// IssuedBook.js
import mongoose from 'mongoose';

const issuedBookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  issuedTo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fine: {
    type: Number,
    required: true,
  },
});

const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);

export default IssuedBook;
