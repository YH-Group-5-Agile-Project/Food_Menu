import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "../components/NavbarComponent";

const CheckoutPage = () => {
  let navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div>
      <h1>Min beställning</h1>
      <p>Här kommer du att se alla val du gjort</p>
      <p>och möjlighet att ta bort eventuellt val.</p>
      <button onClick={() => navigate(-1)}>Tillbaka</button>
      <Link to="/orderConfirmation">
        <button>Beställ</button>
      </Link>
    </div>
    </>
    
  );
};

export default CheckoutPage;
