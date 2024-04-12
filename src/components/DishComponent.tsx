import { useState } from "react";
import { Dish } from "../Models/Dish";
import styled, { css } from "styled-components";
import { AddToCartPopup } from "./AddToCartPopup";
import { Order } from "../Models/Order";
import { IncreamentId, SaveOrderToCart } from "../services/CartService";

interface DishComponentProps {
  key: number;
  dish: Dish;
  isSelected: boolean;
  onClick: () => void;
  isSideDish: boolean;
}

interface FoodProps {
  selected: boolean;
}

const SendToCart = (dish: Dish) => {
  const newOrder: Order = {
    id: IncreamentId(),
    sides: dish,
    OrderCost: dish.price,
  };
  SaveOrderToCart(newOrder);
};

const DishComponent = ({
  dish,
  isSelected,
  onClick,
  isSideDish,
}: DishComponentProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCartClick = () => {
    if (!isSideDish) setIsPopupOpen(true);
    else SendToCart(dish);
  };

  const ingredientsList = dish.ingredients.map((ingredient) => ingredient.name);
  let ingredients;
  if (ingredientsList.length > 1) {
    ingredients =
      ingredientsList.slice(0, -1).join(", ") +
      " and " +
      ingredientsList.slice(-1);
  } else {
    ingredients = ingredientsList[0] || "";
  }

  return (
    <DishContainer selected={isSelected} onClick={onClick}>
      <ImageContainer selected={isSelected}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        {!isSelected && <TitleOverlay>{dish.title}</TitleOverlay>}
      </ImageContainer>
      {/* {isSelected && 
      <ExpandedDish selected={isSelected}>
        <TextContainer selected={isSelected}>
          <DishTitle>{dish.title}</DishTitle>
          <DishDescription>
            <DishPrice>£{dish.price}</DishPrice>
            <strong>Description: </strong>
            {dish.description}
          </DishDescription>
          <DishIngredients>
            <strong>Ingredients: </strong>
            {ingredients}.
          </DishIngredients>
        </TextContainer>
        <StyledButton onClick={handleAddToCartClick}>Add to Cart</StyledButton>
      </ExpandedDish>
      } */}
      {isPopupOpen && (
        <AddToCartPopup dish={dish} onClose={() => setIsPopupOpen(false)} />
      )}
    </DishContainer>
  );
};

export default DishComponent;

const DishContainer = styled.div<FoodProps>`
  justify-content: center;
  cursor: pointer;
 
  margin-bottom: 20px;

  ${(props) =>
    props.selected &&
    `
    z-index: 1;
  `}

  @media (max-width: 949px) {
    width: calc(50% - 10px);
    margin-bottom: 20px;
    ${(props) =>
      props.selected &&
      `
      z-index: 1;
      `}
    }
    `;
    
const ExpandedDish = styled.div<FoodProps>`
  width: 100%;
  grid-column: 1 / -1;
`;
const ImageContainer = styled.div<FoodProps>`
  position: relative;
  width: 250px;
  height: 250px;
  transition: all 0.3s ease;
  
  @media (max-width: 609px) {
    width: 150px;
    height: 150px;
    ${(props) =>
      props.selected &&
      `
      width: 100px;
      height: 100px;
      `}
    }
    `;
    
    const DishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: 16px;

  @media (max-width: 609px) {
    font-size: 9px;
  }
`;


const DishDescription = styled.p`
margin: 10px 0;
text-align: left;
`;

const DishTitle = styled.h2`
margin: 10px;
`;

const TextContainer = styled.div<FoodProps>`

@media (max-width: 768px) {
  font-size: 2.5vw;
}
`;
const DishPrice = styled.h2``;


const DishIngredients = styled.div`
  text-align: left;
`;

const StyledButton = styled.button`
  margin: 20px;
`;
