import { useState, useEffect } from "react";
import DishComponent from "./DishComponent";
import { GetDishes, TanDishes } from "../services/DbService";
import styled from "styled-components";

interface dishInput {
  dishType: string;
}

export const DishListComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const mainDish = GetDishes(dishType);
  const [allDish, setAllDish] = useState<any[]>([]);
  const isSideDish = dishType.toLowerCase() === "sidedish" ? true : false;

  useEffect(() => {
    const fetchAllDishes = async () => {
      const dishes = await TanDishes();
      setAllDish(dishes);
    };
    fetchAllDishes();
  }, []);

  const HandleClick = (index: number) => {
    setSelectedDish(index === selectedDish ? null : index);
  };

  return (
    <DishesContainer>
      {mainDish?.map((dish, index) => (
        <DishComponent
          key={index}
          dish={dish}
          isSelected={index === selectedDish}
          onClick={() => HandleClick(index)}
          isSideDish={isSideDish}
        />
      ))}
      {allDish.map((dish: any, index: number) => (
        <h1 key={index}>{dish.title}</h1>
      ))}
    </DishesContainer>
  );
};

const DishesContainer = styled.div`
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
