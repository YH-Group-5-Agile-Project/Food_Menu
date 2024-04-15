import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { ToCartButton } from "../components/CartButtonComponent";
import { DishListComponent } from "../components/DishListComponent";

const MainPage = () => {
  return (
    <>
      <Navbar currentPage="main" />
      <DishListComponent dishType="mainDish" />
      <div>
        <Link to="/home">
          <button>Tillbaka</button>
        </Link>
        <ToCartButton />
        <Link to="/side">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MainPage;
