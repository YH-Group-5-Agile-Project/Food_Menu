import DishComponent from "./DishComponent";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Dish } from "../Models/Dish";
import { IncreamentId, SaveOrderToCart } from "../services/CartService";
import { Order } from "../Models/Order";
import { AddToCartPopup } from "./AddToCartPopup";
import { PostQuery } from "../services/DbService";
import { ItemAddedToCartPopup } from "./ItemAddedToCartPopup";


const transitionTime = 800;
let tempDish: Dish;

interface dishInput {
  dishType: string;
}

interface FoodProps {
  selected: boolean;
  isOpen: boolean;
}

const SendToCart = (dish: Dish) => {
  const newOrder: Order = {
    id: IncreamentId(),
    sides: dish,
    OrderCost: dish.price,
  };
  SaveOrderToCart(newOrder);
  
  console.log("Item sent to cart")
};

const getIngredients = (dish: Dish) => {
  const ingredientsList = dish.ingredients.map((ingredient) => ingredient.name);
  let ingredients;
  if (ingredientsList.length > 1) {
    ingredients =
      ingredientsList.slice(0, -1).join(", ") +
      " and " +
      ingredientsList.slice(-1);
  } else {
    ingredients = ingredientsList[0] || "";
  }
  return ingredients;
};

export const DishListComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<boolean>(false);
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showItemAdded, setShowItemAdded] = useState(false);
  const isSideDish = dishType.toLowerCase() === "sidedish" ? true : false;
  const { data, isLoading, error } = PostQuery(dishType);
  let itemName: string = "item";

  const HandleClick = (index: number) => {
    if (index === selectedDish) {
      setIsOpenInfo(false);
      setSelectedInfo(false);

    } else if ((selectedDish || selectedDish === 0) && index !== selectedDish) {
      setIsOpenInfo(true);
      setSelectedInfo(false);
      setSelectedDish(index);
    } else {
      setIsOpenInfo(true);
      setSelectedInfo(true);
      setSelectedDish(index);
    }
  };

  const handleAddToCartClick = (dish: Dish) => {
    if (!isSideDish) {
      setIsPopupOpen(true);
      tempDish = dish;
    } else {SendToCart(dish);
      itemName = dish.title;
      setShowItemAdded(true)
      setTimeout(() => {
        setShowItemAdded(false);
      }, 2000);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <DishesContainer>
        {data?.map((dish: Dish, index: number) => (
          <>
            <DishComponent
              key={index}
              dish={dish}
              isSelected={index === selectedDish}
              onClick={() => HandleClick(index)}
              isSideDish={isSideDish}
            />
            {index === selectedDish && (
              <ExpandedDish isOpen={isOpenInfo} selected={selectedInfo} onAnimationEnd={() => {
                if(!isOpenInfo) {
                  setSelectedDish(null);
                }
              }}>
                <TextContainer>
                  <DishTitle>{dish.title}</DishTitle>
                  <DishDescription>
                    <DishPrice>£{dish.price}</DishPrice>
                    <strong>Description: </strong>
                    {dish.description}
                  </DishDescription>
                  <DishIngredients>
                    <strong>Ingredients: </strong>
                    {getIngredients(dish)}.
                  </DishIngredients>
                </TextContainer>
                <StyledButton disabled={showItemAdded} onClick={() => handleAddToCartClick(dish)}>
                  <ItemAddedPopup>Add to order</ItemAddedPopup>
                </StyledButton>
                
                {showItemAdded && (
                    <ItemAddedToCartPopup Item={dish.title}/>
                  )}
              </ExpandedDish>
            )}
          </>
        ))}
      </DishesContainer>
      {isPopupOpen && (
        <AddToCartPopup dish={tempDish} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
};

const ItemAddedPopup = styled.div `

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
    max-height: 330px;
    opacity: 1;
  }
`;

const CloseAnimation = keyframes`
  0% {
    max-height: 330px;
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  100% {
    max-height: 0px;
    opacity: 0;
  }
`;

const StayOpenAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ExpandedDish = styled.div<FoodProps>`
  max-height: ${(props) => props.isOpen ? '330px' : '0'};
  opacity: ${(props) => props.isOpen ? '1' : '0'};
  height: 330px;
  width: 90%;
  grid-column: 1 / -1;
  grid-row: auto;
  animation-name: ${(props) =>
    props.selected && props.isOpen
      ? ExpandAnimation
      : !props.selected && props.isOpen
      ? StayOpenAnimation
      : CloseAnimation};
  animation-duration: ${transitionTime}ms;
`;

const DishesContainer = styled.div`
  position: relative;
  place-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  width: 880px;
  overflow: hidden;

  @media (max-width: 949px) {
    width: 560px;
    gap: 20px;
  }

  @media (max-width: 549px) {
    width: 360px;
    gap: 10px;
  }
`;

const DishDescription = styled.p`
  margin: 10px 0;
  text-align: left;
`;

const DishTitle = styled.h2`
  margin: 10px;
`;

const TextContainer = styled.div`
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const DishPrice = styled.h2``;

const DishIngredients = styled.div`
  text-align: left;
`;

const StyledButton = styled.button`
  margin: 20px;
`;
