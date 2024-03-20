import { Link } from "react-router-dom";
import { MainDish } from "../components/MainDish";

const MenuPage = () => {
  return (
    <>
      <div>
        <ul><MainDish /></ul>
      </div>

      <div>
        
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/drink">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
