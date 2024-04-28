// import DishComponent from "./DishComponent"
// import { useState } from "react"
// import styled, { keyframes } from "styled-components"
// import { Dish } from "../../Models/Dish"
// import { IncreamentId, SaveOrderToCart } from "../../services/CartService"
// import { Order } from "../../Models/Order"
// import { AddToCartPopup } from "../Cart/AddToCartPopup"
// import { PostQuery } from "../../services/DbService"
// import { ItemAddedToCartPopup } from "../ItemAddedToCartPopup"
// import React from "react"

// let tempDish: Dish

// interface dishInput {
//   dishType: string
// }
// const transitionTime = 800

// interface FoodProps {
//   selected: boolean
//   $isOpen: boolean
// }

// const SendToCart = (dish: Dish) => {
//   const newOrder: Order = {
//     id: IncreamentId(),
//     sides: dish,
//     OrderCost: dish.price,
//   }
//   SaveOrderToCart(newOrder)

//   console.log("Item sent to cart")
// }

// const getIngredients = (dish: Dish) => {
//   const ingredientsList = dish.ingredients.map((ingredient) => ingredient.name)
//   let ingredients
//   if (ingredientsList.length > 1) {
//     ingredients = ingredientsList.slice(0, -1).join(", ") + " and " + ingredientsList.slice(-1)
//   } else {
//     ingredients = ingredientsList[0] || ""
//   }
//   return ingredients
// }

// export const DishListComponent = ({ dishType }: dishInput) => {
//   const [selectedDish, setSelectedDish] = useState<number | null>(null)
//   const [selectedInfo, setSelectedInfo] = useState<boolean>(false)
//   const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false)
//   const [isPopupOpen, setIsPopupOpen] = useState(false)
//   const [showItemAdded, setShowItemAdded] = useState(false)
//   const isSideDish = dishType.toLowerCase() === "sidedish" ? true : false
//   const { data, isLoading, error } = PostQuery(dishType)
//   let itemName: string = "item"

//   const HandleClick = (index: number) => {
//     if (index === selectedDish) {
//       setIsOpenInfo(false)
//       setSelectedInfo(false)
//     } else if ((selectedDish || selectedDish === 0) && index !== selectedDish) {
//       setIsOpenInfo(true)
//       setSelectedInfo(false)
//       setSelectedDish(index)
//     } else {
//       setIsOpenInfo(true)
//       setSelectedInfo(true)
//       setSelectedDish(index)
//     }
//   }

//   const handleAddToCartClick = (dish: Dish) => {
//     if (!isSideDish) {
//       setIsPopupOpen(true)
//       tempDish = dish
//     } else {
//       SendToCart(dish)
//       itemName = dish.title
//       setShowItemAdded(true)
//       setTimeout(() => {
//         setShowItemAdded(false)
//         setIsOpenInfo(false)
//         setSelectedInfo(false)
//       }, 1000)
//     }
//   }

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>
//   return (
//     <>
//       <DishesContainer>
//         {data?.map((dish: Dish, index: number) => (
//           <React.Fragment key={index}>
//             <DishComponent
//               key={index}
//               dish={dish}
//               isSelected={index === selectedDish}
//               onClick={() => HandleClick(index)}
//               isSideDish={isSideDish}
//             />
//             {index === selectedDish && (
//               <ExpandedDish
//                 $isOpen={isOpenInfo}
//                 selected={selectedInfo}
//                 onAnimationEnd={() => {
//                   if (!isOpenInfo) {
//                     setSelectedDish(null)
//                   }
//                 }}>
//                 <TextContainer>
//                   <DishTitle>{dish.title}</DishTitle>
//                   <DishDescription>
//                     <strong>Description: </strong>
//                     {dish.description}
//                   </DishDescription>
//                   <DishIngredients>
//                     <strong>Ingredients: </strong>
//                     {getIngredients(dish)}.
//                   </DishIngredients>
//                   <PriceButtonContainer>
//                     <DishPrice>{dish.price} SEK</DishPrice>
//                     <StyledButton disabled={showItemAdded} onClick={() => handleAddToCartClick(dish)}>Add to order</StyledButton>
//                   </PriceButtonContainer>
//                 </TextContainer>
//                 {showItemAdded && <ItemAddedToCartPopup Item={dish.title} />}
//               </ExpandedDish>
//             )}
//           </React.Fragment>
//         ))}
//       </DishesContainer>
//       {isPopupOpen && <AddToCartPopup dish={tempDish} onClose={() => setIsPopupOpen(false)} />}
//     </>
//   )
// }
import DishComponent from "./DishComponent"
import { useState, useRef, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { Dish } from "../../Models/Dish"
import { IncreamentId, SaveOrderToCart } from "../../services/CartService"
import { Order } from "../../Models/Order"
import { AddToCartPopup } from "../Cart/AddToCartPopup"
import { PostQuery } from "../../services/DbService"
import { ItemAddedToCartPopup } from "../ItemAddedToCartPopup"
import React from "react"

let tempDish: Dish

interface dishInput {
  dishType: string
}
const transitionTime = 1

interface FoodProps {
  selected: boolean
  $isOpen: boolean
}

const SendToCart = (dish: Dish) => {
  const newOrder: Order = {
    id: IncreamentId(),
    sides: dish,
    OrderCost: dish.price,
  }
  SaveOrderToCart(newOrder)

  console.log("Item sent to cart")
}

const getIngredients = (dish: Dish) => {
  const ingredientsList = dish.ingredients.map((ingredient) => ingredient.name)
  let ingredients
  if (ingredientsList.length > 1) {
    ingredients = ingredientsList.slice(0, -1).join(", ") + " and " + ingredientsList.slice(-1)
  } else {
    ingredients = ingredientsList[0] || ""
  }
  return ingredients
}

export const DishListComponent = ({ dishType }: dishInput) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null)
  const [selectedInfo, setSelectedInfo] = useState<boolean>(false)
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showItemAdded, setShowItemAdded] = useState(false)
  const isSideDish = dishType.toLowerCase() === "sidedish" ? true : false
  const dishRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { data, isLoading, error } = PostQuery(dishType)
  let itemName: string = "item"

  useEffect(() => {
    if (selectedDish !== null && dishRefs.current[selectedDish] !== null) {
      const timer = setTimeout(() => {
        if (dishRefs.current[selectedDish] !== null) {
          dishRefs.current[selectedDish].scrollIntoView({ behavior: 'smooth', block: 'start', });
        }
      }, 10);
  
      return () => clearTimeout(timer);
    }
  }, [selectedDish]);

  const HandleClick = (index: number) => {
    if (index === selectedDish) {
      setIsOpenInfo(false)
      setSelectedInfo(false)
    } else if ((selectedDish || selectedDish === 0) && index !== selectedDish) {
      setIsOpenInfo(true)
      setSelectedInfo(false)
      setSelectedDish(index)
    } else {
      setIsOpenInfo(true)
      setSelectedInfo(true)
      setSelectedDish(index)
    }
  }

  const handleAddToCartClick = (dish: Dish) => {
    if (!isSideDish) {
      setIsPopupOpen(true)
      tempDish = dish
    } else {
      SendToCart(dish)
      itemName = dish.title
      setShowItemAdded(true)
      setTimeout(() => {
        setShowItemAdded(false)
        setIsOpenInfo(false)
        setSelectedInfo(false)
      }, 1000)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <>
      <DishesContainer>
        {data?.map((dish: Dish, index: number) => (
          <React.Fragment key={index}>
            <div ref={(el) => dishRefs.current[index] = el}>
              <DishComponent
                key={index}
                dish={dish}
                isSelected={index === selectedDish}
                onClick={() => HandleClick(index)}
                isSideDish={dishType.toLowerCase() === "sidedish"}
              />
            </div>
            {index === selectedDish && (
              <ExpandedDish
                $isOpen={isOpenInfo}
                selected={selectedInfo}
                onAnimationEnd={() => {
                  if (!isOpenInfo) {
                    setSelectedDish(null)
                  }
                }}>
                <TextContainer>
                  <DishTitle>{dish.title}</DishTitle>
                  <DishDescription>
                    <strong>Description: </strong>
                    {dish.description}
                  </DishDescription>
                  <DishIngredients>
                    <strong>Ingredients: </strong>
                    {getIngredients(dish)}.
                  </DishIngredients>
                  <PriceButtonContainer>
                    <DishPrice>{dish.price} SEK</DishPrice>
                    <StyledButton disabled={showItemAdded} onClick={() => handleAddToCartClick(dish)}>Add to order</StyledButton>
                  </PriceButtonContainer>
                </TextContainer>
                {showItemAdded && <ItemAddedToCartPopup Item={dish.title} />}
              </ExpandedDish>
            )}
          </React.Fragment>
        ))}
      </DishesContainer>
      {isPopupOpen && <AddToCartPopup dish={tempDish} onClose={() => setIsPopupOpen(false)} />}
    </>
  )
}

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
`

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
`

const StayOpenAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ExpandedDish = styled.div<FoodProps>`
  max-height: ${(props) => (props.$isOpen ? "330px" : "0")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  height: 330px;
  grid-column: 1 / -1;
  grid-row: auto;
  animation-name: ${(props) =>
    props.selected && props.$isOpen
      ? ExpandAnimation
      : !props.selected && props.$isOpen
        ? StayOpenAnimation
        : CloseAnimation};
  animation-duration: ${transitionTime}ms;
  display: flex;
  align-items: start;
  justify-content: center;
`

const DishesContainer = styled.div`
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

const DishDescription = styled.div`
  margin: 10px 0;
  text-align: left;
`

const DishTitle = styled.h2`
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

const DishIngredients = styled.div`
  text-align: left;
`

const PriceButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DishPrice = styled.h2`
text-align: left;
flex: 1 1 auto;
`

const StyledButton = styled.button`
  text-align: right;
  flex: 0 1 auto;
`
