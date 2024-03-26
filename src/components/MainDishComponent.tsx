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
    const mainDish = GetDishes(dishType)

  const HandleClick = (index : number) => {
    setSelectedDish(index === selectedDish ? null : index);
  }

  return (
      <DishesContainer isSelected={selectedDish !== null}>
        {mainDish?.map((dish, index) => 
          <DishComponent
            key={index}
            dish={dish}
            isSelected={index === selectedDish}
            onClick={() => HandleClick(index)}
          />
        )}
      </DishesContainer>
  );
};

const DishesContainer = styled.div<{isSelected : boolean}>`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100%;
  justify-content: center;
  ${(props) => props.isSelected && `
    margin-bottom: 400px;
  `}

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;
