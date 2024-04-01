import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";

const SidePage = () => {
  return (
    <>
        <Navbar currentPage="sides" />
    
      <div>
        <h1>Sides</h1>
        <p>Här kommer det finnas olika Sides att välja på.</p>
    
      </div>

      <div>
        <Link to="/side/:id">
          <button>Drink 1</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 2</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 3</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 4</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 5</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 6</button>
        </Link>
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
