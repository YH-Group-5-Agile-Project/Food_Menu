import { useNavigate } from "react-router-dom";
import { MainDishType } from "../Models/MainDishType";

interface DishComponentProps {
  dish: MainDishType
}

const DishComponent: React.FC<DishComponentProps> = ({ dish }) => {
  return (
    <div>
      <h2>{dish.title}</h2>
      <p>{dish.description}</p>
      <img src={dish.imageUrl} alt={dish.title}></img>
    </div>
  );
};

export default DishComponent;
