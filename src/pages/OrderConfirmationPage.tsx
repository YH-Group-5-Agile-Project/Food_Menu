import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { Cart } from "../Models/Cart";
import { ResetCart } from "../services/CartService";
import {
  BottomContainer,
  CheckoutContainer,
  ContentContainer,
  OrderRow,
  PriceCell,
  PricePayContainer,
  ProductCell,
  StyledList,
} from "../components/CheckoutComponent";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { OrderList = [], TotalCost = 0 }: Omit<Cart, "id"> =
    location.state ?? {};

  useEffect(() => {
    if (location.state === null) navigate("/");
    ResetCart();
  }, []);

  return (
    <Container>
      <ContentContainer>
        <Nav>
          <h2>Thank you for your order</h2>
          <StyledNavLink to="/">Home</StyledNavLink>
        </Nav>
        <table>
          <tbody>
            {OrderList.map((order) => (
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
              </OrderRow>
            ))}
          </tbody>
        </table>
      </ContentContainer>
      <BottomContainer>
        <PricePayContainer>
          <h1>Total price: {TotalCost} SEK</h1>
        </PricePayContainer>
      </BottomContainer>
    </Container>
  );
};

const Nav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
`;
const Container = styled(CheckoutContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  align-self: center;
  max-width: 75px;
  color: var(--firstColor);
  border-radius: 10px;
  border: solid 2px var(--firstColor);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  background: url("assets/design-assets/diamonds-are-forever.png"),
    linear-gradient(rgb(244, 255, 174), var(--fifthColor));

  &:hover {
    background: url("assets/design-assets/diamonds-are-forever.png"),
      linear-gradient(rgb(200, 200, 220), var(--fifthColor));
    color: var(--firstColor);
  }
`;

export default OrderConfirmationPage;
