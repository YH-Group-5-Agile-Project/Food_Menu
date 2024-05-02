import { styled } from "styled-components"
import { Dish } from "../../Models/Dish"
import { Drink } from "../../Models/Drink"
import { DrinkRec } from "../../services/RecommendationService"
import { DrinkQueries, DrinkQuery } from "../../services/DbService"
import { useState, useEffect } from "react"
import { DrinkPickList } from "./DrinkPickList"
import { ItemAddedToCartPopup } from "../ItemAddedToCartPopup"
import { DRINK_IDS } from "../../constants/variables"

interface DrinkProps {
  dish: Dish
  dishes: Dish[]
  sendToCart: (drink?: Drink) => void
  showItemAdded: boolean
}

export const RecommendDrink = (props: DrinkProps) => {
  const { data: drinks, isLoading, error } = DrinkQueries(DRINK_IDS)
  const [recDrink, setRecDrink] = useState<Drink>()
  const [showDrinkList, setShowDrinkList] = useState(false)

  useEffect(() => {
    if (drinks) setRecDrink(DrinkRec(props.dishes, drinks))
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <DrinkRecommendationParent>
      {props.showItemAdded && (
        <Test>
          <ItemAddedToCartPopup />
        </Test>
      )}
      {!showDrinkList && (
        <>
          <h3>We recommend this drink to go with your food</h3>
          <HeaderDiv>
            <RecommendedDrinkName>{recDrink?.name}</RecommendedDrinkName>
            
          </HeaderDiv>
          <ImageContainer>
            <DrinkImage src={recDrink?.imgUrl} alt={"Loading"}></DrinkImage>
          </ImageContainer>
          <RecommendedDrinkPrice>{recDrink?.price} SEK</RecommendedDrinkPrice>
          <ButtonContainer>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart()
              }}>
              {window.outerWidth < 949 ? "No thanks" : "No, just the food for now"}
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart(recDrink)
              }}>
              {window.outerWidth < 949 ? "Yes please" : "Yes, looks delicious"}
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                setShowDrinkList(true)
              }}>
              {window.outerWidth < 949 ? "All drinks" : "I'd like to pick a different drink"}
            </Button>
          </ButtonContainer>
        </>
      )}
      {showDrinkList && <DrinkPickList dish={props.dish} sendToCart={props.sendToCart} showItemAdded={props.showItemAdded} />}
    </DrinkRecommendationParent>
  )
}

const RecommendedDrinkName = styled.h1`
  font-size: 3rem;
  @media (max-width: 949px) {
    font-size: 2.8rem;

  }
`
const RecommendedDrinkPrice = styled.h2`

  font-size: 2rem;
  @media (max-width: 949px) {
    font-size: 1.4rem;

  }
`

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
  max-height: 48rem;
  overflow-y: scroll;
  @media (max-width: 949px) {
    max-height: 42rem;

  }
`

const DrinkImage = styled.img`
  width: 50%;
  border-radius: 20px;
  @media (max-width: 949px) {
    width: 70%;

  }
`

const Button = styled.button`
  margin: 20px;

  border: solid 2px var(--firstColor);
`
