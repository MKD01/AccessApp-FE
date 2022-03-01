import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import MainMap from "./components/Map";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/map" element={<MainMap />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
