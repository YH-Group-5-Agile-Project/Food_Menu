import { useEffect, useState } from "react";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import { styled } from "styled-components";
import { CheckoutCommentComponent } from "./CheckoutCommentComponent";

export const CheckoutComponent = () => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  }); // Load

  const [onClick, setOnClick] = useState(false);

  useEffect(() => {
    setCart(GetCart());
  }, []); // render only first time

  const onComment = (orderId: number) => {}

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

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.OrderList.map((order) => (
            <tr key={order.id}>
              <td>
                {order.main?.title && order.sides?.title
                  ? `${order.main.title} and ${order.sides.title}`
                  : order.sides?.title || order.drink?.name || "-"}
                  {"my comment" + " " + order.comment}
              </td>
              <td>£{order.OrderCost}</td>
              <td>
                <button onClick={() => setOnClick(true)}>Customize</button>
                {onClick && <CheckoutCommentComponent cart={cart} setCart={setCart}/>}
              </td>
              <td>                
                <button onClick={() => onDelete(order.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <PricePayContainer>
        <h2>Total price: £{CalculateCostCart(cart)}</h2>
        <button>Place order</button>
      </PricePayContainer>
    </>
  );
};

export default CheckoutComponent;

const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    /* text-align: left; */
    border-bottom: 1px solid lightgray;
  }

  th:nth-child(1),
  td:nth-child(1) {
    text-align: left;
    width: 80%;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    text-align: center;
  }
`;
