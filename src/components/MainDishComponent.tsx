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
      <DishesContainer>
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

const DishesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;
