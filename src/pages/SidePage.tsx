import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { DishListComponent } from "../components/DishListComponent";
import { ToCartButton } from "../components/CartButtonComponent";
import CartComponent from "../components/CartComponent"; // Import CartComponent

const SidePage = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  }

  return (
    <>
      <Navbar currentPage="sides" />

      <div>
        <DishListComponent dishType="sideDish" />
      </div>
      <div>
        <Link to="/main">
          <button>Tillbaka</button>
        </Link>
        <ToCartButton onClick={toggleCart}/>
        <Link to="/drink">
          <button>Nästa steg</button>
        </Link>
      </div>

      {cartVisible && <CartComponent />}
    </>
  );
};

export default SidePage;
