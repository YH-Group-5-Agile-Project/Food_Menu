import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import { CheckoutCommentComponent } from "./CheckoutCommentComponent";
import { NavLink } from "react-router-dom";


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
    <CheckoutContainer>
      <table>
        <tbody>
          {cart.OrderList.map((order) => (
            <OrderRow key={order.id}>
              <ProductCell>
              {(order.main && order.sides && !order.drink)
                    ? `${order.main.title} with ${order.sides.title}`
                    : (order.main && order.drink && !order.sides) 
                    ? `${order.main.title} with no side order and a ${order.drink.name} to drink`
                    : (order.main?.title && order.sides?.title && order.drink) 
                    ? `${order.main.title} and ${order.sides.title} and ${order.drink.name}`
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
      
      {cart.OrderList.length > 0 &&
        <PricePayContainer>
          <h1>Total price: £{CalculateCostCart(cart)}</h1>
          <StyledNavLink to="/orderconfirmation" onClick={(e) => placeOrder(e)} >Place order</StyledNavLink>
        </PricePayContainer>
      }
    </CheckoutContainer>
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
  // background-color: var(--fifthColor);
  border-radius: 20px;
`;
