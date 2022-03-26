import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RouteList from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteList />
    </BrowserRouter>
  );
}

export default App;
