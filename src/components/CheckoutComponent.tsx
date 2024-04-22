import { useEffect, useState } from "react";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import { styled } from "styled-components";
import { CheckoutCommentComponent } from "./CheckoutCommentComponent";
import { NavLink } from "react-router-dom";


export const CheckoutComponent = () => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  }); // Load

  const [customizeOrderId, setCustomizeOrderId] = useState <number[]>([]);

  useEffect(() => {
    setCart(GetCart());

  }, []); 

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

  const placeOrder = (e:  React.MouseEvent) => {
    // check if cart exists
    if (cart.OrderList.length < 1 || CalculateCostCart(cart) < 1){
      console.log(cart);
      console.log(cart.OrderList.length)
      console.log(CalculateCostCart(cart))
      console.log("No Items in cart");
      e.preventDefault();
    }
  }

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
                  {order?.comment && (
                    <p>Comment: <br />
                      {order.comment}
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
      
      {cart.OrderList.length > 0 &&
        <PricePayContainer>
          <h2>Total price: £{CalculateCostCart(cart)}</h2>
          <StyledNavLink to="/orderconfirmation" onClick={(e) => placeOrder(e)} >Place order</StyledNavLink>
        </PricePayContainer>
      }
    </>
  );
};

export default CheckoutComponent;

const StyledNavLink = styled(NavLink)`
  color: var(--firstColor);
  border-radius: 10px;
  border: solid 2px var(--firstColor);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  background: 
    url('assets/design-assets/diamonds-are-forever.png'),
    linear-gradient(rgb(244, 255, 174),var(--fifthColor));

    &:hover {
      background: 
        url('assets/design-assets/diamonds-are-forever.png'),
        linear-gradient(rgb(200, 200, 220),var(--fifthColor));
        color: var(--firstColor)
    }
`;

const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
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
