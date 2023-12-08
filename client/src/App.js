// App.js
import React, { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./compoenent/Login";
import Dashboard from "./compoenent/Dashboard";
import User from "./compoenent/User";
import SignUp from "./compoenent/SignUp";  
import DataProvider from "./compoenent/context/DataProvider";
import Navbar from "./compoenent/Navbar";
import Books from "./compoenent/Books";
import IssuedBooks from "./compoenent/IssuedBooks";

const PrivateRoute = ({ authenticate, ...props }) => {
  return authenticate ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  const [authenticate, setAuthenticate] = useState(false);

  return (
    <DataProvider>
      <Routes>
        <Route path="/login" element={<Login setAuthenticate={setAuthenticate} />} />
        <Route path="/signup" element={<SignUp />} />   
        
        <Route path="/" element={<PrivateRoute authenticate={authenticate} />}>
          <Route path="/userdashboard" element={<User />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path ='/books' element={<Books />} />
          <Route path="/issued" element={<IssuedBooks />}></Route>
        </Route>
      </Routes>
    </DataProvider>
  );
};

export default App;
