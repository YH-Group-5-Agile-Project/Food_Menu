import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { MainDishComponent } from "../components/MainDishComponent";

const SidePage = () => {
  return (
    <>
      <Navbar currentPage="sides" />

      <div>
        <MainDishComponent dishType="sideDish" />
      </div>
      <div>
        <Link to="/menu">
          <button>Tillbaka</button>
        </Link>
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

export default SidePage;
