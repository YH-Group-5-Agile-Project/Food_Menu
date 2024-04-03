import styled from "styled-components";
import { MainDish as Dish } from "../Models/Dish";
import { GetDishes } from "../services/DbService";
import { Recommendation } from "../services/RecommendationService"

interface AddToCartPopupProps {
  dish: Dish;
  onClose: () => void;
}


const sendToCart = (dish: Dish, sideDish: Dish) => {};

export function AddToCartPopup({ dish, onClose }: AddToCartPopupProps) {
  let sideDishes = GetDishes("sideDish");
  return (
    <>
      <a onClick={onClose}>
        <Overlay />
      </a>
      <AntiLink onClick={(event) => event.stopPropagation()}>
        <PopupContainer className="add-to-cart-popup">
          <h3>{dish.title}</h3>
          <h2>Choose side</h2>
          {sideDishes?.map((sideDish) => (
            
            <SideContainer
              onClick={() => {
                sendToCart(dish, sideDish);
                onClose();
              }}
            >{/*sideDish.categories.includes(Recommendation(dish._id))*/}
               {
               sideDish._id===(Recommendation(dish._id)) && (
                <h6>Recommended choice</h6>
              )}
              <DishImage src={sideDish.imageUrl} alt="" />
              <div>{sideDish.title}</div>
            </SideContainer>
          ))}
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 30rem;
  z-index: 3;
  background-color: grey;
  border-radius: 30px;
`