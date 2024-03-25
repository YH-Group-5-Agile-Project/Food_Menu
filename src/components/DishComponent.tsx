import { useState } from "react";
import { MainDish } from "../Models/MainDish";
import { AddToCartPopup } from "./AddToCartPopup";
import { styled } from "styled-components";

interface DishComponentProps {
  key: number
  dish: MainDish
  isBig: boolean
  onClick: () => void
}

const DishComponent: React.FC<DishComponentProps> = ({ dish }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleAddToCartClick = () => {
    setIsPopupOpen(true);
  };
   
  return (
    <DivParent>
      <h2>{dish.title}</h2>
      <img src={dish.imageUrl} width={250} height={250} alt={dish.title} ></img>
      <p>{dish.description}</p>
      <button onClick={handleAddToCartClick}>Add to Cart</button>
      {isPopupOpen && <AddToCartPopup dish={dish} onClose={() => setIsPopupOpen(false)} />}
    </DivParent>
  );
};

export default DishComponent;

const DivParent = styled.div`
  position: relative
  display: flex;
  justify-content: center;
`

