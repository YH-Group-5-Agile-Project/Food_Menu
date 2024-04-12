import DishComponent from "./DishComponent";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function DishList(dishType: string) {

  const postQuery = useQuery({
    queryKey: [{dishType}],
    queryFn: async () => {
      const response = await axios.get(`https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`);
      const data = await response.data;
      return data;
    }, 
    staleTime: 300000,
  })
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const isSideDish = false;
  const HandleClick = (index: number) => {
    setSelectedDish(index === selectedDish ? null : index);
  };
  if( postQuery.isLoading ) return ( <h1>Loading....</h1>)
  if( postQuery.isError ) return (<h1>Error loading data!!!</h1>)

  return (
    <DishesContainer>
      {postQuery.data?.map((dish, index) => (
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
