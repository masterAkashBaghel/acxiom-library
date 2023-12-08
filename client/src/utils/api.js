import axios from "axios";

export const addBookToDataSource = async (book) => {
  try {
    console.log(book);
    const url = "http://localhost:5001/addbook";

    const response = await axios.post(url, book);

    if (response.status === 201) {
      console.log("Book added successfully:", response.data);
    } else {
      console.error("Failed to add book. Server response:", response);
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

export const getallBooks = async () => {
  const url = "http://localhost:5001/getAllBooks";
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch books");
    }
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    console.log(id);

    const response = await axios.delete(`http://localhost:5001/delete/${id}`);

    if (response.status === 200) {
      console.log("Book deleted successfully");
      return true;
    } else {
      console.error("Failed to delete book");
      return false;
    }
  } catch (error) {
    console.error("Error deleting book:", error.message);
    throw error;
  }
};

// handling issuing of books

export const issueBook = async (book) => {
  try {
    const url = "http://localhost:5001/issuebook";
    const response = await axios.post(url, book);

    if (response.status === 201) {
      console.log("Book issued successfully");
    } else {
      console.error("Failed to issue book");
    }
  } catch (error) {
    console.error("Error during book issuing:", error);
  }
};

export const getall = async () => {
  try {
    const response = await axios.get("http://localhost:5001/issue");

    return response.data;
  } catch (error) {
    console.error("Error fetching issued books:", error);
    throw error;
  }
};

export const removeissuedbook = async (id) => {
  const url = `http://localhost:5001/deleteIssued/${id}`;
  try {
    await axios.delete(url);
  } catch (error) {
    console.error("Error deleting issued books:", error);
    throw error;
  }
};

export const editdetails = async (id, updatedBook) => {
  const url = `http://localhost:5001/editBook/${id}`;

  try {
    const response = await axios.put(url, updatedBook);

    if (response.status === 200) {
      console.log("Book details updated successfully:", response.data);

      return response.data;
    } else {
      console.error("Error updating book details:", response.status);

      throw new Error(
        `Failed to update book details. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error updating book details:", error.message);

    throw error;
  }
};
