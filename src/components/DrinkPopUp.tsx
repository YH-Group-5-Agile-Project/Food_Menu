import styled from "styled-components";
import { SendDrinkToCart } from "../services/CartService";

export type Drink = {
  id: string;
  name: string;
  alcoholic: boolean;
  imgUrl: string;
  ingredients: string[];
  price: number;
};

interface DrinkPopUpProps {
  drink: Drink;
  onClose: () => void;
}

const DrinkPopUp = ({ drink, onClose }: DrinkPopUpProps) => {

  const handleAddToCartClick = () => {
    SendDrinkToCart(drink);
    onClose();
  };

  return (
    <PopUpContainer>
      <PopUpContent onClick={(e) => e.stopPropagation()}>
        <h2>{drink.name}</h2>
        <img src={drink.imgUrl} alt={drink.name} style={{ width: "70%" }} />
        <p>Ingredients: {drink.ingredients.join(", ")}</p>
        <p>{drink.alcoholic ? "" : "Non-alcholic"}</p>
        <p>Price: {drink.price} SEK</p>
        <button onClick={handleAddToCartClick}>Add to Cart</button>
        <button onClick={onClose}>Close</button>
      </PopUpContent>
    </PopUpContainer>
  );
};

export default DrinkPopUp;

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
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 500px;
`;
