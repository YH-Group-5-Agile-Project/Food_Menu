import { useState } from "react";
import { MainDish } from "../Models/MainDish";
import styled from "styled-components"

type FoodProps = {
  color: string;
  width?: string;
  height?: string;
  isBig: boolean;
}

const StyledFood = styled.div<FoodProps>`
  background-color: ${(props) => props.color};
  width: ${(props) => (props.isBig ? '90%' : '200px')};
  /* height: ${(props) => (props.isBig ? '400px' : '250px')}; */
  margin: ${(props) => (props.isBig ? '100px 200px' : '0')};
  flex: 0 0 30%;
  position: relative;
  transition: all 1s ease;

  h2 {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
    color: white;
    background-color: rgba(0,0,0,0.5);
    box-shadow: 0 0 5px rgba(0,0,0,1);
    border-radius: 100px;
    padding: 10px;
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

interface DishComponentProps {
  key: number
  dish: MainDish
  isBig: boolean
  onClick: () => void
}



const DishComponent: React.FC<DishComponentProps> = ({ key, dish, isBig }) => {
  
  return (
      <StyledFood color={isBig ? 'blue' : 'red'} isBig={isBig}>
        <h2>{dish.title}</h2>
        <img src={dish.imageUrl} width={200} alt={dish.title} ></img>
        {isBig && <p>{dish.description}</p>}
      </StyledFood>
  );
};

export default DishComponent;
