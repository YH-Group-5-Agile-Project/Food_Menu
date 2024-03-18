import { useNavigate } from "react-router-dom";

const OrderComponent = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Min beställning</h1>
      <p>Här kommer du att se vilka maträtter du valt</p>
      <p>och möjlighet att ta bort eventuell maträtt.</p>
      <button onClick={() => navigate(-1)}>Tillbaka</button>
    </div>
  );
};

export default OrderComponent;
