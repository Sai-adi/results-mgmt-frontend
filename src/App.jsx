import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import AddResult from "./pages/AddResults";
import UpdateResult from "./pages/UpdateResults";

const isAuthenticated = () => {
  return localStorage.getItem("auth") === "admin-token";
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home/>: <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard key={Date.now()} /> : <Navigate to="/login" />} />
        <Route path="/add-result" element={isAuthenticated() ? <AddResult/>: <Navigate to="/login"/>}/>
        
        <Route path="/update-result/:roll_number" element={isAuthenticated()?<UpdateResult/>: <Navigate to="/login"/>} />

        <Route path="/update-reult" element={<div>Please provide a roll number in the URL.</div>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
        
      </Routes>
    </Router>
  );
};

export default App;