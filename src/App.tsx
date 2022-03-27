import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RouteList from "./routes";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <RouteList />
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
