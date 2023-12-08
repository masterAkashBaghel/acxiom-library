import React, { useState, useEffect } from 'react';
import {editdetails} from "../utils/api"

const Edit = ({ book,setedit,fetchBooks }) => {
  const [editedBook, setEditedBook] = useState({ ...book });

  useEffect(() => {
    // When the component mounts or the book prop changes, update the local state
    setEditedBook(book);
    console.log(book)
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSave = async() => {
    
   const id =editedBook._id;
   const data = editedBook;
   console.log(editedBook)
   await editdetails(id, data);
   fetchBooks();
     setedit(false);
  };
  const onCancel =()=>{
    setedit(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-md z-10">
        <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>

        <label htmlFor="bookName" className="block mb-2">
          Book Name:
        </label>
        <input
          type="text"
          id="bookName"
          name="bookName"
          value={editedBook.bookName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Add input fields for other book details (e.g., author, price, subject) */}
        <label htmlFor="author" className="block mb-2">
          Author:
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={editedBook.author}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label htmlFor="price" className="block mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={editedBook.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label htmlFor="subject" className="block mb-2">
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={editedBook.subject}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-red-400 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;

