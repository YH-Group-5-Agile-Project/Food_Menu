import styled from "styled-components";
import { Dish } from "../Models/Dish";
import { GetDishes } from "../services/DbService";
import { Link } from "react-router-dom";
import { Order } from "../Models/Order";
import { CalculateCostOrder, IncreamentId, SaveOrderToCart } from "../services/CartService";

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
  // CartService(dish);
  // CartService(sideDish);
  alert(`${dish.title} \nwith \n${sideDish.title} added`)
}

export function AddToCartPopup({dish, onClose}: AddToCartPopupProps) {
       let sideDishes = GetDishes("sideDish");
        return (
            <>
            <a onClick={onClose}><Overlay/></a>
            <AntiLink onClick={(event) => event.stopPropagation()}>
              <PopupContainer className="add-to-cart-popup">
                <h3>{dish.title}</h3>
                  <h2>Choose side</h2>
                {sideDishes?.map((sideDish) =>
                <Link to="/order">
                    <SideContainer onClick={() => {sendToCart(dish, sideDish), onClose()}}>
                    <DishImage src="/src/assets/images/beefBurgerStilton.png" alt="" />
                    <div>{sideDish.title}</div>
                  </SideContainer>
                </Link>
                  
                )}
              </PopupContainer>
            </AntiLink>
            </>
        );
}

const SideContainer = styled.a`
  border: solid 3px black;
  border-radius: 30px;
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.5rem;
  align-items: center;
  font-size: 20px;

  color: inherit;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`
const DishImage = styled.img`
  width: 25%;
  margin-right: 2rem;
  border-radius: 20px;
`



const AntiLink = styled.a`
  color: inherit;
  &:hover,
  &:focus {
    color: inherit;
    text-decoration: none;
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
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30rem;
    height: 30rem;
    z-index: 3;
    background-color: grey;
    border-radius: 30px;
`


