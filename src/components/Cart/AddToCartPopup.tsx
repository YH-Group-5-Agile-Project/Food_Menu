import styled from "styled-components"
import { Dish } from "../../Models/Dish"
import { PostQuery } from "../../services/DbService"
import { Order } from "../../Models/Order"
import { CalculateCostOrder, IncreamentId, SaveOrderToCart } from "../../services/CartService"
import { Drink } from "../../Models/Drink"
import { useEffect, useState } from "react"
import { RecommendDrink } from "../Drink/RecommendDrinkComponent"
import DecorationLineImage from "../../assets/design-assets/DecorationLine.png"
import Texture from "../../assets/design-assets/climpek.png"
import { ItemAddedToCartPopup } from ".././ItemAddedToCartPopup"
import { SideRecommendation } from "../../services/RecommendationService"
import { ShortName } from "../../services/ShortNameService"

let tempDish: Dish
let tempSide: Dish | undefined

interface AddToCartPopupProps {
  dish: Dish
  onClose: () => void
}

export function AddToCartPopup({ dish, onClose }: AddToCartPopupProps) {
  const [sideOrDrink, setSideOrDrink] = useState<boolean>(false)
  const { data, isLoading, error } = PostQuery("sideDish")
  const [showItemAdded, setShowItemAdded] = useState(false)
  const [recSideDish, setRecSideDish] = useState<Dish>(tempDish)
  const [restSideDishes, setRestSideDishes] = useState<Dish[]>([])
  const [dishes, setDishes] = useState<Dish[]>([])

  // Find recommended side dish
  useEffect(() => {
    let i = 0
    let recommendedSideId = SideRecommendation(dish._id)
    //- funkar ej med let i = 0 -> undefined reading data.legnth -> Därför index
    for (let index in data) {
      i = parseInt(index)
      if (data[i]._id === recommendedSideId) {
        // find i
        // Set recommended side
        setRecSideDish(data?.slice(i, i + 1)[0]) //  Recommended Side
        setRestSideDishes([...data.slice(0, i), ...data.slice(i + 1)]) // Rest of sides
      }
    }
  }, [data]) // wait until data is loaded

  const loadRecommendedDrink = (dish: Dish, sideDish?: Dish) => {
    tempDish = { ...dish }
    tempSide = sideDish ? { ...sideDish } : undefined
    setDishes(tempSide ? [tempDish, tempSide] : [tempDish])
    setSideOrDrink(true)
  }

  const sendToCart = (_drink?: Drink) => {
    if (tempSide != null) tempSide.price = 0
    let newOrder: Order = {
      id: IncreamentId(),
      main: tempDish,
      sides: tempSide,
      drink: _drink,
      OrderCost: 0,
    }

    setShowItemAdded(true)
    setTimeout(() => {
      onClose()
      setShowItemAdded(false)
    }, 1000)
    newOrder.OrderCost = CalculateCostOrder(newOrder)
    SaveOrderToCart(newOrder)
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <a onClick={onClose}>
        <Overlay />
      </a>
      <PopupContainer className="add-to-cart-popup">
        {showItemAdded && <ItemAddedToCartPopup />}
        <SelectedDishHeader>{dish.title}</SelectedDishHeader>
        <BreakLine src={DecorationLineImage} />
        {!sideOrDrink ? (
          <>
            <TitleBox>Select your complimentary side</TitleBox>
            <ItemContainer>
              {/* Show recommended side dish */}
              {recSideDish && (
                <>
                  <SideContainer
                    key={recSideDish._id}
                    onClick={() => {
                      loadRecommendedDrink(dish, recSideDish)
                    }}>
                    <RecommendedChoice>{window.outerWidth < 949 ? "Recommended" : "Recommended choice"}</RecommendedChoice>
                    <InnerContainer>
                      <DishImage src={recSideDish.imageUrl} alt="" />
                      <DishTitle>{window.outerWidth < 949 ? ShortName(recSideDish._id) : recSideDish.title}</DishTitle>
                    </InnerContainer>
                  </SideContainer>
                </>
              )}
              {/* Show rest of the side dishes */}
              {restSideDishes.map((sideDish: Dish) => (
                <SideContainer
                  key={sideDish._id}
                  onClick={() => {
                    loadRecommendedDrink(dish, sideDish)
                  }}>
                  <InnerContainer>
                    <DishImage src={sideDish.imageUrl} alt="" />
                    <DishTitle>{window.outerWidth < 949 ? ShortName(sideDish._id) : sideDish.title}</DishTitle>
                  </InnerContainer>
                </SideContainer>
              ))}
            </ItemContainer>
            <NoSideButton
              onClick={() => {
                loadRecommendedDrink(dish)
              }}>
              I don't want a side
            </NoSideButton>
            <Button onClick={onClose}>Cancel</Button>
          </>
        ) : (
          <RecommendDrink showItemAdded={showItemAdded} dish={tempDish} dishes={dishes} sendToCart={sendToCart}></RecommendDrink>
        )}
      </PopupContainer>
    </>
  )
}
const SelectedDishHeader = styled.h3`
  font-size: 2rem;

  @media (max-width: 949px) {
    font-size: 0.8rem;
  }
`
const TitleBox = styled.h2`
  width: 100%;
`
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`
const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  overflow-y: scroll;
  @media (max-width: 949px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    max-height: 80rem;
    overflow-y: scroll;
  }
`
const BreakLine = styled.img`
  width: 95%;
  object-fit: cover;
  height: 55px;
`
const Button = styled.button`
  margin-top: 10px;
  justify-self: center;
`
const NoSideButton = styled.button`
  border-radius: 10px;
  font-size: 0.8em;
  font-family: inherit;
  padding: 0.4em 0.8em;
`
const SideContainer = styled.button`
  position: relative;
  margin: 10px;
  margin-top: 20px;
  border-radius: 20px;
  // margin-left: 1rem;
  // margin-right: 1rem;
  // margin-bottom: 4px;
  padding: 6px;
  align-items: center;
  transition:
    color 0.3s,
    border-color 0.3s;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--fifthColor);
  @media (max-width: 949px) {
  }
`
const DishImage = styled.img`
  width: 50%;
  border-radius: 20px;
  margin-right: 10px;
`
const DishTitle = styled.div`
  width: 50%;
  font-size: 1rem;

  @media (max-width: 949px) {
    font-size: 1.6rem;
    font-weight: 700;
  }
`
const RecommendedChoice = styled.div`
  position: absolute;
  width: 60%;
  margin-bottom: 1rem;
  border: 1px solid var(--fourthColor);
  border-radius: 10px;
  padding: 5px;
  color: var(--sixthColor);
  background-color: var(--secondColor);
  top: -20px;
  z-index: 1;
  @media (max-width: 949px) {
    font-size: 0.7rem;
  }
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 70%;
`
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  min-height: 600px;
  max-width: 800px;
  width: 65%;
  z-index: 3;
  background-color: var(--firstColor);
  background-image: url(${Texture});
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  @media (max-width: 949px) {
    width: 80%;
    top: 48%;
    max-height: 45rem;
  }
  @media (max-width: 609px) {
    width: 95%;
  }
`
