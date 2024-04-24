import { useEffect, useRef, useState } from "react";
import DrinkComponent from "./DrinkComponent";
import styled, { keyframes } from "styled-components";
import { DrinkQueries } from "../services/DbService";
import { Drink } from "../Models/Drink";
import { SendDrinkToCart } from "../services/CartService";
import { ItemAddedToCartPopup } from "./ItemAddedToCartPopup";

const transitionTime = 800;

interface FoodProps {
  selected: boolean;
  isOpen: boolean;
}

interface DrinkProps {
  drink: Drink;
  onClose: () => void;
}
export const DrinkListComponent = ({ onClose }: DrinkProps) => {
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
  ];

  const [drinkList, setDrinkList] = useState<Drink[]>([])
  const [showItemAdded, setShowItemAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await DrinkQueries(drinkListIDs);
      setDrinkList(data)
    }
    fetchData();
  }, [])

  const ExpandedRef = useRef<HTMLDivElement>(null);


  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<boolean>(false);
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);

  const HandleClick = (index: number) => {
    
    if (index === selectedDrink) {
      setIsOpenInfo(false);
      setSelectedInfo(false);
    } else if ((selectedDrink || selectedDrink === 0) && index !== selectedDrink) {
      setIsOpenInfo(true);
      setSelectedInfo(false);
      setSelectedDrink(index);

    } else {
      setIsOpenInfo(true);
      setSelectedInfo(true);
      setSelectedDrink(index);
      setTimeout(() =>
        {ExpandedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: "center" })
      }, 300)
    }
  };

  const handleAddToCartClick = (drink: Drink) => {
    SendDrinkToCart(drink);
    setShowItemAdded(true);
    setTimeout(() => {
      setShowItemAdded(false);
    }, 2000);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <DrinksContainer>
      {drinkList.map((drink, index) => {
        console.log(drink)      ;
        return drink ? (
                
        <>
        <DrinkComponent
          isSelected={index === selectedDrink}
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
                    setSelectedDrink(null);
                  }
                }}
              >
                <TextContainer>
                  <DishTitle>{drink.name}</DishTitle>
                  <DishDescription>
                    <DishPrice>{drink.price} SEK</DishPrice>
                    <p>{drink.alcoholic ? "Alcoholic" : "Non-Alcoholic"}</p>
                    
                  </DishDescription>
                  <DishIngredients>
                    <strong>Ingredients: </strong>
                    {drink.ingredients.join(', ')}.
                  </DishIngredients>
                </TextContainer>
                <StyledButton
                  disabled={showItemAdded}
                  onClick={() => handleAddToCartClick(drink)}
                >
                  <ItemAddedPopup>Add to order</ItemAddedPopup>
                </StyledButton>
                {showItemAdded && (
                    <ItemAddedToCartPopup Item={drink.name}/>
                  )}
              </ExpandedDrink>
            )}
        </>
      ): <></>})
    }
      </DrinksContainer>
  );
};

const ItemAddedPopup = styled.div``;

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
`;

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
`;

const StayOpenAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ExpandedDrink = styled.div<FoodProps>`
  max-height: ${(props) => props.isOpen ? '280px' : '0'};
  opacity: ${(props) => props.isOpen ? '1' : '0'};
  height: 280px;
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
  display: flex;
  align-items: start;
`;

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

  /* 220px -------- minmax(250px, 1fr) */

  @media (max-width: 949px) {
    width: 500px;
    column-gap: 23px;
    grid-template-columns: repeat(auto-fill, 150px);
  }

  @media (max-width: 549px) {
    width: 360px;
    //gap: 10px;
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
width: 80%;
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

const DishPrice = styled.h2``;

const DishIngredients = styled.div`
  text-align: left;
`;

const StyledButton = styled.button`
  align-self: center;
  margin: 20px;
  width: 20%;
  height: 140px;
`;
