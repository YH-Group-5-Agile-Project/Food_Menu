import { MainDish } from "../Models/MainDish";
import styled from "styled-components";

interface DishComponentProps {
  key: number;
  dish: MainDish;
  isSelected: boolean;
  onClick: () => void;
}

interface FoodProps {
  isSelected: boolean;
}

const DishComponent: React.FC<DishComponentProps> = ({ key, dish, isSelected, onClick }) => {
  return (
      <DishContainer isSelected={isSelected}>
        <ImageContainer>
          <DishImage src={dish.imageUrl} alt={dish.title} />
          <TitleOverlay>{dish.title}</TitleOverlay>
        </ImageContainer>
        {isSelected &&
          <p>{dish.ingredients}</p>
        }

      </DishContainer>
  );
};

export default DishComponent;

const DishContainer = styled.div<FoodProps>`
  width: ${(props) => (props.isSelected ? '200px' : '250px')};
  cursor: pointer;
  margin-bottom: 20px;
  /* width: 250px; */
  @media (max-width: 768px) {
    width: calc(50% - 10px);
    margin-bottom: 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: calc(2.5vw + 2.5vh + 0.5vmin);

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }

  @media (min-width: 769px) {
    font-size: 1.5vw;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;
