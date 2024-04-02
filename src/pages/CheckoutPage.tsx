import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { GetCart, ResetCart } from "../services/CartService";
import { Navbar } from "../components/NavbarComponent";

const CheckoutPage = () => {
  let navigate = useNavigate();
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0
  });
  // Load
  useEffect(() => {
    setCart(GetCart());
  }, []) // render only first time
  return (
    <>
    <Navbar currentPage="checkout" />
    <div>
      <h1>Min beställning</h1>
      <p>Här kommer du att se alla val du gjort</p>
      <p>och möjlighet att ta bort eventuellt val.</p>
      <ul>
        {cart.OrderList.map(order => (
          <>
            <li key={order.id}>
                Main: {order.main.title}
            </li>
            <li key={order.id}>
                Side: {order.sides.title}
            </li>
          </>          
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Tillbaka</button>
      <Link to="/orderConfirmation">
        <button>Beställ</button>
      </Link>
      <button type="button" onClick={ResetCart}>
        Reset Cart
      </button>
    </div>
    </>
    
  );
};

export default CheckoutPage;
