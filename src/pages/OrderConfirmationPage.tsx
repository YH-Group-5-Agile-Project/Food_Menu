import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalculateCostCart, GetCart, ResetCart } from "../services/CartService";
import { Cart } from "../Models/Cart";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";



const OrderConfirmationPage = () => {

  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  }); // Load
  
  const navigate = useNavigate();

  // reset localstorage cart when cart is loaded
  useEffect(() => {
    if(cart.OrderList.length > 0){
        ResetCart();
    }

}, [cart]);

// check if cart is empty, if so navigate to homepage, else set cart for page
useEffect(() => {
    const loadedCart = GetCart();
    if(loadedCart.OrderList.length < 1)
        navigate("/");

    setCart(loadedCart);
  }, []);


  return (
    <Container>
        <Nav>
            <h2>Thank you for your order</h2>
            <StyledNavLink to="/">Home</StyledNavLink>
        </Nav>
      <StyledTable>
        <thead>
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
              <td>{order.OrderCost} SEK</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <PricePayContainer>
          <h1>Total price: {CalculateCostCart(cart)} SEK</h1>
    </PricePayContainer>

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
const Container = styled.div`
    display: flex;
    flex-direction: column;
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
  width: 100%;
  align-items: center;
  /* flex-wrap: wrap; */
  justify-content: flex-end;
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


export default OrderConfirmationPage;