import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RouteList from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteList />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
