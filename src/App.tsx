import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/Navbar/navbar.mobile";
import { ModalWrapper } from "./context/ModalContext";
import { SidebarWrapper } from "./context/SidebarContext";
import RouteList from "./routes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ModalWrapper>
      <SidebarWrapper>
        <BrowserRouter>
          <ScrollToTop />
          <main className="min-h-screen flex flex-col">
            <Navbar />
            <MobileNavbar />
            <RouteList />
            <Footer />
          </main>
        </BrowserRouter>
      </SidebarWrapper>
    </ModalWrapper>
  );
}

export default App;
