import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import backgroundImg from "../../assets/design-assets/Leather1.png"

interface NavbarProps {
  currentPage: string
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <NameHeader>COCKTAILS AND FOOD</NameHeader>
      <NavbarContainer>
        <StyledNavLink to="/main">{window.outerWidth < 949 ? "Main" : "Main dish"}</StyledNavLink>
        <StyledNavLink to="/sides">{window.outerWidth < 949 ? "Side" : "Side dish"}</StyledNavLink>
        <StyledNavLink to="/drink">Drink</StyledNavLink>
        <StyledNavLink to="/checkout">Checkout</StyledNavLink>
      </NavbarContainer>
    </>
  )
}

const NameHeader = styled.h1`
  @media (max-width: 949px) {
    font-size: 2rem;
  }
`
const NavbarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
  padding: 5px;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  min-width: 10rem;
  width: 24%;
  height: 100%;
  padding: 10px;
  border: 1px solid var(--firstColor);
  border-top-left-radius: 50px;
  border-top-right-radius: 5%;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 50px;
  color: var(--firstColor);
  background: url(${backgroundImg}), linear-gradient(rgb(253, 143, 143), var(--thirdColor));

  &:hover {
    background: url(${backgroundImg}), linear-gradient(rgb(244, 255, 174), var(--fourthColor));
    color: #000000;
  }

  @media (max-width: 949px) {
    min-width: 5rem;
  }

  @media (max-width: 549px) {
    font-size: 16px;
  }

  &.active {
    font-weight: bold;
    color: var(--firstColor);
    background: url(${backgroundImg}), linear-gradient(rgb(188, 255, 134), var(--secondColor));
  }
`
