import { useState } from "react";
import DishComponent from "./DishComponent";
import { GetDishes } from "../services/DbService";
// import { MainDish } from "../Models/MainDish";
import styled from "styled-components";

interface dishInput {
  dishType: string;
}

export const MainDishComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const mainDish = GetDishes(dishType);

  const HandleClick = (index: number) => {
    setSelectedDish(index === selectedDish ? null : index);
  };

  return (
    <DishesContainer isSelected={selectedDish !== null}>
      {mainDish?.map((dish, index) => (
        <DishComponent
          key={index}
          dish={dish}
          isSelected={index === selectedDish}
          onClick={() => HandleClick(index)}
        />
      ))}
    </DishesContainer>
  );
};

const DishesContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 880px;
  justify-content: center;

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
