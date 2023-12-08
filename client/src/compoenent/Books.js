import React, { useEffect, useState } from "react";
import { addBookToDataSource, getallBooks, deleteBook } from "../utils/api";
import Edit from "./Edit";

const Books = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const books = await getallBooks();
      setAvailableBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  //adding new books
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    subject: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = {
      bookName: formData.bookName,
      author: formData.authorName,
      subject: formData.subject,
      price: formData.price,
    };

    await addBookToDataSource(newBook);
    fetchBooks();
    setFormData([]);

    // Close the modal after adding the book
    setShowAddBookModal(false);
  };
 
  const [editBook, setEditBook] = useState(null);
  const [edit, setedit] = useState(false);

  const handleEditBook = (book) => {
    setEditBook(book);
    setedit(true);
  };
  return (
    <div className=" flex flex-col justify-center items-center mt-[80px] w-[80%]">
      <h2 className="text-2xl font-semibold mb-4">Books</h2>

      {/* Display Available Books */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Available Books</h3>
        <table className="  border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Book Name</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableBooks.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{book.bookName}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">${book.price}</td>
                <td className="py-2 px-4 border-b">{book.subject}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 mr-2 rounded hover:bg-blue-600"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>

                  {/* mdal for editing */}

                  {edit && (
                    <div>
                      <Edit
                        book={editBook}
                        setedit={setedit}
                        fetchBooks={fetchBooks}
                      ></Edit>
                    </div>
                  )}

                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display Issued Books */}

      {/* Add Book Section with Modal */}
      <div className="mt-6">
        <button
          onClick={() => setShowAddBookModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Book
        </button>

        {showAddBookModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto   bg-gray-500 opacity-100">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Book</h2>

                {/* Form to add a new book */}
                <form onSubmit={handleAddBook}>
                  <label htmlFor="bookName" className="block mb-2">
                    Book Name:
                  </label>
                  <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    value={formData.bookName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />

                  <label htmlFor="authorName" className="block mb-2">
                    Author Name:
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />

                  <label htmlFor="subject" className="block mb-2">
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />

                  <label htmlFor="price" className="block mb-2">
                    Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Add Book
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
