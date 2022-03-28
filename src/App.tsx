import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/Navbar/navbar.mobile";
import { SidebarWrapper } from "./contexts/SidebarContext";
import RouteList from "./routes";

function App() {
  return (
    <SidebarWrapper>
      <BrowserRouter>
        <main className="min-h-screen flex flex-col">
          <Navbar />
          <MobileNavbar />
          <RouteList />
          <Footer />
        </main>
      </BrowserRouter>
    </SidebarWrapper>
  );
}

export default App;
