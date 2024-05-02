import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { NavLink } from "react-router-dom"
import { Cart } from "../Models/Cart"
import { ResetCart } from "../services/CartService"
import { BottomContainer, CheckoutContainer, ContentContainer, NoBulletLi, PricePayContainer, StyledList } from "../components/Checkout/CheckoutComponent"
import { TextBox } from "../components/Rain/TextBox"
import { GiFrenchFries, GiHamburger } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"

const OrderConfirmationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // set to false to stop the raining
  const [isRaining, setIsRaining] = useState<boolean>(true)

  const { OrderList = [], TotalCost = 0 }: Omit<Cart, "id"> = location.state ?? {}

  useEffect(() => {
    if (location.state === null) navigate("/")
    ResetCart()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsRaining(false)
    }, 8000)
  })

  return (
    <>
      {isRaining ? (
        <FullContainer>
          <TextBox />
        </FullContainer>
      ) : (
        <Container>
          <Nav>
            <h2>Thank you for your order</h2>
            <StyledNavLink to="/">Home</StyledNavLink>
          </Nav>
          <ContentContainer>
            <table>
              <tbody>
                {OrderList.map((order) => (
                  <OrderRow key={order.id}>
                    <ProductCell>
                      <StyledList>
                      {order.main?.title && <NoBulletLi>
                        <GiHamburger style={{marginRight: '20px', fontSize: '1.7rem'}} />{order.main.title}
                      </NoBulletLi>}
                      {order.sides?.title && <NoBulletLi>
                        <GiFrenchFries style={{marginRight: '20px', fontSize: '1.9rem'}}/>{order.sides.title}
                      </NoBulletLi>}
                      {order.drink?.name && <NoBulletLi>
                        <BiDrink style={{marginRight: '20px', fontSize: '1.7rem'}}/>{order.drink.name}
                      </NoBulletLi>}
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
      )}
    </>
  )
}

const OrderRow = styled.tr`
  display: table-row;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
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

const ProductCell = styled.td`
  display: table-cell;
  justify-content: left;
  flex-direction: column;
  font-weight: normal;
`

const PriceCell = styled.td`
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
const Container = styled(CheckoutContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
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
