import { MainDish } from "../Models/MainDish";
//import React, { useState } from "react";
import styled from "styled-components";

interface DishComponentProps {
  dish: MainDish;
}

const DishComponent: React.FC<DishComponentProps> = ({ dish }) => {
  return (
    <DishContainer>
      <ImageContainer>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        <TitleOverlay>{dish.title}</TitleOverlay>
      </ImageContainer>
    </DishContainer>
  );
};

export default DishComponent;

const DishContainer = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

const DishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
