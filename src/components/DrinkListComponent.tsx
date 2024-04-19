import DrinkComponent from "./DrinkComponent";
import styled from "styled-components";

export const DrinkListComponent = () => {
  let drinkListIDs = [
    "12768", "12618", "15092", "12630", "12724", "12726", "11288", "178365", "11462", "11000",
    "11003", "12528",
  ];

  return (
    <DrinksContainer>
      {drinkListIDs
        .map((drinkId) => (
          <DrinkComponent key={drinkId} drinkId={drinkId} />
        ))}
    </DrinksContainer>
  );
};
const DrinksContainer = styled.div`
  width: 880px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  
  margin: auto;

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
