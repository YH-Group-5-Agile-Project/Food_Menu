import { useState } from "react";
import { MainDish } from "../Models/MainDish";

import styled, { css, keyframes } from "styled-components";
import { AddToCartPopup } from "./AddToCartPopup";

interface DishComponentProps {
  key: number;
  dish: MainDish;
  isSelected: boolean;
  onClick: () => void;
}

interface FoodProps {
  isSelected: boolean;
}

const DishComponent: React.FC<DishComponentProps> = ({
  dish,
  isSelected,
  onClick,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsPopupOpen(true);
  };

  return (
    <DishContainer isSelected={isSelected} onClick={onClick}>
      <ImageContainer isSelected={isSelected}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        {!isSelected && <TitleOverlay>{dish.title}</TitleOverlay>}
      </ImageContainer>
      <ExpandedDish isSelected={isSelected}>
        <ImageContainer isSelected={isSelected}>
          <DishImage src={dish.imageUrl} alt={dish.title} />
        </ImageContainer>
        <TextContainer isSelected={isSelected}>
          <h3>{dish.title}</h3>
          <p>{dish.description}</p>
        </TextContainer>
        <button onClick={handleAddToCartClick}>Add to Cart</button>
      </ExpandedDish>
      {isPopupOpen && (
        <AddToCartPopup dish={dish} onClose={() => setIsPopupOpen(false)} />
      )}
    </DishContainer>
  );
};

export default DishComponent;

const DishContainer = styled.div<FoodProps>`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: calc(33.33% - 20px);
  margin-bottom: 20px;

  ${(props) =>
    props.isSelected &&
    `
    z-index: 1;
  `}

  @media (max-width: 768px) {
    width: calc(50% - 10px);
    margin-bottom: 20px;
    ${(props) =>
      props.isSelected &&
      `
      z-index: 1;
  `}
  }
`;

const ImageContainer = styled.div<FoodProps>`
  position: relative;
  width: 250px;
  height: 250px;
  ${(props) =>
    props.isSelected &&
    `
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 20px;
  `}
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    ${(props) =>
      props.isSelected &&
      `
    width: 100px;
    height: 100px;
  `}
  }
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
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: calc(2.5vw + 2.5vh + 0.5vmin);

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const ExpandedDish = styled.div<FoodProps>`
  position: absolute;
  background-color: #242424;
  text-align: left;
  left: 0px;
  min-width: 200px;
  max-width: 100vw;
  max-height: 0;
  overflow: hidden;
  padding: 20px;
  z-index: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 20px;
  opacity: 0;
  word-wrap: break-word;

  ${(props) =>
    props.isSelected &&
    css`
      opacity: 1;
      max-height: 600px;
      transition: all 0.8s ease-in-out;
    `}

  @media (max-width: 768px) {
    font-size: 2.5vw;
    min-width: 100px;
    max-width: 100px;
  }
`;

const TextContainer = styled.div<FoodProps>`
  width: 100%;
  margin-top: 200px;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 2.5vw;
    margin-top: 100px;
  }
`;
