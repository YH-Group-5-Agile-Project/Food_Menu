import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Link to="/menu">
        <p>Main dish</p>
      </Link>
      <Link to="/side">
        <p>Side dish</p>
      </Link>
      <Link to="/drink">
        <p>Drink</p>
      </Link>
      <Link to="/checkout">
        <p>Checkout</p>
      </Link>
    </div>
  );
};
