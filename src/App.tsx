import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MainPage"
import SidePage from "./pages/SidePage"
import DrinkPage from "./pages/DrinkPage"
import CheckoutPage from "./pages/CheckoutPage"
import { styled } from "styled-components"
import { Navbar } from "./components/Nav/NavbarComponent"
import { NavButtons } from "./components/Nav/NavButtonsComponent"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"

function App() {

  const location = useLocation()

  return (
    // navbar
    <>
      <LayoutDiv>
        {location.pathname !== "/" && location.pathname !== "/orderconfirmation" && (
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
            <Route path="/orderconfirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </ContentDiv>
      </LayoutDiv>
    </>
  )
}

const ContentDiv = styled.div`
  //padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: start;
  height: 70vh;
  max-width: 900px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: overlay;
  scrollbar-gutter: stable;

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
  height: 100vh;
  min-height: 60vh;
  padding-top: 10vh;
  top: 0;

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
  max-width: 1100px;
  margin-bottom: 30px;
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

export default App