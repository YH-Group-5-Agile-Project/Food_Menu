import { useState, useEffect } from "react";
import DishComponent from "./DishComponent";
import { MainDish } from "../Models/MainDish";
import styled from "styled-components";

export const MainDishComponent = () => {
  const [mainDish, setMainDish] = useState<MainDish[]>();
  const [selectedDish, setSelectedDish] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
      .then((res) => res.json())
      .then((data) => setMainDish(data));
  }, []);

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
