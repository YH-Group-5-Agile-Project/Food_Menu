import { MainDish } from "../Models/MainDish";

type DishComponentProps = {
  dish: MainDish
}

const DishComponent = ({ dish }: DishComponentProps) => {
  return (
    <div>
      <h2>{dish.title}</h2>
      <img src={dish.imageUrl} width={250} height={250} alt={dish.title} ></img>
      <p>{dish.description}</p>
    </div>
  );
};

export default DishComponent;
