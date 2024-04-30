import { styled } from "styled-components"
import { Dish } from "../../Models/Dish"
import { Drink } from "../../Models/Drink"
import { DrinkRecommendation } from "../../services/RecommendationService"
import { DrinkQuery } from "../../services/DbService"
import { useState, useEffect } from "react"
import { DrinkPickList } from "./DrinkPickList"
import { ItemAddedToCartPopup } from "../ItemAddedToCartPopup"

interface DrinkProps {
  dish: Dish
  sendToCart: (drink?: Drink) => void
  showItemAdded: boolean
}

export const RecommendDrink = (props: DrinkProps) => {
  const [drinkId, setDrinkId] = useState<string | null>(null)
  useEffect(() => {
    if (!drinkId) {
      setDrinkId(DrinkRecommendation(props.dish._id))
    }
  })

  const { data, isLoading, error } = DrinkQuery(drinkId) //Röd squiggly men funkar, någon får försöka sig på en fix om ni känner för det
  const [drinkList, setDrinkList] = useState(false)
  let recommendedDrink = data


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <DrinkRecommendationParent>
      {props.showItemAdded && <Test><ItemAddedToCartPopup Item="Menu " /></Test>}
      {!drinkList && (
        <>
          <h3>We recommend this drink to go with your food</h3>
          <HeaderDiv>
            <h2>{recommendedDrink?.name}</h2>
            <h1>{recommendedDrink?.price} SEK</h1>
          </HeaderDiv>
          <ImageContainer>
            <DrinkImage src={recommendedDrink?.imgUrl} alt={"Loading"}></DrinkImage>
          </ImageContainer>
          <ButtonContainer>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart(recommendedDrink)
              }}>
              Yes, look delicious
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                setDrinkList(true)
              }}>
              I'd like to pick a different drink
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart()
              }}>
              No, just the food for now
            </Button>
          </ButtonContainer>
        </>
      )}
      {drinkList && (
        <DrinkPickList dish={props.dish} sendToCart={props.sendToCart} showItemAdded={props.showItemAdded}/>
      )}
    </DrinkRecommendationParent>
  )
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  width: 40vw;
  max-width: 500px;
  min-width: 350px;
  justify-content: space-evenly;
`

const Test = styled.div`
position: sticky;
top: 0;
left: 50%;
z-index: 7;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

const ImageContainer = styled.div`
  margin-bottom: 20px;
`

const DrinkRecommendationParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 45rem;
  overflow-y: scroll;
`

const DrinkImage = styled.img`
  width: 50%;
  border-radius: 20px;z
`

const Button = styled.button`
  margin: 20px;

  border: solid 2px var(--firstColor);
`
