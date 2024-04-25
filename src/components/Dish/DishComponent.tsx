import { Dish } from "../../Models/Dish"
import styled from "styled-components"

interface DishComponentProps {
    key: number
    dish: Dish
    isSelected: boolean
    onClick: () => void
    isSideDish: boolean
}

interface FoodProps {
    selected: boolean
}

const DishComponent = ({ dish, isSelected, onClick }: DishComponentProps) => {
    return (
        <DishContainer selected={isSelected} onClick={onClick}>
            <ImageContainer selected={isSelected}>
                <DishImage src={dish.imageUrl} alt={dish.title} />
                {!isSelected && <TitleOverlay>{dish.title}</TitleOverlay>}
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

    /* justify-content: center;
  cursor: pointer;

  margin-bottom: 20px;

  @media (max-width: 949px) {
    margin-bottom: 20px;
  } */
`

const ImageContainer = styled.div<FoodProps>`
    position: relative;
    width: 250px;
    height: 250px;
    //transition: all 0.3s ease;

    @media (max-width: 949px) {
        width: 150px;
        height: 150px;
        /* ${(props) =>
            props.selected &&
            `
      width: 100px;
      height: 100px;
      `} */
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2em;
    font-size: 16px;

    @media (max-width: 949px) {
        font-size: 9px;
    }
`
