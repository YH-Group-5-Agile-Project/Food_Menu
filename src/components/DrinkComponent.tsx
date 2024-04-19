import { useState } from "react";
import styled from "styled-components";
import DrinkPopUp from "./DrinkPopUp";
import { DrinkQuery } from "../services/DbService";


interface DrinkComponentProps {
  drinkId: string;
}

const DrinkComponent = ( {drinkId}: DrinkComponentProps) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const togglePopUp = () => setPopUpOpen(!isPopUpOpen);
  const { data, isLoading, error } = DrinkQuery(drinkId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let drink = data;
  return (
    <DrinkContainer onClick={togglePopUp}>
      <ImageContainer>
        <DrinkImage src={data.imgUrl} alt={data.name} />
        <TitleOverlay>{data.name}</TitleOverlay>
      </ImageContainer>
      {isPopUpOpen && <DrinkPopUp drink={drink} onClose={togglePopUp} />}
    </DrinkContainer>
  );
};

const DrinkContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;

  @media (max-width: 549px) {
    width: 150px;
    height: 150px;
  }
`;

const DrinkImage = styled.img`
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
  font-size: 16px;

  @media (max-width: 549px) {
    font-size: 9px;
  }
`;

export default DrinkComponent;
