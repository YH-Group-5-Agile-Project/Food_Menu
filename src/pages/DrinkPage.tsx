import { GetDrink } from "../services/DbService";
import DrinkComponent from "../components/DrinkComponent";
import { styled } from "styled-components";

const DrinkPage = () => {
  let drinkListIDs = [
    "12768",
    "12618",
    "15092",
    "12630",
    "12724",
    "12726",
    "11288",
    "178365",
    "11462",
    "11000",
    "11003",
    "12528",
  ];

  let drinkList = drinkListIDs.map((drinkId) => {
    return GetDrink(drinkId);
  });

  return (
    <DrinksContainer>
      {drinkList
        .filter((drink) => drink !== null)
        .map((drink) => (
          <DrinkComponent key={drink.id} drink={drink} />
        ))}
    </DrinksContainer>
  );
};

export default DrinkPage;

const DrinksContainer = styled.div`
  width: 900px;
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
