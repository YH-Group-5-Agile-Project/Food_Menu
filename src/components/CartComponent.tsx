import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart, } from "../services/CartService";
import styled, { css } from "styled-components";

export const CartComponent = () => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  }); // Load

  useEffect(() => {
    setCart(GetCart());
  }, []); // render only first time


  const onDelete = () => {
    console.log("delete");
  };


  return (
    <>
      <div>
        <h1>Your Order</h1>
        <table>
          <tr>
            <th>Dish</th>
            <th>Side</th>
            <th>Price</th>
          </tr>

          {cart.OrderList.map((order) => (
            <tr>
              <td key={order.id}>{order.main?.title}</td>
              <td key={order.id}>{order.sides.title}</td>
              <td key={order.id}>{order.main?.price}</td>
              <button onClick={onDelete}>Remove</button>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <h2>Total price: £{CalculateCostCart(cart)} </h2>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <Link to={"/main"}>
              <button>Back</button>
            </Link>
          </tr>
        </table>
      </div>
    </>
  );
};

export default CartComponent;
