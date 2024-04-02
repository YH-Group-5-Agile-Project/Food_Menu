import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { GetCart } from "../services/CartService";

const CheckoutPage = () => {
  let navigate = useNavigate();
  const [cart, setCart] = useState<Cart>(null);
  // Load
  setCart(GetCart());
  return (
    <div>
      <h1>Min beställning</h1>
      <p>Här kommer du att se alla val du gjort</p>
      <p>och möjlighet att ta bort eventuellt val.</p>
      <ul>
        {cart.OrderList.map(order => (
          <li key={order.id}>
            Main: {order.main.title}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Tillbaka</button>
      <Link to="/orderConfirmation">
        <button>Beställ</button>
      </Link>
    </div>
  );
};

export default CheckoutPage;
