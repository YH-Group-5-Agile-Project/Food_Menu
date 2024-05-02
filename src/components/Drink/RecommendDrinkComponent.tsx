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
            <h2>{recDrink?.name}</h2>
            <h1>{recDrink?.price} SEK</h1>
          </HeaderDiv>
          <ImageContainer>
            <DrinkImage src={recDrink?.imgUrl} alt={"Loading"}></DrinkImage>
          </ImageContainer>
          <ButtonContainer>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart()
              }}>
              {window.outerWidth < 800 ? "No thanks" : "No, just the food for now"}
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                props.sendToCart(recDrink)
              }}>
              {window.outerWidth < 800 ? "Yes please" : "Yes, looks delicious"}
            </Button>
            <Button
              disabled={props.showItemAdded}
              onClick={() => {
                setShowDrinkList(true)
              }}>
              {window.outerWidth < 800 ? "All drinks" : "I'd like to pick a different drink"}
            </Button>
          </ButtonContainer>
        </>
      )}
      {showDrinkList && <DrinkPickList dish={props.dish} sendToCart={props.sendToCart} showItemAdded={props.showItemAdded} />}
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
  border-radius: 20px;
`

const Button = styled.button`
  margin: 20px;

  border: solid 2px var(--firstColor);
`
