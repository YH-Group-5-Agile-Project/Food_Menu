import React from 'react';
import styles from './NavbarComponent.module.css';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%; /* Set a fixed width for the NavbarContainer */
  margin-bottom: 20px;
`;

interface NavbarProps {
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <NavbarContainer >
      <NavLink to="/main" className={({isActive}) => isActive ? styles.activeNav : styles.inactiveNav }>
        Main dish
      </NavLink>
      <NavLink to="/sides" className={({isActive}) => isActive ? styles.activeNav : styles.inactiveNav }>
        Side dish
      </NavLink>
      <NavLink to="/drink" className={({isActive}) => isActive ? styles.activeNav : styles.inactiveNav }>
        Drink
      </NavLink>
      <NavLink to="/checkout" className={({isActive}) => isActive ? styles.activeNav : styles.inactiveNav }>
        Checkout
      </NavLink>
    </NavbarContainer>
  );
};
