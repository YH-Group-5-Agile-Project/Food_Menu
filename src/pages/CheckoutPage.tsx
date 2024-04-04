import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { GetCart, ResetCart } from "../services/CartService";
import { Navbar } from "../components/NavbarComponent";
import { CartComponent } from "../components/CartComponent";


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

    <h1>Your order:</h1>

    <CartComponent></CartComponent>

    
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button type="button" onClick={ResetCart}>
        Reset Cart
      </button>
    </div>
    </>
    
  );
};

export default CheckoutPage;
