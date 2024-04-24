import styled from "styled-components";
import { DrinkQuery } from "../services/DbService";
import { Drink } from "../Models/Drink";

interface DrinkComponentProps {
  drinkId: string;
  sendToCart: (drink?: Drink) => void;
}

const DrinkComponentAlt = ({ drinkId, sendToCart }: DrinkComponentProps) => {
  const { data, isLoading, error } = DrinkQuery(drinkId);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DrinkContainer>
      <ImageContainer>
        <DrinkImage src={data?.imgUrl} alt={data?.name} />
        <TitleOverlay>{data?.name}</TitleOverlay> 
      </ImageContainer>
      <DrinkDescription>{data?.ingredients.join(", ")}. {data?.alcoholic ? "" : "Non-alcholic"}.</DrinkDescription>
      <button onClick={() => sendToCart(data)}> Add {data?.name} to menu</button>
    </DrinkContainer>
  );
};

const DrinkDescription = styled.div`
margin-top: 5px;
padding: 10px;
`
const DrinkContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 6rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 220px;
  height: 220px;

  @media (max-width: 849px) {
    width: 130px;
    height: 130px;
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

  @media (max-width: 949px) {
    font-size: 14px;
  }
`;

export default DrinkComponentAlt;
