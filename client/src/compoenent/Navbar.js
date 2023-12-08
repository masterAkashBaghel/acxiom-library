import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
  <aside className="bg-gray-800 text-white">
    {/* Sidebar content */}
    <div className="flex items-center justify-between p-4">
      <h1 className="text-xl font-semibold text-center">Your Library</h1>
    </div>
    <nav className="flex">
      <Link
        to="/issued"
        className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
      >
        Issued books
      </Link>

      <Link
        to="/books"
        className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
      >
        Books
      </Link>
      <Link  className="block py-2 px-4 text-gray-200 hover:bg-gray-700" to ="/login">Logout</Link>
    </nav>
  </aside>
</div>

  )
}

export default Navbar
