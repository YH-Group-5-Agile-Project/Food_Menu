import { Link } from "react-router-dom";
import { MainDishComponent } from "../components/MainDishComponent";
import { Navbar } from "../components/NavbarComponent";



const MenuPage = () => {
  return (
    <>
    <Navbar currentPage="menu" />
    
  
      <div>
        <MainDishComponent dishType="mainDish" />
      </div>

      <div>
        <Link to="/order">
          <button>My order</button>
        </Link>
        <Link to="/sides">
          <button>Next</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;