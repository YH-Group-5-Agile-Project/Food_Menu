import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>
        COCKTAILS<br></br>AND FOOD
      </h1>
      <Link to="/menu">
        <button>Lägg ny beställning</button>
      </Link>
    </div>
  );
};

export default HomePage;
