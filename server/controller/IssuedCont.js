import IssuedBook from '../models/Issued.js'


export const issuebook = async (req, res) => {
    try {
      // Extract the data from the request body
      const { bookName, returnDate, issuedTo, price, fine } = req.body;
  
      // Create an instance of the IssuedBook model
      const issuedBook = new IssuedBook({
        bookName,
        returnDate,
        issuedTo,
        price,
        fine,
      });
  
      // Save the issued book to the database
      const savedIssuedBook = await issuedBook.save();
  
      res.status(201).json(savedIssuedBook);
    } catch (error) {
      console.error('Error during issuing book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  //getting issued books

  export const getIssued = async (req, res) => {
    try {
      // Retrieve all issued books from the database
      const issuedBooks = await IssuedBook.find();
  
      res.status(200).json(issuedBooks);
    } catch (error) {
      console.error('Error during fetching issued books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // deleting issued books

  export const deleteIssued = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the book by ID and delete it
      const deletedBook = await IssuedBook.findByIdAndDelete(id);
  
      if (deletedBook) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error deleting book:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }