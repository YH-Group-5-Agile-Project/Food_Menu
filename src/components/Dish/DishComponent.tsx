import { useRef } from "react"
import { Dish } from "../../Models/Dish"
import styled from "styled-components"
import { ShortName } from "../../services/ShortNameService"

interface DishComponentProps {
  key: number
  dish: Dish
  expandDish: () => void
  isOpen: boolean
  isSelected: boolean
  isSideDish: boolean
}

interface FoodProps {
  selected: boolean
}

const DishComponent = ({ dish, expandDish, isOpen, isSelected }: DishComponentProps) => {

  const ExpandedRef = useRef<HTMLDivElement>(null)
  
  const clickedEvents = () => {
    expandDish()

      setTimeout( () => {
        ExpandedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: isOpen ? "start" : "end",
        })
      },10)
      

  }

  return (
    <DishContainer selected={isSelected} ref={ExpandedRef} onClick={clickedEvents}>
      <ImageContainer selected={isSelected}>
        <DishImage src={dish.imageUrl} alt={dish.title} />
        {!isSelected && <TitleOverlay>{window.outerWidth < 800 ? ShortName(dish._id) : dish.title}</TitleOverlay>}
      </ImageContainer>
    </DishContainer>
  )
}

export default DishComponent

const DishContainer = styled.div<FoodProps>`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 32px;
`

const ImageContainer = styled.div<FoodProps>`
  position: relative;
  width: 250px;
  height: 250px;

  @media (max-width: 949px) {
    width: 150px;
    height: 150px;
  }
`

const DishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 19px;
  border-bottom-right-radius: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: 16px;

  @media (max-width: 949px) {
    font-size: 15px;
  }
`
