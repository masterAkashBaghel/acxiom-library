import Book from "../models/Books.js";

export const addBook = async (req, res) => {
  try {
    const { author, bookName, price, subject } = req.body;

    // Validate that required fields are provided
    if (!author || !price || !subject || !bookName) {
      return res
        .status(400)
        .json({ error: "Author, price, and subject are required fields." });
    }

    // Create a new book instance using the Book model
    const newBook = new Book({
      author,
      bookName,
      price,
      subject,
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//   deleting book

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//editing the books

export const editBook = async (req, res) => {
  try {
    const { id } = req.params;

    const bookToUpdate = await Book.findById(id);

    if (!bookToUpdate) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedFields = req.body;
    Object.assign(bookToUpdate, updatedFields);

    const updatedBook = await bookToUpdate.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error editing book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
