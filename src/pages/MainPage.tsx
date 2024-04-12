import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { ToCartButton } from "../components/CartButtonComponent";
import { DishList } from "../components/DishListComponent2";



const MainPage = () => {
  return (
    <>
    <Navbar currentPage="main" />
    <DishList />
    <div>
        <Link to="/home">
          <button>Tillbaka</button>
        </Link>
        <ToCartButton/>
        <Link to="/side">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>

  )
}

export default MainPage;