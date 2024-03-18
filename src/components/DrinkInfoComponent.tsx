import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DrinkInfoPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Drink</h1>
      <p>Här kommer du att se en tydligare beskrivning av drinken</p>
      <p>och möjlighet att lägga till den i din beställning.</p>
      <button onClick={() => navigate(-1)}>Tillbaka</button>
      <Link to="/drink">
        <button>Lägg till</button>
      </Link>
    </div>
  );
};

export default DrinkInfoPage;
