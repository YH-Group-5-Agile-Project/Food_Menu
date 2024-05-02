import React from "react"
import styles from "./NavbarComponent.module.css"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

const NavbarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 100%; /* Set a fixed width for the NavbarContainer */
  margin-bottom: 20px;
  padding: 5px;
`

interface NavbarProps {
  currentPage: string
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (<>
    <NameHeader>COCKTAILS AND FOOD</NameHeader>
    <NavbarContainer>
      <NavLink to="/main" className={({ isActive }) => (isActive ? styles.activeNav : styles.inactiveNav)}>
      {window.outerWidth < 949 ? "Main" : "Main dish"}
      </NavLink>
      <NavLink to="/sides" className={({ isActive }) => (isActive ? styles.activeNav : styles.inactiveNav)}>
      {window.outerWidth < 949 ? "Side" : "Side dish"}
      </NavLink>
      <NavLink to="/drink" className={({ isActive }) => (isActive ? styles.activeNav : styles.inactiveNav)}>
        Drink
      </NavLink>
      <NavLink to="/checkout" className={({ isActive }) => (isActive ? styles.activeNav : styles.inactiveNav)}>
        Checkout
      </NavLink>
    </NavbarContainer></>
  )
}

const NameHeader = styled.h1`
@media (max-width: 949px) {
  font-size: 2rem;
}

`