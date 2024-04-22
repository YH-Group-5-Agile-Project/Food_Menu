import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import { CheckoutCommentComponent } from "./CheckoutCommentComponent";

const CheckoutComponent = () => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  });

  const [customizeOrderId, setCustomizeOrderId] = useState<number[]>([]);

  useEffect(() => {
    setCart(GetCart());
  }, []);

  const toggleCustomizeOrder = (orderId: number) => {
    if (customizeOrderId.includes(orderId)) {
      setCustomizeOrderId(customizeOrderId.filter((id) => id !== orderId));
    } else {
      setCustomizeOrderId([...customizeOrderId, orderId]);
    }
  };

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
  };

  return (
    <>
      <StyledTable>
        <tbody>
          {cart.OrderList.map((order) => (
            <OrderRow key={order.id}>
              <ProductCell>
                {order.main?.title && order.sides?.title
                  ? `${order.main.title} and ${order.sides.title}`
                  : order.sides?.title || order.drink?.name || "-"}
              </ProductCell>
              <PriceCell>{`£${order.OrderCost}`}</PriceCell>
              <ActionCell>
                <button onClick={() => toggleCustomizeOrder(order.id)}>
                  Customize
                </button>
                {customizeOrderId.includes(order.id) && (
                  <CheckoutCommentComponent
                    cart={cart}
                    setCart={setCart}
                    orderId={order.id}
                  />
                )}
                <button onClick={() => onDelete(order.id)}>Remove</button>
              </ActionCell>
            </OrderRow>
          ))}
        </tbody>
      </StyledTable>
      <PricePayContainer>
        <h3>Total price: £{CalculateCostCart(cart)}</h3>
        <button>Place order</button>
      </PricePayContainer>
    </>
  );
};

export default CheckoutComponent;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: space-evenly;

  /* @media (max-width: 670px) {
    order: 2;
  } */
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 670px) {
    grid-template-columns: 1fr;
    text-align: left;

    /* & > div {
      margin-bottom: 5px;
    } */

    ${ActionCell} {
      justify-content: center;
    }
  }
`;

const ProductCell = styled.div`
  font-weight: bold;
  /* @media (max-width: 670px) {
    order: -1;
  } */
`;

const PriceCell = styled.div`
  text-align: right;
  @media (max-width: 670px) {
    text-align: left;
  }
`;

const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #b9b9b9;
  border-radius: 8px;
`;
