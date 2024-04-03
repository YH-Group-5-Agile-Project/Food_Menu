import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%; /* Set a fixed width for the NavbarContainer */
  margin-bottom: 20px;
`;

interface MenuItemProps 
{
  isActive: boolean;
}

const MenuItem = styled(NavLink)<MenuItemProps>`
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  min-width: 200px;
  width: 25%;
  height: 100%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 50px; 
  color: black;
  background-color: ${({ isActive }) => (isActive ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.3)')};

`;

interface NavbarProps {
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  return (
    <NavbarContainer>
      <MenuItem to="/menu" isActive={currentPage === "menu"}>
        Main dish
      </MenuItem>
      <MenuItem to="/sides" isActive={currentPage === "sides"}>
        Side dish
      </MenuItem>
      <MenuItem to="/drink" isActive={currentPage === "drink"}>
        Drink
      </MenuItem>
      <MenuItem to="/checkout" isActive={currentPage === "checkout"}>
        Checkout
      </MenuItem>
    </NavbarContainer>
  );
};