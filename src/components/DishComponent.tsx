import { MainDish } from "../Models/MainDish";

interface DishComponentProps {
  dish: MainDish
}

const DishComponent: React.FC<DishComponentProps> = ({ dish }) => {
  return (
    <div>
      <h2>{dish.title}</h2>
      <img src={dish.imageUrl} width={250} height={250} alt={dish.title} ></img>
      <p>{dish.description}</p>
    </div>
  );
};

export default DishComponent;
