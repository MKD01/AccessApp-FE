import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import MainMap from "./components/Home/Map";
import ErrorPage from "./components/Errors/ErrorPage";
import Login from "./components/Login/Login";
import Nav from "./components/Layout/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/map' element={<MainMap />}></Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
