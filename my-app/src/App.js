import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import AddSchool from './addSchool.js';
import SchoolList from './SchoolCardList.js'; // Update import path

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddSchool />} />
      <Route path="/schools" element={<SchoolList />} /> {/* Update path */}
    </Routes>
  );
}

export default App;


