import { useState, useEffect } from "react";
import DishComponent from "./DishComponent";
import DetailedDishComponent from "./DetailedDishComponent";
import { MainDish } from "../Models/MainDish";
import styled from "styled-components";

export const MainDishComponent = () => {
  const [mainDish, setMainDish] = useState<MainDish[]>();
  const [selectedDish, setSelectedDish] = useState<MainDish | null>(null);

  useEffect(() => {
    fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
      .then((res) => res.json())
      .then((data) => setMainDish(data));
  }, []);

  return (
    <>
      <DishesContainer>
        {mainDish?.map((dish, index) => (
          // <div key={dish.title} onClick={() => setSelectedDish(dish)}>
          <DishComponent
            key={index}
            dish={dish}
            onClick={() => setSelectedDish(dish)}
          />
          // </div>
        ))}
      </DishesContainer>
      {selectedDish && (
        <div>
          <DetailedDishComponent
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        </div>
      )}
    </>
  );
};

/*
export const MainDishComponent = () => {
  const [mainDish, setMainDish] = useState<MainDish[]>();

  useEffect(() => {
    fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMainDish(data);
      });
  }, []);

  return (
    <DishesContainer>
      {mainDish?.map((dish) => (
        <DishComponent dish={dish} />
      ))}
    </DishesContainer>
  );
};
*/

const DishesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;
