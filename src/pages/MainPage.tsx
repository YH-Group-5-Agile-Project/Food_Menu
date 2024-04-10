import { Link } from "react-router-dom";
import { DishListComponent } from "../components/DishListComponent";
import { Navbar } from "../components/NavbarComponent";
import { ToCartButton } from "../components/CartButtonComponent";



const MenuPage = () => {
  return (
    <>
    <Navbar currentPage="main" />
    
  
      <div>
        <DishListComponent dishType="mainDish" />
      </div>

      <div>
        <ToCartButton/>

        <Link to="/sides">
          <button>Next</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
