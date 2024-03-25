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
  return (
    <Backdrop onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        <InfoContainer>
          <DishTitle>{dish.title}</DishTitle>
          <DishDescription>{dish.description}</DishDescription>
          <AddButton>Lägg till</AddButton>
        </InfoContainer>
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
  overflow-y: auto;
`;

const DishImage = styled.img`
  width: 80%;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  margin-top: 20px;
`;

const DishTitle = styled.h2`
  margin: 0;
`;

const DishDescription = styled.p`
  margin: 10px 0;
`;

const AddButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
