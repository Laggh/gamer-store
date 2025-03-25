import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect} from 'react'
import Home from "./pages/Home"
import Navbar from "./components/Navbar";




//const serverIp = "http://localhost:3000/";
//const serverIp = "http://10.0.4.18:3000/";
//const serverIp = "http://26.93.92.158:3000/";
const serverIp = "http://192.168.1.7:3000/";


function App() {
  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
} 


export default App
