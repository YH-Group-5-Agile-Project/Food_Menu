import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { DishListComponent } from "../components/DishListComponent";
import { ToCartButton } from "../components/CartButtonComponent";

const SidePage = () => {
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
        <ToCartButton />
        <Link to="/drink">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default SidePage;
