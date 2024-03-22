import { useNavigate } from "react-router-dom";
import { MainDishType } from "../Models/MainDishType";

type DishComponentProps = {
  dish: MainDishType
}

const DishComponent = ({ dish }: DishComponentProps) => {
  return (
    <div>
      <h2>{dish.title}</h2>
      <p>{dish.description}</p>
      <img src={dish.imageUrl} alt={dish.title}></img>
    </div>
  );
};

export default DishComponent;
