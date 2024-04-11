import CheckoutComponent from "../components/CheckoutComponent";
import { Navbar } from "../components/NavbarComponent";

const CheckoutPage = () => {
  return (
    <>
      <Navbar currentPage="checkout" />
      <CheckoutComponent />
    </>
  );
};

export default CheckoutPage;
