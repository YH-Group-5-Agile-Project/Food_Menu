import { Routes, Route, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MainPage";
import SidePage from "./pages/SidePage";
import DrinkPage from "./pages/DrinkPage";
import CheckoutPage from "./pages/CheckoutPage";
// import CartComponent from "./components/CartComponent";

import "./App.css";
import { styled } from "styled-components";
import { Navbar } from "./components/NavbarComponent";
import { NavButtons } from "./components/NavButtonsComponent";
import { useEffect, useState } from "react";


function App() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // navbar
    <>
      {location.pathname !== "/" && (
          <NavigationWrapper $scrolled={scrolled}>
            <Navbar currentPage={location.pathname} />
            <NavButtons />
          </NavigationWrapper>
        )}
      

      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MenuPage />} />
          <Route path="/sides" element={<SidePage />} />
          <Route path="/drink" element={<DrinkPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

const NavigationWrapper = styled.div<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5px;
  width: 100%;
  background-color: ${(props) => (props.$scrolled ? '#242424' : 'transparent')};

  @media (prefers-color-scheme: light) {
    color: #213547;
    background-color: #ffffff;
  }
`

export const ToggleCartOverlay = styled.a`
  position: fixed;
  top: 0;
  left: 0; 
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`

export default App;
