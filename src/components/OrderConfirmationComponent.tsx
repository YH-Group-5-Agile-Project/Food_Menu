import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  return (
    <div>
      <h1>Tack för din beställning!</h1>
      <Link to="/">
        <button>Klar</button>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
