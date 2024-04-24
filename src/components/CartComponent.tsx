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
          <tbody>
            {cart.OrderList.map((order) => (
              <OrderRow key={order.id}>
                <ProductCell>
                  <StyledList>
                    {order.main?.title && <li>{order.main.title}</li>}
                    {order.sides?.title && <li>{order.sides.title}</li>}
                    {order.drink?.name && <li>{order.drink.name}</li>}
                    {order?.comment && (<p>Comment: {order.comment}</p> )}    
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
      {cart.OrderList.length > 0 &&
        <PricePayContainer>
          <h1>Total price: {CalculateCostCart(cart)} SEK</h1>
        </PricePayContainer>
      }
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

const StyledTable = styled.table`
  width: 100%;
`

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

const OrderRow = styled.div`
  display: grid;
  
  grid-template-columns: 4fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 949px) {
    grid-template-columns: 1fr;
    text-align: left;

  }
`;

const ProductCell = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-weight: bold;
`;

const PriceCell = styled.div`
  text-align: right;
  @media (max-width: 949px) {
    text-align: left;
    margin-left: 30px;
  }
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: right;
`;

const StyledButton = styled.button`
  margin: 0px 10px;
`;


const StyledList = styled.ul`
  margin-bottom: 0px;
  li {
    margin: 5px;
  }
  p{
    margin: 0px;
  }
`;

const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 20px;
  // background-color: var(--fifthColor);
  border-radius: 20px;
`;