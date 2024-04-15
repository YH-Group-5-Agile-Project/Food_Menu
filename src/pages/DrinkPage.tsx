import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { GetDrink } from "../services/DbService";
import DrinkComponent from "../components/DrinkComponent";
import { ToCartButton } from "../components/CartButtonComponent";

const DrinkPage = () => {
  let drinkListIDs = [
    "12768",
    "12618",
    "15092",
    "12630",
    "12724",
    "12726",
    "11288",
    "178365",
    "11462",
    "11000",
    "11003",
    "12528",
  ];

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
        <ToCartButton />
        <Link to="/checkout">
          <button>Till betalning</button>
        </Link>
      </div>
    </>
  );
};

export default DrinkPage;
