import { useEffect, useRef, useState } from "react"
import DrinkComponent from "./DrinkComponent"
import styled, { keyframes } from "styled-components"
import { DrinkQueries } from "../../services/DbService"
import { Drink } from "../../Models/Drink"
import { SendDrinkToCart } from "../../services/CartService"
import { ItemAddedToCartPopup } from ".././ItemAddedToCartPopup"

const transitionTime = 800

interface FoodProps {
  selected: boolean
  isOpen: boolean
}

interface Spacer {
  spacer: boolean
}

export const DrinkListComponent = () => {
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
  ]

  const [drinkList, setDrinkList] = useState<Drink[]>([])
  const [showItemAdded, setShowItemAdded] = useState(false)
  const [spacerDivOn, setSpacerDivOn] = useState(false)

  const setSpacerWithTimeOut = () => {
    if (isOpenInfo) setTimeout(() => {
      setSpacerDivOn(!spacerDivOn)
    }, 800)
    else setSpacerDivOn(!spacerDivOn)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await DrinkQueries(drinkListIDs)
      setDrinkList(data)
    }
    fetchData()
  }, [])

  const ExpandedRef = useRef<HTMLDivElement>(null)

  const [selectedDrink, setSelectedDrink] = useState<number | null>(null)
  const [selectedInfo, setSelectedInfo] = useState<boolean>(false)
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false)

  const HandleClick = (index: number) => {
    setSpacerWithTimeOut()
    if (index === selectedDrink) {
      setIsOpenInfo(false)
      setSelectedInfo(false)
    } else if ((selectedDrink || selectedDrink === 0) && index !== selectedDrink) {
      setIsOpenInfo(true)
      setSelectedInfo(false)
      setSelectedDrink(index)
    } else {
      setIsOpenInfo(true)
      setSelectedInfo(true)
      setSelectedDrink(index)
    }
  }

  const handleAddToCartClick = (drink: Drink) => {
    SendDrinkToCart(drink)
    setShowItemAdded(true)
    setTimeout(() => {
      setShowItemAdded(false)
      setIsOpenInfo(false)
      setSelectedInfo(false)
    }, 1000)
  }

  return (
    <DrinksContainer>
      {drinkList.map((drink, index) => {
        return drink ? (
          <>
            <DrinkComponent
              isOpen={!isOpenInfo || !selectedInfo}
              key={drink.id}
              drink={drink}
              expandDrink={() => HandleClick(index)}
            />

            {index === selectedDrink && (
              <ExpandedDrink
                ref={ExpandedRef}
                isOpen={isOpenInfo}
                selected={selectedInfo}
                onAnimationEnd={() => {
                  if (!isOpenInfo) {
                    setSelectedDrink(null)
                  }
                }}>
                <TextContainer>
                  <DrinkTitle>{drink.name}</DrinkTitle>
                  <DrinkDescription>
                    <p>{drink.alcoholic ? <strong>Alcholic</strong> : <strong>Non-alcholic.</strong>}</p>
                  </DrinkDescription>
                  <DrinkIngredients>
                    <strong>Ingredients: </strong>
                    {drink.ingredients.join(", ")}.
                  </DrinkIngredients>
                  <PriceButtonContainer>
                    <DrinkPrice>{drink.price} SEK</DrinkPrice>
                    <StyledButton disabled={showItemAdded} onClick={() => handleAddToCartClick(drink)}>Add to order</StyledButton>
                  </PriceButtonContainer>
                </TextContainer>
                {showItemAdded && <ItemAddedToCartPopup Item={drink.name} />}
              </ExpandedDrink>
            )}
          </>
        ) : (
          <></>
        )
      })}
      <SpacerDiv spacer={spacerDivOn}></SpacerDiv>
    </DrinksContainer>
  )
}



const SpacerDiv = styled.div<Spacer>`
  height: 400px;
  display: ${(props) => (props.spacer ? "block" : "none")};
`


const ExpandAnimation = keyframes`
  0% {
    max-height: 0;
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  100% {
    max-height: 280px;
    opacity: 1;
  }
`

const CloseAnimation = keyframes`
  0% {
    max-height: 280px;
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  100% {
    max-height: 0px;
    opacity: 0;
  }
`

const StayOpenAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ExpandedDrink = styled.div<FoodProps>`
  max-height: ${(props) => (props.isOpen ? "280px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  height: 280px;
  width: 700px;
  grid-column: 1 / -1;
  grid-row: auto;
  animation-name: ${(props) =>
    props.selected && props.isOpen
      ? ExpandAnimation
      : !props.selected && props.isOpen
        ? StayOpenAnimation
        : CloseAnimation};
  animation-duration: ${transitionTime}ms;
  display: flex;
  align-items: start;
  justify-content: center;

  @media (max-width: 949px) {
    width: 400px;
  }

  @media (max-width: 549px) {
    width: 360px;
  }
`

const DrinksContainer = styled.div`
  width: 900px;
  column-gap: 32px;
  justify-content: center;
  position: relative;
  place-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-flow: dense;
  overflow: hidden;

  @media (max-width: 949px) {
    width: 500px;
    column-gap: 23px;
    grid-template-columns: repeat(auto-fill, 150px);
  }

  @media (max-width: 549px) {
    width: 360px;
  }
`

const DrinkDescription = styled.p`
  margin: 10px 0;
  text-align: left;
`

const DrinkTitle = styled.h2`
  margin: 10px;
`

const TextContainer = styled.div`
  width: 90%;
  @media (max-width: 949px) {
    font-size: 16px;
  }

  @media (max-width: 549px) {
    font-size: 14px;
  }
`

  const DrinkIngredients = styled.div`
  text-align: left;
`

const PriceButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DrinkPrice = styled.h2`
text-align: left;
flex: 1 1 auto;
`

const StyledButton = styled.button`
  text-align: right;
  flex: 0 1 auto;
`
