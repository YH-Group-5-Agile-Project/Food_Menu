import { Link } from "react-router-dom";
import { MainDishComponent } from "../components/MainDishComponent";

const MenuPage = () => {
  return (
    <>
      <div>
        <ul><MainDishComponent dishType="mainDish"/></ul>
      </div>

      <div>
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/sides">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
