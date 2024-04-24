import { useEffect, useState } from "react";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import styles from "./CartComponent.module.css";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import {
  ActionCell,
  OrderRow,
  PriceCell,
  PricePayContainer,
  ProductCell,
  StyledButton,
  StyledList,
} from "./CheckoutComponent";

interface CloseProp {
  CloseClick: () => void;
}

export const CartComponent = (props: CloseProp) => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  });

  useEffect(() => {
    setCart(GetCart());
  }, []);

  const onDelete = (orderId: number) => {
    const updatedOrderList = cart.OrderList.filter(
      (order) => order.id !== orderId,
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

  return (
    <>
      <div className={styles.PopUpOrder}>
        <StyledTable>
          <tbody>
            {cart.OrderList.map((order) => (
              <OrderRow key={order.id}>
                <ProductCell>
                  <StyledList>
                    {order.main?.title && <li>{order.main.title}</li>}
                    {order.sides?.title && <li>{order.sides.title}</li>}
                    {order.drink?.name && <li>{order.drink.name}</li>}
                    {order?.comment && <p>Comment: {order.comment}</p>}
                  </StyledList>
                </ProductCell>
                <PriceCell>{`${order.OrderCost} SEK`}</PriceCell>
                <ActionCell>
                  <StyledButton onClick={() => onDelete(order.id)}>
                    Remove
                  </StyledButton>
                </ActionCell>
              </OrderRow>
            ))}
          </tbody>
        </StyledTable>
        {cart.OrderList.length > 0 && (
          <PricePayContainer>
            <h1>Total price: {CalculateCostCart(cart)} SEK</h1>
          </PricePayContainer>
        )}
        <ButtonContainer>
          <button onClick={() => onEmpty()}>Empty Order</button>
          <button onClick={props.CloseClick}>Close</button>
          <button>
            <StyledNavLink to={"/checkout"} onClick={props.CloseClick}>
              Go to checkout
            </StyledNavLink>
          </button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default CartComponent;

const StyledTable = styled.table`
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;
