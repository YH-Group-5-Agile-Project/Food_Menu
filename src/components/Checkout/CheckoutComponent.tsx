import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Cart } from "../../Models/Cart"
import { CalculateCostCart, GetCart } from "../../services/CartService"
import { NavLink, useNavigate } from "react-router-dom"
import { GiFrenchFries, GiHamburger } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"
import { EmptyHeader } from "../PupUps/CartComponent"
import { CheckoutCommentComponent } from "./CheckoutCommentComponent"

const CheckoutComponent = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  })
  interface ShowCommentState {
    [orderId: number]: boolean | null
  }

  const [customizeOrderId, setCustomizeOrderId] = useState<number[]>([])
  const [showComment, setShowComment] = useState<ShowCommentState>({})
  const [isAnimation, setIsAnimation] = useState<boolean>(true)

  useEffect(() => {
    setCart(GetCart())
  }, [])

  // used for pausing the animation in some rerenders
  useEffect(() => {
    setTimeout(() => {
      setIsAnimation(true)
    }, 500)
  }, [isAnimation])

  const toggleCustomizeOrder = (orderId: number) => {
    // Initialize showComment with null values for each orderId
    if (Object.keys(showComment).length < 1) {
      setShowComment((prev) => {
        cart.OrderList.forEach((order) => {
          prev[order.id] = null
        })
        return { ...prev }
      })
    }

    setShowComment((prev) => ({
      ...prev,
      [orderId]: prev[orderId] === true ? false : true,
    }))

    // Timeout so that animation can finish before switching render component
    setTimeout(() => {
      if (customizeOrderId.includes(orderId)) {
        setCustomizeOrderId(customizeOrderId.filter((id) => id !== orderId))
      } else {
        setCustomizeOrderId([...customizeOrderId, orderId])
      }
    }, 300)
  }

  const onDelete = (orderId: number) => {
    // Pause animation
    setIsAnimation(false)

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

  const placeOrder = (e: React.MouseEvent) => {
    // check if cart exists
    if (cart.OrderList.length < 1 || CalculateCostCart(cart) < 1) {
      console.log("No Items in cart")
      e.preventDefault()
    } else {
      navigate("/orderconfirmation", {
        state: {
          OrderList: cart.OrderList,
          TotalCost: CalculateCostCart(cart),
        },
      })
    }
  }

  return (
    <CheckoutContainer>
      <ContentContainer>
        {cart.OrderList.length < 1 && (
          <>
            <EmptyHeader>Your order is empty</EmptyHeader>
            <NavLink to="/main">
              <button>Start your order</button>
            </NavLink>
          </>
        )}
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
              {customizeOrderId.includes(order.id) && (
                <CommentContainer $displayed={showComment[order.id]!} $animating={isAnimation}>
                  <CheckoutCommentComponent cart={cart} setCart={setCart} orderId={order.id} toggle={() => toggleCustomizeOrder(order.id)} />
                </CommentContainer>
              )}
              {!customizeOrderId.includes(order.id) && (
                <StyledButton $displayed={showComment[order.id]!} $animating={isAnimation} onClick={() => toggleCustomizeOrder(order.id)}>
                  Comment
                </StyledButton>
              )}
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
            <PriceTotal>Total price: {CalculateCostCart(cart)} SEK</PriceTotal>
            <OrderButton onClick={(e) => placeOrder(e)}>Place order</OrderButton>
          </PricePayContainer>
        )}
      </BottomContainer>
    </CheckoutContainer>
  )
}

const OpenAnimation = keyframes`
  0% { height: 0; }
  100% { height: 5rem; }
`
const CloseAnimation = keyframes`
  0% { height: 5rem; }
  90% {opacity: 0; height: 0px; }
  100% { height: 0; opacity: 0;}
`
const ButtonTextAnimation = keyframes`
  0%{ text-indent: -300px; }
  100% { text-indent: 0px; }
`
const ButtonTextReverseAnimation = keyframes`
  0%{ text-indent: 0px }
  100% { text-indent: 300px; }
`

const StyledButton = styled.button<{ $displayed?: boolean; $animating: boolean }>`
  overflow-x: hidden;
  grid-row: 2;
  grid-column: 1/2;
  width: 6.7rem;
  animation-name: ${(props) => (props.$displayed === true ? ButtonTextReverseAnimation : props.$displayed === false ? ButtonTextAnimation : "")};
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-play-state: ${(props) => (props.$animating ? "running" : "paused")};
`
const CommentContainer = styled.div<{ $displayed?: boolean; $animating: boolean }>`
  // margin: 5px 5px 10px 10px;
  overflow-x: hidden;
  display: contents;
  button {
    grid-row: 2/2;
    grid-column: 1/2;
    width: 6.7rem;
    animation: ${(props) => (props.$displayed ? ButtonTextAnimation : ButtonTextReverseAnimation)};
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-play-state: ${(props) => (props.$animating ? "running" : "paused")};
  }
  
  textarea {
    margin-bottom: 5px;
    resize: none;
    grid-row: 1;
    grid-column: 1/3;
    width: 100%;
    animation-name: ${(props) => (props.$displayed ? OpenAnimation : CloseAnimation)};
    animation-duration: 0.5s;
    animation-play-state: ${(props) => (props.$animating ? "running" : "paused")};
  }
`

export const NoBulletLi = styled.li`
  list-style-type: none;
  padding-bottom: 1rem;
`

export default CheckoutComponent

export const ContentContainer = styled.div`
  width: 100%;
  overflow: auto;
`
export const BottomContainer = styled.div`
  width: 100%;
`

export const CheckoutContainer = styled.div`
  width: 900px;
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
export const ButtonWrapper = styled.div`
  gap: 5px;
  grid-row: 2/2;
  grid-column: 2/2;
`

export const ActionCell = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
  align-items: start;
  min-height: 80px;
  min-width: 232px;
`

export const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid var(--sixthColor);
  border-width: 90%;
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
`

export const ProductCell = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-weight: normal;
  white-space: nowrap;
  @media (max-width: 949px) {
    white-space: pre-wrap;
  }
`
export const PriceTotal = styled.h1`
  font-size: 3rem;
  @media (max-width: 949px) {
    font-size: 1.3rem;
    padding: 5px;
  }
`
export const OrderButton = styled.button`
  font-size: 1.5rem;
  @media (max-width: 949px) {
    font-size: 1.2rem;
    padding: 13px;
  }
`

export const PriceCell = styled.div`
  text-align: right;
  font-weight: bold;
  @media (max-width: 949px) {
    text-align: left;
    margin-left: 30px;
  }
`

export const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 20px;
  font-size: 18px;
  border-radius: 20px;
`

export const StyledList = styled.ul`
  font-size: large;
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