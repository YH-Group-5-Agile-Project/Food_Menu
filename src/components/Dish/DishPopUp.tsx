/* import styled from "styled-components";
// import { SendDishToCart } from "../services/CartService";
import { useState } from "react";
import { ItemAddedToCartPopup } from "./ItemAddedToCartPopup";

export type Dish = {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  ingredients: { name: string }[];
  price: number;
  timeInMins: number;
};

interface DishPopUpProps {
  dish: Dish;
  onClose: () => void;
}

const DishPopUp = ({ dish, onClose }: DishPopUpProps) => {
  const [showItemAdded, setShowItemAdded] = useState(false);

  const handleAddToCartClick = () => {
    // SendDishToCart(dish);
    setShowItemAdded(true);
    setTimeout(() => {
      setShowItemAdded(false);
      onClose(); // Stäng popupen efter att objektet lagts till i kundvagnen
    }, 2000);
  };

  return (
    <PopUpContainer>
      <PopUpContent onClick={(e) => e.stopPropagation()}>
        <h2>{dish.title}</h2>
        <img src={dish.imgUrl} alt={dish.title} style={{ width: "70%" }} />
        <p>{dish.description}</p>
        <p>
          Ingredients:{" "}
          {dish.ingredients.map((ingredient) => ingredient.name).join(", ")}
        </p>
        <p>Time to prepare: {dish.timeInMins} mins</p>
        <p>Price: {dish.price} SEK</p>
        <button disabled={showItemAdded} onClick={handleAddToCartClick}>
          Add to Cart
        </button>
        <button onClick={onClose}>Close</button>
      </PopUpContent>
      {showItemAdded && <ItemAddedToCartPopup Item={dish.title} />}
    </PopUpContainer>
  );
};

export default DishPopUp;

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const PopUpContent = styled.div`
  background-image: url("../assets/design-assets/climpek.png");
  background-color: var(--firstColor);
  color: var(--sixthColor);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 500px;
`;
 */
