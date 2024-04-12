import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MainPage";
import SidePage from "./pages/SidePage";
import DrinkPage from "./pages/DrinkPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartComponent from "./components/CartComponent";
import "./App.css";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Example } from "./services/DbService";

const queryClient = new QueryClient();



function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MenuPage />} />
          <Route path="/sides" element={<SidePage />} />
          <Route path="/drink" element={<DrinkPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<CartComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
