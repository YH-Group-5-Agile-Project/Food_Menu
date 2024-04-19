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

let tempDish: Dish;
let tempSide: Dish;

interface AddToCartPopupProps {
  dish: Dish;
  onClose: () => void;
}


export function AddToCartPopup({ dish, onClose }: AddToCartPopupProps) {
  const [sideOrDrink, setSideOrDrink] = useState<boolean>(false);
  const { data, isLoading, error } = PostQuery("sideDish");
  
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
  
    newOrder.OrderCost = CalculateCostOrder(newOrder);
    SaveOrderToCart(newOrder);
    location.reload();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <a onClick={onClose}>
        <Overlay />
      </a>
      <PopupContainer className="add-to-cart-popup">
        <h3>{dish.title}</h3>
        <BreakLine src={DecorationLineImage} />
        {!sideOrDrink ? 
          <div>
            <h2>Select your complimentary side</h2>
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
                    <DishImage src={sideDish.imageUrl} alt="" />
                    <DishTitle>{sideDish.title}</DishTitle>
                  </SideContainer>
              )
            )}
            <Button onClick={onClose}>Cancel</Button>
          </div> 
          :
          <RecommendDrink dish={tempDish} sendToCart={sendToCart}></RecommendDrink>
        }
      </PopupContainer>
    </>
  );
}

const BreakLine = styled.img`
  width: 95%;
  object-fit: cover;
  height: 50px;
`

const Button = styled.button`
  border: solid 2px black;
  border-radius: 30px;
  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;

const SideContainer = styled.button`
  border: solid 2px black;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 4px;
  padding: 0.5rem;
  align-items: center;
  font-size: 20px;
  transition: color 0.3s, border-color 0.3s;

  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;
const DishImage = styled.img`
  width: 50%;
  margin-right: 2rem;
  border-radius: 20px;
`;
const DishTitle = styled.div`
  margin-right: 2rem;
  border-radius: 20px;
`;
const RecommendedChoice = styled.div`
  margin-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  color: white;
  background-color: olivedrab;
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
  height: 70%;
  min-height: 600px;
  max-width: 800px;
  width: 65%;
  z-index: 3;
  background-color: var(--firstColor);
  border-radius: 30px;
  overflow: scroll;
  overflow-x: hidden;

  @media (max-width: 949px) {
    width: 80%;
  }
  @media (max-width: 609px) {
    width: 95%;
  }

`;
