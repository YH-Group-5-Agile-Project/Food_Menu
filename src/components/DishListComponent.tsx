import { useState } from "react";
import DishComponent from "./DishComponent";
import { GetDishes } from "../services/DbService";
// import { MainDish } from "../Models/MainDish";
import styled, { keyframes } from "styled-components";
import React from "react";
import { Dish } from "../Models/Dish";

interface dishInput {
  dishType: string;
}

interface FoodProps {
  selected: boolean;
}
const transitionTime = 500;
let timeOutBool = false;

export const DishListComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const dishes = GetDishes(dishType);
  const isSideDish = dishType.toLowerCase() === "sidedish" ? true : false;

  const HandleClick = (index: number) => {
    if(index === selectedDish) {
      timeOutBool = false;
      setTimeout(() => {
        setSelectedDish(null);
      }, transitionTime);
    }
    else {
      timeOutBool = true;
      setSelectedDish(index);
    }
  };
  
  const getIngredients = (dish: Dish) => {
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
    return ingredients
  }

  return (
    <DishesContainer>
      {dishes?.map((dish, index) => (
        <>
          <DishComponent
          key={index}
          dish={dish}
          isSelected={index === selectedDish}
          onClick={() => HandleClick(index)}
          isSideDish={isSideDish}
          />

            {index === selectedDish &&
              <ExpandedDish selected = {timeOutBool}>
                <TextContainer>
                  <DishTitle>{dish.title}</DishTitle>
                  <DishDescription>
                    <DishPrice>£{dish.price}</DishPrice>
                    <strong>Description: </strong>
                    {dish.description}
                  </DishDescription>
                  <DishIngredients>
                    <strong>Ingredients: </strong>
                    {getIngredients(dish)}.
                  </DishIngredients>
                </TextContainer>
                <StyledButton >Add</StyledButton>
              </ExpandedDish>
            }
          </>
        ))}
    </DishesContainer>
  );
};



const ExpandAnimation = keyframes`
  0% {
    max-height: 0;
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  100% {
    max-height: 300px;
    opacity: 1;
  }
`
const CloseAnimation = keyframes`
  0% {
    max-height: 300px;
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  100% {
    max-height: 0px;
    opacity: 0;
  }
`

const ExpandedDish = styled.div<FoodProps>`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: auto;
  max-height: ${(prop) => (prop.selected ? '300px' : '0')};
  transition: max-height ${transitionTime}ms;
`
/* animation-name: ${(prop) => (prop.selected ? ExpandAnimation : CloseAnimation)};
  animation-duration: ${transitionTime / 1000}s; */
const DishesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  width: 880px;

  @media (max-width: 949px) {
    width: 560px;
    gap: 20px;
    margin: auto;
  }

  @media (max-width: 549px) {
    width: 360px;
    gap: 10px;
    margin: auto;
  }
`;

const DishDescription = styled.p`
  margin: 10px 0;
  text-align: left;
`;

const DishTitle = styled.h2`
  margin: 10px;
`;

const TextContainer = styled.div`

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

const MiddleDiv = styled.div<FoodProps>`
  
`
{/*  */}
          {/* <button onClick={handleAddToCartClick}>Add to Cart</button> */}
/* 
          {!MiddleDivRendered &&
            <MiddleDiv selected={selectedDish !== null}>
            </MiddleDiv>
            }
            {MiddleDivRendered = true} */
