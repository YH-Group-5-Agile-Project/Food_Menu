import styled from "styled-components";
import { Dish } from "../Models/Dish";
import { PostQuery } from "../services/DbService";
import { Order } from "../Models/Order";
import {
  CalculateCostOrder,
  IncreamentId,
  SaveOrderToCart,
} from "../services/CartService";
import { Drink } from "../Models/Drink";
import { useState } from "react";
import { RecommendDrink } from "./RecommendDrinkComponent";
import DecorationLineImage from '../assets/design-assets/DecorationLine.png';
import Texture from '../assets/design-assets/climpek.png'
import { ItemAddedToCartPopup } from "./ItemAddedToCartPopup";

let tempDish: Dish;
let tempSide: Dish;

interface AddToCartPopupProps {
  dish: Dish;
  onClose: () => void;
}

export function AddToCartPopup({ dish, onClose }: AddToCartPopupProps) {
  const [sideOrDrink, setSideOrDrink] = useState<boolean>(false);
  const { data, isLoading, error } = PostQuery("sideDish");
  const [showItemAdded, setShowItemAdded] = useState(false);
  
  const loadRecommendedDrink = (dish: Dish, sideDish: Dish) => {
    tempDish = dish;
    tempSide = sideDish;
    setSideOrDrink(true);
  }

  const sendToCart = (_drink?: Drink) => {
    tempDish.price = 0;
    let newOrder: Order = {
      id: IncreamentId(),
      main: tempDish,
      sides: tempSide,
      drink: _drink,
      OrderCost: 0,
    };
    setShowItemAdded(true)
      setTimeout(() => {
        location.reload();
        setShowItemAdded(false);
      }, 2000);
    newOrder.OrderCost = CalculateCostOrder(newOrder);
    SaveOrderToCart(newOrder);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <a onClick={onClose}>
        <Overlay />
      </a>
      <PopupContainer className="add-to-cart-popup">
      {showItemAdded && (
        <ItemAddedToCartPopup Item="Menu "/>
      )}
        <h3>{dish.title}</h3>
        <BreakLine src={DecorationLineImage} />
          {!sideOrDrink ? 
            <>
              <TitleBox>Select your complimentary side</TitleBox>
              <ItemContainer>
                {data?.map(
                  (sideDish:Dish) => 
                    (
                      <SideContainer
                      key={sideDish._id}
                      onClick={() => {
                        loadRecommendedDrink(dish, sideDish);
                      }}
                      >
                        {sideDish.timeInMins === dish.price && (
                          <RecommendedChoice>Recommended choice</RecommendedChoice>
                        )}
                        <InnerContainer>
                          <DishImage src={sideDish.imageUrl} alt="" />
                          <DishTitle>{sideDish.title}</DishTitle>
                        </InnerContainer>
                      </SideContainer>
                  )
                )}
              </ItemContainer>
            </>
            :
            <RecommendDrink showItemAdded={showItemAdded} dish={tempDish} sendToCart={sendToCart}></RecommendDrink>
          }
        <Button onClick={onClose}>Cancel</Button>
      </PopupContainer>
    </>
  );
}

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
  padding-left: 20px;
  padding-right: 20px;
`

const BreakLine = styled.img`
  width: 95%;
  object-fit: cover;
  height: 55px;
`

const Button = styled.button`
  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;

const SideContainer = styled.button`
  position: relative;
  margin: 10px;
  border-radius: 30px;
  // margin-left: 1rem;
  // margin-right: 1rem;
  // margin-bottom: 4px;
  padding: 6px;
  align-items: center;
  transition: color 0.3s, border-color 0.3s;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--fifthColor);
  
  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;
const DishImage = styled.img`
  width: 50%;
  border-radius: 20px;
  margin-right: 10px;
`;
const DishTitle = styled.div`
  width: 50%;
  font-size: 1rem;

  @media (max-width: 949px) {
    font-size: 0.7rem;
  }
`;
const RecommendedChoice = styled.div`
  position: absolute;
  width: 60%;
  margin-bottom: 1rem;
  border: 1px solid var(--fourthColor);
  border-radius: 10px;
  padding: 5px;
  color: white;
  background-color: var(--secondColor);
  top: -10px;
  z-index: 1;
`;


const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 70%;
`;
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // height: 70%;
  min-height: 600px;
  max-width: 800px;
  width: 65%;
  z-index: 3;
  background-color: var(--firstColor);
  background-image: url(${Texture});
  border-radius: 30px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  @media (max-width: 949px) {
    width: 80%;
  }
  @media (max-width: 609px) {
    width: 95%;
  }

`;
