import { useState } from "react";
import { MainDish } from "../Models/MainDish";
import styled from "styled-components"

type FoodProps = {
  color: string;
  width?: string;
  height?: string;
}

const Wrapper = styled.div`
  margin: 0 auto;
`

const StyledFood = styled.div<FoodProps>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width || '300px'};
  height: ${(props) => props.height || 'auto'};
  position: relative;

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
  dish: MainDish
}



const DishComponent: React.FC<DishComponentProps> = ({ dish }) => {

  const [isBig,setIsBig] = useState(true);

  const handleClick = () => {
    setIsBig(!isBig)
  }
  
  return (
    <Wrapper onClick={handleClick}>
      {isBig ? (
        <StyledFood color="blue">
          <h2>{dish.title}</h2>
          <img src={dish.imageUrl} width={250} height={250} alt={dish.title} >
          </img>
        </StyledFood>
      ):(
        <StyledFood color="red">
          <h2>{dish.title}</h2>
          <img src={dish.imageUrl} width={250} height={250} alt={dish.title} ></img>
          <p>{dish.description}</p>
        </StyledFood>
      )}
    </Wrapper>
  );
};

export default DishComponent;
