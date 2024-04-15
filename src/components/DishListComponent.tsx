import DishComponent from "./DishComponent";
import styled from "styled-components";
import { useState } from "react";
import { Dish } from "../Models/Dish";
import { PostQuery } from "../services/DbService";
interface dishInput {
  dishType: string;
}
export const DishListComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const isSideDish = dishType === "sideDish" ? true : false;
  const HandleClick = (index: number) => {
    setSelectedDish(index === selectedDish ? null : index);
  };
  const { data, isLoading, error } = PostQuery(dishType);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DishesContainer>
      {data?.map((dish: Dish, index: number) => (
        <DishComponent
          key={index}
          dish={dish}
          isSelected={index === selectedDish}
          onClick={() => HandleClick(index)}
          isSideDish={isSideDish}
        />
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
