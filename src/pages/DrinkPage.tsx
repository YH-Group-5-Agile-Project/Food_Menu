import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { GetDrink } from "../services/DbService";
import DrinkComponent from "../components/DrinkComponent";

const DrinkPage = () => {
  let drinkListIDs = ["11007", "11009", "11011"];

  let drinkList = drinkListIDs.map((drinkId) => {
    return GetDrink(drinkId);
  });

  return (
    <>
      <Navbar currentPage="drink" />
      <div>
        <h1>Drinkar</h1>

        <div>
          <div>
            {drinkList.map((drink) => (
              <DrinkComponent key={drink?.id} drink={drink} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <Link to="/sides">
          <button>Tillbaka</button>
        </Link>
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/checkout">
          <button>Till betalning</button>
        </Link>
      </div>
    </>
  );
};

export default DrinkPage;
