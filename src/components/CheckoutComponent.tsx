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
    <CheckoutContainer>
      <table>
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
                <StyledButton onClick={() => toggleCustomizeOrder(order.id)}>
                  Customize
                </StyledButton>
                {customizeOrderId.includes(order.id) && (
                  <CheckoutCommentComponent
                    cart={cart}
                    setCart={setCart}
                    orderId={order.id}
                  />
                )}
                <StyledButton onClick={() => onDelete(order.id)}>
                  Remove
                </StyledButton>
              </ActionCell>
            </OrderRow>
          ))}
        </tbody>
      </table>
      <PricePayContainer>
        <h3>Total price: £{CalculateCostCart(cart)}</h3>
        <button>Place order</button>
      </PricePayContainer>
    </CheckoutContainer>
  );
};

export default CheckoutComponent;

const CheckoutContainer = styled.div`
  width: 900px;

  @media (max-width: 949px) {
    width: 500px;
  }

  @media (max-width: 549px) {
    width: 360px;
  }
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: right;
`;

const StyledButton = styled.button`
  margin: 0px 10px;
`;

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

    ${ActionCell} {
      justify-content: center;
    }
  }
`;

const ProductCell = styled.div`
  display: flex;
  justify-content: left;
  font-weight: bold;
`;

const PriceCell = styled.div`
  text-align: right;
  @media (max-width: 949px) {
    text-align: left;
  }
`;

const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: lightgray;
  border-radius: 20px;
`;
