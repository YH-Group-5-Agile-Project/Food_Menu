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

  const [customizeOrderId, setCustomizeOrderId] = useState <number[]>([]);

  useEffect(() => {
    setCart(GetCart());
  }, []); // render only first time

  const toggleCustomizeOrder = (orderId: number) => {
    if (customizeOrderId.includes(orderId))
      setCustomizeOrderId(customizeOrderId.filter(id => id != orderId))
    else
      setCustomizeOrderId([...customizeOrderId, orderId])
  }

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
                {order.main?.title && <StyledList>{order.main.title}</StyledList>}
                {order.sides?.title && <StyledList>{order.sides.title}</StyledList>}
                {order.drink?.name && <StyledList>{order.drink.name}</StyledList>}
                  {order?.comment && (
                    <p>Comment: {order.comment}
                    </p>                    
                  )}
              </td>
              <td>£{order.OrderCost}</td>
              <td>
                <button onClick={() => toggleCustomizeOrder(order.id)}>Customize</button>
                {customizeOrderId.includes(order.id) && <CheckoutCommentComponent cart={cart} setCart={setCart} orderId = {order.id}/>}
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

const StyledList = styled.li`  
  margin: 5px;
`;

const StyledTable = styled.table`
  width: 880px;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    /* text-align: left; */
    border-bottom: 1px solid lightgray;
    p{
       word-wrap: break-word;
       width: 300px;
       white-space: pre-wrap;
    }
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

  @media (max-width: 949px) {
    width: 560px;
    gap: 20px;
  }

  @media (max-width: 549px) {
    width: 360px;
    gap: 10px;
  }
`;
