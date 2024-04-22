import { useEffect, useState } from "react";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";;
import styles from "./CartComponent.module.css";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

interface CloseProp {
  CloseClick: () => void;
}

export const CartComponent = (props: CloseProp) => {
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

  const onEmpty = () => {
    const updatedCart = {
        ...cart,
        OrderList: [],
        TotalCost: 0, 
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Order Emptied");
};

  const handleClose = () => {
    setShowCart(false); // Close the cart component
  };

  return (
    <>
      <div className={styles.PopUpOrder}>
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
                  {order.main?.title && order.sides?.title && !order.drink
                    ? `${order.main.title} and ${order.sides.title}`
                    : order.main?.title && order.sides?.title && order.drink 
                    ? `${order.main.title} and ${order.sides.title} and ${order.drink.name}`
                    : order.sides?.title || order.drink?.name || "-"}
                    {order?.comment && (
                      <p>Comment: <br />
                        {order.comment}
                      </p>                    
                    )}
                </td>
                <td>{order.OrderCost} SEK</td>
                
                <td>                
                  <button onClick={() => onDelete(order.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <ButtonContainer>
          <button onClick={() => onEmpty()}>Empty Order</button> 
          <button onClick={props.CloseClick}>Close</button>
          <button><StyledNavLink to={'/checkout'} onClick={props.CloseClick}>Go to checkout</StyledNavLink></button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default CartComponent;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`


const StyledTable = styled.div`
  padding: 20px;
  width: 880px;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--sixthColor);
    p{
       word-wrap: break-word;
       width: 300px;
       white-space: pre-wrap;
    }
  }

  th:nth-child(1),
  td:nth-child(1) {
    text-align: left;
    width: 100vw;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    text-align: center;
  }

  @media (max-width: 949px) {
    width: 80vw;
    gap: 20px;
  }

  @media (max-width: 549px) {
    width: 90vw;
    gap: 10px;
  }
`