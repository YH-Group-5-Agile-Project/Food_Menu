import { MainDish } from "../Models/MainDish";
import React from "react";
import styled from "styled-components";
interface DetailedDishProps {
  dish: MainDish;
  onClose: () => void;
}

const DetailedDishComponent: React.FC<DetailedDishProps> = ({
  dish,
  onClose,
}) => {
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
    <Backdrop onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        <div>
          <DishTitle>{dish.title}</DishTitle>
          <DishDescription>
            <strong>Description: </strong>
            {dish.description}
          </DishDescription>
          <DishIngredients>
            <strong>Ingredients: </strong>
            {ingredients}.
          </DishIngredients>
          <CloseButton onClick={onClose}>Stäng</CloseButton>
          <AddButton>Lägg till</AddButton>
        </div>
      </Popup>
    </Backdrop>
  );
};

export default DetailedDishComponent;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  max-height: 1000px;
  margin: 20px;
  overflow-y: auto;
`;

const DishImage = styled.img`
  width: 80%;
  border-radius: 5px;
`;

const DishTitle = styled.h2`
  margin: 10px;
`;

const DishDescription = styled.p`
  margin: 10px 0;
  text-align: left;
`;

const DishIngredients = styled.div`
  text-align: left;
`;

const AddButton = styled.button`
  margin: 20px;
  padding: 10px 25px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const CloseButton = styled.button`
  margin: 20px;
  padding: 10px 25px;
  background-color: #af3d35;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  &:hover {
    background-color: #9b362f;
    transform: scale(1.05);
  }
`;
