import { useEffect, useState } from "react"
import { Cart } from "../../Models/Cart"
import { CalculateCostCart, GetCart } from "../../services/CartService"
import { styled } from "styled-components"
import { NavLink } from "react-router-dom"
import { ContentContainer, PricePayContainer, ButtonWrapper, NoBulletLi } from "../Checkout/CheckoutComponent"
import { GiFrenchFries, GiHamburger } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"

interface CloseProp {
  CloseClick: () => void
}

export const CartComponent = (props: CloseProp) => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  })

  useEffect(() => {
    setCart(GetCart())
  }, [])

  const onDelete = (orderId: number) => {
    const updatedOrderList = cart.OrderList.filter((order) => order.id !== orderId)

    const updatedCart = {
      ...cart,
      OrderList: updatedOrderList,
      TotalCost: CalculateCostCart({ ...cart, OrderList: updatedOrderList }),
    }

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("Order removed", orderId)
  }

  const onEmpty = () => {
    const updatedCart = {
      ...cart,
      OrderList: [],
      TotalCost: 0,
    }
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("Order Emptied")
  }

  return (
    <>
      <CartContainer>
        <ContentContainer>
          <CartHeader>My order</CartHeader>
          {cart.OrderList.length < 1 && <EmptyHeader>Your order is empty</EmptyHeader>}
              {cart.OrderList.map((order) => (
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
                  <ActionCell>
                    <ButtonWrapper>
                      <button onClick={() => onDelete(order.id)}>Remove</button>
                    </ButtonWrapper>
                  </ActionCell>
                </OrderRow>
              ))}
        </ContentContainer>
        <BottomContainer>
          {cart.OrderList.length > 0 && (
            <PricePayContainer>
              <PriceHeader>Total price: {CalculateCostCart(cart)} SEK</PriceHeader>
            </PricePayContainer>
          )}
          {cart.OrderList.length < 1 ? (
            <NavLink to="/main" onClick={props.CloseClick}>
              <button>Start your order</button>
            </NavLink>
          ) : (
            <ButtonContainer>
              <ContainedButton onClick={() => onEmpty()}>Empty Order</ContainedButton>
              <ContainedButton onClick={props.CloseClick}>Close</ContainedButton>
              <ContainedButton>
                <StyledNavLink to={"/checkout"} onClick={props.CloseClick}>
                  Go to checkout
                </StyledNavLink>
              </ContainedButton>
            </ButtonContainer>
          )}
        </BottomContainer>
      </CartContainer>
    </>
  )
}

export default CartComponent

const ProductCell = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-weight: normal;
`

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
export const StyledList = styled.ul`
  font-size: medium;
  margin-bottom: 0px;
  li {
    margin-bottom: 5px;
    @media (max-width: 949px) {
      margin-bottom: 20px;
    }
  }
  p {
    margin: 0px;
  }
`

const PriceCell = styled.div`
  text-align: right;
  font-weight: bold;
  @media (max-width: 949px) {
    text-align: left;
    margin-left: 30px;
  }
`

const ActionCell = styled.div`
  display: flex;
  justify-content: right;

  @media (max-width: 949px) {
    justify-content: center;
  }
`
export const PriceTotal = styled.h1``
const PriceHeader = styled.h1`
  margin: 15px;
  font-size: 3.3rem;
  @media (max-width: 949px) {
    font-size: 1.4rem;
  }
`

const ContainedButton = styled.button`
  @media (max-width: 949px) {
    font-size: 1.1rem;
  }
`
export const EmptyHeader = styled.h2`
  margin: 15px;
`

const CartHeader = styled.h1`
  margin: 15px;
`
const CartContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
position: fixed;
top: 2%;
left: 50%;
transform: translateX(-50%);
font-size: 18px;
width: 100%;
max-width: 50rem;
height: 90%;
border: 1px solid black;
border-radius: 20px;
background-image: url('src/assets/design-assets/climpek.png');
background-color: var(--firstColor);
z-index: 999;
color: var(--sixthColor);
overflow: scroll;
padding: 20px;

@media (max-width: 949px) {
  width: 80%;
}
@media (max-width: 609px) {
  width: 95%;
}
`

const BottomContainer = styled.div``

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