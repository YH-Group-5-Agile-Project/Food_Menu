import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MainPage";
import SidePage from "./pages/SidePage";
import DrinkPage from "./pages/DrinkPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartComponent from "./components/CartComponent";

import "./App.css";
import { styled } from "styled-components";

function App() {
  return (
    // navbar
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MenuPage />} />
        <Route path="/sides" element={<SidePage />} />
        <Route path="/drink" element={<DrinkPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order" element={<CartComponent />} />
      </Routes>
    </Router>
  );
}

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
