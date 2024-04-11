import { useState } from "react";
import { Link } from "react-router-dom";
import { DishListComponent } from "../components/DishListComponent";
import { Navbar } from "../components/NavbarComponent";
import { ToCartButton } from "../components/CartButtonComponent";
import CartComponent from "../components/CartComponent";
import { ToggleCartOverlay } from "../App";

const MainPage = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  }

  return (
    <>
    <Navbar currentPage="main" />
    
  
      <div>
        <DishListComponent dishType="mainDish" />
      </div>

      <div>
      <ToCartButton onClick={toggleCart}/>

        <Link to="/sides">
          <button>Next</button>
        </Link>
      </div>

      {cartVisible && <>
        <ToggleCartOverlay onClick={toggleCart} />
          <CartComponent />
      </>
      }
    </>
  );
};

export default MainPage;
