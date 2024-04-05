import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";
import { GetDrink } from "../services/DbService";
import { Drink } from "../Models/Drink";
import { useEffect } from "react";

const DrinkPage = () => {

  let drinkListIDs = [
    "11007",
    "11009",
    "11011"
  ]

  let drinkList = drinkListIDs.map(drinkId => {
    return GetDrink(drinkId);
  })

  return (
    <>
      <div>
        {drinkList.map(drink => (
          <p>{drink?.name}</p>
        ))}
      </div>



      <Navbar currentPage="drink" />
      <div>
        <h1>Drinkar</h1>
        <p>Här kommer det finnas olika drinkar att välja på.</p>
        <p>En föreslagen drink erbjuds beroende på val av maträtt maträtt.</p>
        <p>
          Man ska nu kunna acceptera erbjudandet, <br></br>välja egen drink,
          eller hoppa över drink?
        </p>
      </div>

      <div>
        <Link to="/drink/:id">
          <button>Drink 1</button>
        </Link>
        <Link to="/drink/:id">
          <button>Drink 2</button>
        </Link>
        <Link to="/drink/:id">
          <button>Drink 3</button>
        </Link>
        <Link to="/drink/:id">
          <button>Drink 4</button>
        </Link>
        <Link to="/drink/:id">
          <button>Drink 5</button>
        </Link>
        <Link to="/drink/:id">
          <button>Drink 6</button>
        </Link>
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
