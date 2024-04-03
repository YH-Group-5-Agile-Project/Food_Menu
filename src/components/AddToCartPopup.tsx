import styled from "styled-components";
import { Dish } from "../Models/Dish";
import { GetDishes } from "../services/DbService";
import { Recommendation } from "../services/RecommendationService";
// import { Link } from "react-router-dom";
import { Order } from "../Models/Order";
import {
  CalculateCostOrder,
  IncreamentId,
  SaveOrderToCart,
} from "../services/CartService";

interface AddToCartPopupProps {
  dish: Dish;
  onClose: () => void;
}

const sendToCart = (dish: Dish, sideDish: Dish) => {
  // First SideDish is free
  sideDish.price = 0;
  // Create Order
  let newOrder: Order = {
    id: IncreamentId(),
    main: dish,
    sides: sideDish,
    OrderCost: 0,
  };
  // Calculate price for Order
  newOrder.OrderCost = CalculateCostOrder(newOrder);
  SaveOrderToCart(newOrder);
  location.reload();
};

export function AddToCartPopup({ dish, onClose }: AddToCartPopupProps) {
  let sideDishes = GetDishes("sideDish");
  let recomendation = Recommendation(dish._id)
  return (
    <>
      <a onClick={onClose}>
        <Overlay />
      </a>
      {/* <AntiLink onClick={(event) => event.stopPropagation()}> */}
      <PopupContainer className="add-to-cart-popup">
        <h3>{dish.title}</h3>
        <h2>Choose side</h2>
        {sideDishes?.map(
          (sideDish) => (
            // <Link to="/order">
            <SideContainer
              key={sideDish._id}
              onClick={() => {
                sendToCart(dish, sideDish), onClose();
              }}
            >
              {/*sideDish.categories.includes(recomendation)*/}
              {sideDish._id === recomendation && (
                  <RecommendedChoice>Recommended choice</RecommendedChoice>
                )}
              <DishImage src={sideDish.imageUrl} alt="" />
              <DishTitle>{sideDish.title}</DishTitle>
                
            </SideContainer>
          )
          // </Link>
        )}
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </PopupContainer>
      {/* </AntiLink> */}
    </>
  );
}

const CancelButton = styled.button`
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

/* const AntiLink = styled.a`
  color: inherit;
  &:hover,
  &:focus {
    color: inherit;
    text-decoration: none;
  }
` */

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
  width: 40rem;
  height: 40rem;
  z-index: 3;
  background-color: grey;
  border-radius: 30px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 10px;
`;
