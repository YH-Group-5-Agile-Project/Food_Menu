import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { NavLink } from "react-router-dom"
import { Cart } from "../Models/Cart"
import { ResetCart } from "../services/CartService"
import { BottomContainer, ContentContainer, NoBulletLi, PricePayContainer, StyledList } from "../components/Checkout/CheckoutComponent"
import { Animation } from "../components/confirmationAnimation/Animation"
import { GiFrenchFries, GiHamburger } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"

const OrderConfirmationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // set to false to stop the raining
  const [isAnimating, setIsAnimating] = useState<boolean>(true)

  const { OrderList = [], TotalCost = 0 }: Omit<Cart, "id"> = location.state ?? {}

  useEffect(() => {
    if (location.state === null) navigate("/")
    ResetCart()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  })

  return (
    <>
      {isAnimating ? (
        <FullContainer>
          <Animation />
        </FullContainer>
      ) : (
        <ComfirmationContainer>
          <Nav>
            <h2>Thank you for your order</h2>
            <StyledNavLink to="/">Home</StyledNavLink>
          </Nav>
          <ContentContainer>
          {OrderList.map((order) => (
          <OrderRow key={order.id}>
            <ProductCell>
              <StyledList>
                {order.main?.title && (
                  <NoBulletLi>
                    <GiHamburger style={{ marginRight: "20px", fontSize: "1.7rem" }} />
                    {order.main.title}
                  </NoBulletLi>
                )}
                {order.sides?.title && (
                  <NoBulletLi>
                    <GiFrenchFries style={{ marginRight: "20px", fontSize: "1.9rem" }} />
                    {order.sides.title}
                  </NoBulletLi>
                )}
                {order.drink?.name && (
                  <NoBulletLi>
                    <BiDrink style={{ marginRight: "20px", fontSize: "1.7rem" }} />
                    {order.drink.name}
                  </NoBulletLi>
                )}
                {order?.comment && <p>Comment: {order.comment}</p>}
              </StyledList>
            </ProductCell>
            <PriceCell>{`${order.OrderCost} SEK`}</PriceCell>
                  </OrderRow>
                ))}
          </ContentContainer>
          <BottomContainer>
            <PricePayContainer>
              <h1>Total price: {TotalCost} SEK</h1>
            </PricePayContainer>
          </BottomContainer>
        </ComfirmationContainer>
      )}
    </>
  )
}

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  /* padding: 10px; */
  border-bottom: 1px solid var(--sixthColor);
  border-width: 90%;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 949px) {
    grid-template-columns: 1fr;
    text-align: left;
  }
`

const ProductCell = styled.div`
  display: table-cell;
  justify-content: left;
  flex-direction: column;
  font-weight: normal;
`

const PriceCell = styled.div`
  text-align: right;
  font-weight: bold;
  @media (max-width: 949px) {
    text-align: left;
    margin-left: 30px;
  }
`

const FullContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
const Nav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
`
const ComfirmationContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow-x: auto;
padding-right: 20px;
height: 90%;

@media (max-width: 949px) {
  width: 500px;
}

@media (max-width: 549px) {
  width: 360px;
}
`
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
  background: url("assets/design-assets/diamonds-are-forever.png"), linear-gradient(rgb(244, 255, 174), var(--fifthColor));

  &:hover {
    background: url("assets/design-assets/diamonds-are-forever.png"), linear-gradient(rgb(200, 200, 220), var(--fifthColor));
    color: var(--firstColor);
  }
`

export default OrderConfirmationPage
