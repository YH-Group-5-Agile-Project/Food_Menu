import { Link } from "react-router-dom";
import { DishListComponent } from "../components/DishListComponent";
import { Navbar } from "../components/NavbarComponent";



const MenuPage = () => {
  return (
    <>
    <Navbar currentPage="main" />
    
  
      <div>
        <DishListComponent dishType="mainDish" />
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
