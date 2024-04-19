import { styled } from "styled-components";
import { Dish } from "../Models/Dish";
import { Drink } from "../Models/Drink";
import { DrinkRecommendation } from "../services/RecommendationService";
import { DrinkQuery } from "../services/DbService";

interface DrinkProps {
    dish: Dish;
    sendToCart: (drink?: Drink) => void;
    showItemAdded: boolean
}
export const RecommendDrink = (props: DrinkProps) => {
    let drinkId = DrinkRecommendation(props.dish._id);
    const {data, isLoading, error} = DrinkQuery(drinkId)
    let recommendedDrink = data;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <DrinkRecommendationParent>
            <p>We recommend this drink to go with your food</p>
            <h2>{recommendedDrink?.name}</h2>
            <ImageContainer>
                <DrinkImage src={recommendedDrink?.imgUrl} alt={'Loading'}></DrinkImage>
            </ImageContainer>
            <ButtonContainer>
              <Button disabled={props.showItemAdded} onClick={() => {props.sendToCart(recommendedDrink)}}>Yes, look delicious</Button>
              <Button disabled={props.showItemAdded} onClick={() => {props.sendToCart()}}>No thank you</Button>
            </ButtonContainer>
          </DrinkRecommendationParent>
    )

}

const ButtonContainer = styled.div`

`

const ImageContainer = styled.div`
    margin-bottom: 20px;
`

const DrinkRecommendationParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DrinkImage = styled.img`
  width: 50%;
  border-radius: 20px;
`;

const Button = styled.button`
    margin: 20px;
  border: solid 2px black;
  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;