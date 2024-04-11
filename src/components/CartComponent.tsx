import { useEffect, useState } from "react";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";;
import styles from "./CartComponent.module.css";

export const CartComponent = () => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  }); // Load

  const [showCart, setShowCart] = useState(true); // State to control cart visibility

  useEffect(() => {
    setCart(GetCart());
  }, []); // render only first time

  const onDelete = (orderId: number) => {
    const updatedOrderList = cart.OrderList.filter(
      (order) => order.id !== orderId
    );
    const updatedCart = {
      ...cart,
      OrderList: updatedOrderList,
      TotalCost: CalculateCostCart({ ...cart, OrderList: updatedOrderList }),
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Order removed", orderId);
  };

  const handleClose = () => {
    setShowCart(false); // Close the cart component
  };

  return (
    <>
      <div className={styles.PopUpOrder}>
        <h1>Your Order</h1>
        <table>
          <thead>
            <tr>
              <th>Dish</th>
              <th>Side</th>
              <th>Drink</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.OrderList.map((order) => (
              <tr key={order.id}>
                <td>{order.main?.title || "-"}</td>
                <td>{order.sides?.title || "-"}</td>
                <td>{order.drink?.name || "-"}</td>
                <td>£{order.OrderCost}</td>
                <td>
                  <button onClick={() => onDelete(order.id)}>Remove</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <h2>Total price: £{CalculateCostCart(cart)}</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartComponent;
