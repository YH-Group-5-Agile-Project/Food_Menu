import styled from "styled-components"
import { Dish } from "../../Models/Dish"
import { Drink } from "../../Models/Drink"
import DrinkComponentAlt from "./DrinkComponentAlt"

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
]

interface DrinkProps {
  dish: Dish
  sendToCart: (drink?: Drink) => void
  showItemAdded: boolean
}

export const DrinkPickList = (props: DrinkProps) => {
  return (
    <>
          <ListContainer>
            {drinkListIDs.map((drinkId) => (
              <DrinkComponentAlt sendToCart={props.sendToCart} key={drinkId} drinkId={drinkId} />
            ))}
          </ListContainer>
          <Button
            disabled={props.showItemAdded}
            onClick={() => {
              props.sendToCart()
            }}>
            Never mind, just the food
          </Button>
    </>
  )
}



const Button = styled.button`
  margin: 20px;

  border: solid 2px var(--firstColor);
`
const ListContainer = styled.div``