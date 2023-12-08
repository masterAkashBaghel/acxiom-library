// AdminDashboard.js
import React, { useEffect, useState } from "react";
 
import { getallBooks, getall } from '../utils/api'
import Navbar from "./Navbar";

const Dashboard = () => {
  const [allBooksCount, setAllBooksCount] = useState(0);
  const [issuedBooksCount, setIssuedBooksCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const allBooks = await getallBooks();
      const issuedBooks = await getall();

      setAllBooksCount(allBooks.length);
      setIssuedBooksCount(issuedBooks.length);
    } catch (error) {
      console.error("Error fetching book counts:", error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>
        </header>

        <section className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold mb-2">All Books</h3>
                <p className="text-3xl font-bold">{allBooksCount}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold mb-2">Issued Books</h3>
                <p className="text-3xl font-bold">{issuedBooksCount}</p>
              </div>
            </div>
          </div>
           
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
