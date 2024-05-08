import React from 'react';
import './App.css';
import ToDo from "./Views/ToDo.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/home" element={<ToDo />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
