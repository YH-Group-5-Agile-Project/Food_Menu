import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <>
      <div>
        <h1>Menysida</h1>
        <p>Maträtter kommer inom kort</p>
        <Link to="/dish/:id">
          <button>Maträtt 1</button>
        </Link>
        <Link to="/dish/:id">
          <button>Maträtt 2</button>
        </Link>
        <Link to="/dish/:id">
          <button>Maträtt 3</button>
        </Link>
        <Link to="/dish/:id">
          <button>Maträtt 4</button>
        </Link>
        <Link to="/dish/:id">
          <button>Maträtt 5</button>
        </Link>
        <Link to="/dish/:id">
          <button>Maträtt 6</button>
        </Link>
      </div>

      <div>
        <Link to="/order">
          <button>Min beställning</button>
        </Link>
        <Link to="/drink">
          <button>Nästa steg</button>
        </Link>
      </div>
    </>
  );
};

export default MenuPage;
