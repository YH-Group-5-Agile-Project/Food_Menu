import { Link } from "react-router-dom";
import { MainDishComponent } from "../components/MainDishComponent";

const MenuPage = () => {
  return (
    <>
      <div>
        <ul><MainDishComponent dishType="sideDish"/></ul>
      </div>

      <div>
        
        <Link to="/menu">
          <button>Tillbaka</button>
        </Link>
        <Link to="/drink">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
