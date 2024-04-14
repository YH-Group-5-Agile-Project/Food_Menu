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
function App() {

  const location = useLocation();

  return (
    // navbar
    <>
      {location.pathname !== "/" && (
          <NavigationWrapper>
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

const NavigationWrapper = styled.div`
  position: sticky;
  top: 5px;
  z-index: 1;
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
