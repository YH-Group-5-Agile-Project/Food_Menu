import { Link } from "react-router-dom";

const Sidepage = () => {
  return (
    <>
      <div>
        <h1>Sides</h1>
        <p>Här kommer det finnas olika Sides att välja på.</p>
    
      </div>

      <div>
        <Link to="/side/:id">
          <button>Drink 1</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 2</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 3</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 4</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 5</button>
        </Link>
        <Link to="/side/:id">
          <button>Drink 6</button>
        </Link>
      </div>

      <div>
        <Link to="/menu">
          <button>Menysida</button>
        </Link>
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/checkout">
          <button>Till betalning</button>
        </Link>
      </div>
    </>
  );
};

export default Sidepage;
