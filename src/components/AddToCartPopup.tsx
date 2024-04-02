import styled from "styled-components";
import { Dish } from "../Models/Dish";
import { GetDishes } from "../services/DbService";

  interface AddToCartPopupProps {
    dish: Dish;
    onClose: () => void;
  }

const sendToCart = (dish: Dish, sideDish: Dish) => {
  // CartService(dish);
  // sideDish.price = 0;
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
                  <SideContainer onClick={() => {sendToCart(dish, sideDish), onClose()}}>
                    <DishImage src={sideDish.imageUrl} alt="" />
                    <div>{sideDish.title}</div>
                  </SideContainer>
                )}
                <CancelButton onClick={onClose}>Cancel</CancelButton>
              </PopupContainer>
            </AntiLink>
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
`

const SideContainer = styled.button`
  border: solid 2px black;
  border-radius: 30px;
  display: flex;
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
    overflow: scroll;
    padding: 10px;
`


