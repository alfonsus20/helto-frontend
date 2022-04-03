import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/Navbar/navbar.mobile";

import { ModalWrapper } from "./context/ModalContext";
import { SidebarWrapper } from "./context/SidebarContext";
import { UserWrapper } from "./context/UserContext";

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
    <BrowserRouter>
      <UserWrapper>
        <ModalWrapper>
          <SidebarWrapper>
            <ScrollToTop />
            <main className="min-h-screen flex flex-col">
              <Navbar />
              <MobileNavbar />
              <RouteList />
              <Footer />
            </main>
          </SidebarWrapper>
        </ModalWrapper>
      </UserWrapper>
    </BrowserRouter>
  );
}

export default App;
