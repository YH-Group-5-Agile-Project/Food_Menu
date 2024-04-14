import { Link } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { SaveCart } from "../services/CartService";

const HomePage = () => {
  // Initialize a Cart
  const storedCart = localStorage.getItem("cart");
  if(!storedCart){
    // if storedCart is null -> create
    let cart: Cart = {
      id: 1,
      OrderList: [],
      TotalCost: 0
    }
    SaveCart(cart);
  }
  console.log(location.pathname)
  
  return (
    <div>
      <h1>
        COCKTAILS<br></br>AND FOOD
      </h1>
      <Link to="/main">
        <button>Lägg ny beställning</button>
      </Link>
    </div>
  );
};

export default HomePage;
