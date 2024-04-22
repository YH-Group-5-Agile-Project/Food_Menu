import { Routes, Route, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MainPage";
import SidePage from "./pages/SidePage";
import DrinkPage from "./pages/DrinkPage";
import CheckoutPage from "./pages/CheckoutPage";
// import CartComponent from "./components/CartComponent";
import BackgroundImg from '../assets/design-assets/BackgrundImg.png'

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
      <LayoutDiv>
      {location.pathname !== "/" && (
        <NavigationWrapper>
            <Navbar currentPage={location.pathname} />
            <NavButtons />
          </NavigationWrapper>
        )}
          <ContentDiv>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/main" element={<MenuPage />} />
                  <Route path="/sides" element={<SidePage />} />
                  <Route path="/drink" element={<DrinkPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
          </ContentDiv>
      </LayoutDiv>
  );
}

const BackgroundImage = styled.img`
  position: fixed;
  object-fit: cover;
  top: 0;
  left: 0;
`

const ContentDiv = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: start;
  height: 70vh;
  max-width: 880px;
  overflow: scroll;

  @media (max-height: 999px) {
    height: 100vh;
  }

  @media (max-height: 1200px) {
    height: 89vh;
  }
`

const LayoutDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  width: 100vw;
  max-width: 1100px;
  height: 100vh;
  min-height: 60vh;
  padding-top: 10vh;

  @media (max-height: 1200px) {
    padding-top: 0;
    top: 0;
  }

`
const NavigationWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5px;
  width: 100%;

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
