// Filename - App.js
 
// Importing modules
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Test from "./pages/test";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Roster from "./pages/roster";
import Games from "./pages/games";
import Standings from "./pages/standings";

function App() {
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/test" element={<Test/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/roster" element={<Roster/>}></Route>
            <Route path="/games" element={<Games/>}></Route>
            <Route path="/standings" element={<Standings/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}
 
export default App;