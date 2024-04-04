import { useState } from "react";
import { Dish } from "../Models/Dish";

import styled, { css } from "styled-components";
import { AddToCartPopup } from "./AddToCartPopup";

interface DishComponentProps {
  key: number;
  dish: Dish;
  isSelected: boolean;
  onClick: () => void;
}

interface FoodProps {
  isSelected: boolean;
}

const DishComponent: React.FC<DishComponentProps> = ({
  dish,
  isSelected,
  onClick,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCartClick = () => {
    setIsPopupOpen(true);
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
    <DishContainer isSelected={isSelected} onClick={onClick}>
      <ImageContainer isSelected={isSelected}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        {!isSelected && <TitleOverlay>{dish.title}</TitleOverlay>}
      </ImageContainer>
      <ExpandedDish isSelected={isSelected}>
        <ImageContainer isSelected={isSelected}>
          <DishImage src={dish.imageUrl} alt={dish.title} />
        </ImageContainer>
        <TextContainer isSelected={isSelected}>
          <DishTitle>{dish.title}</DishTitle>
          <DishDescription>
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
      {isPopupOpen && (
        <AddToCartPopup dish={dish} onClose={() => setIsPopupOpen(false)} />
      )}
    </DishContainer>
  );
};

export default DishComponent;

const DishContainer = styled.div<FoodProps>`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: calc(33.33% - 20px);
  margin-bottom: 20px;

  ${(props) =>
    props.isSelected &&
    `
    z-index: 1;
  `}

  @media (max-width: 949px) {
    width: calc(50% - 10px);
    margin-bottom: 20px;
    ${(props) =>
      props.isSelected &&
      `
      z-index: 1;
  `}
  }
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
      props.isSelected &&
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

const DishIngredients = styled.div`
  text-align: left;
`;

const DishDescription = styled.p`
  margin: 10px 0;
  text-align: left;
`;

const DishTitle = styled.h2`
  margin: 10px;
`;

const ExpandedDish = styled.div<FoodProps>`
  position: absolute;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  min-width: 200px;
  max-width: 100vw;
  max-height: 0;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 20px;
  opacity: 0;
  word-wrap: break-word;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.isSelected &&
    css`
      opacity: 1;
      max-height: 1200px;
    `}

  @media (prefers-color-scheme: light) {
    color: #213547;
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
    padding: 0 5px 5px 5px;
    min-width: 150px;
    max-width: 100%;
  }
`;

const TextContainer = styled.div<FoodProps>`
  width: 100%;
  margin-bottom: 30px;
  overflow-wrap: break-word;
  overflow-y: auto;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const StyledButton = styled.button`
  margin: 20px;
`;
