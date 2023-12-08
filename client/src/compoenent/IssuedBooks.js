import React, { useEffect, useState } from "react";
import { issueBook ,getall,removeissuedbook} from "../utils/api";
import lib from '../compoenent/assets/lib.jpg'
const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [showIssueBookModal, setShowIssueBookModal] = useState(false);

  const[allbooks,setall]= useState();
  useEffect(()=>{
    getAllBooks();
  },[]);

  const getAllBooks = async ()=>{
    try {
        const books = await getall();
        setall(books);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
  }

  // Function to handle issuing a book
  const handleIssueBook = async (e) => {
    e.preventDefault();

    // Create an object to store form data
    const formData = {
      bookName: e.target.bookName.value,
      returnDate: e.target.returnDate.value,
      issuedTo: e.target.issuedTo.value,
      fine: e.target.fine.value,
      price: e.target.price.value,
    };

    console.log("Form Data:", formData);

    // Now you can use these values as needed

    setIssuedBooks([
      ...issuedBooks,
      { id: issuedBooks.length + 1, ...formData },
    ]);

    // Call the API with the form data
    await issueBook(formData);
       getAllBooks();
    setShowIssueBookModal(false);
  };
//removing books

const removeBook = async (id)=>{

    await removeissuedbook(id);
    getAllBooks();


}
  return (
   <div className=" flex justify-center items-center">
    
     <div className=" flex flex-col justify-center items-center mt-[200px] border p-5 w-[50%] mx-auto  bg-slate-300 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Issued Books</h3>

      {/* Display Issued Books in a Table */}
      <table className="table-auto    w-full ">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Return Date</th>

            <th>Price</th>
            <th>Issued To</th>
            <th>Fine</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { allbooks && allbooks.map((book) => (
            <tr key={book._id}>
              <td>{book.bookName}</td>
              <td>{new Date(book.returnDate).toLocaleDateString('en-US')}</td>

              
              <td>${book.price}</td>
              <td>{book.issuedTo}</td>
              <td>${book.fine}</td>
              <td>
             
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={()=>removeBook(book._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to Open the Modal */}
      <button
        onClick={() => setShowIssueBookModal(true)}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
      >
        Issue Book
      </button>

      {/* Modal for Issuing a Book */}
      {showIssueBookModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Issue Book</h2>
              {/* Form to submit book issue details */}
              <form onSubmit={(e) => handleIssueBook(e)}>
                <label htmlFor="bookName" className="block mb-2">
                  Book Name:
                </label>
                <input
                  type="text"
                  id="bookName"
                  name="bookName"
                  className="w-full p-2 mb-4 border rounded"
                  required
                />

                <label htmlFor="returnDate" className="block mb-2">
                  Return Date:
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  className="w-full p-2 mb-4 border rounded"
                  required
                />

                <label htmlFor="issuedTo" className="block mb-2">
                  Issued To:
                </label>
                <input
                  type="text"
                  id="issuedTo"
                  name="issuedTo"
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
                  className="w-full p-2 mb-4 border rounded"
                  required
                />

                <label htmlFor="fine" className="block mb-2">
                  Fine:
                </label>
                <input
                  type="number"
                  id="fine"
                  name="fine"
                  className="w-full p-2 mb-4 border rounded"
                  required
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>

              {/* Close Modal Button */}
              <button
                onClick={() => setShowIssueBookModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   </div>
  );
};

export default IssuedBooks;
