import { useEffect, useState } from "react"
import { Cart } from "../../Models/Cart"
import { CalculateCostCart, GetCart } from "../../services/CartService"
import styles from "./CartComponent.module.css"
import { styled } from "styled-components"
import { NavLink } from "react-router-dom"
import {
  ActionCell,
  ContentContainer,
  OrderRow,
  PriceCell,
  PricePayContainer,
  ProductCell,
  ButtonWrapper,
  StyledList,
} from "../Checkout/CheckoutComponent"

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
      <CartContainer className={styles.PopUpOrder}>
        <ContentContainer>
          <CartHeader>My order</CartHeader>
          {cart.OrderList.length<1 && <EmptyHeader>Your order is empty</EmptyHeader>}
          <StyledTable>
            <tbody>
              {cart.OrderList.map((order) => (
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
                  <ActionCell>
                    <ButtonWrapper>
                    <button onClick={() => onDelete(order.id)}>Remove</button>
                    </ButtonWrapper>
                  </ActionCell>
                </OrderRow>
              ))}
            </tbody>
          </StyledTable>
        </ContentContainer>
        <BottomContainer>
          {cart.OrderList.length > 0 && (
            <PricePayContainer>
              <PriceHeader>Total price: {CalculateCostCart(cart)} SEK</PriceHeader>
            </PricePayContainer>
          )}
          <ButtonContainer>
            <button onClick={() => onEmpty()}>Empty Order</button>
            <button onClick={props.CloseClick}>Close</button>
            <button>
              <StyledNavLink to={"/checkout"} onClick={props.CloseClick}>
                Go to checkout
              </StyledNavLink>
            </button>
          </ButtonContainer>
        </BottomContainer>
      </CartContainer>
    </>
  )
}

export default CartComponent

const PriceHeader = styled.h1`
  margin: 15px;
`
const EmptyHeader = styled.h2`
  margin: 15px;
`

const CartHeader = styled.h1`
  margin: 15px;
`
const CartContainer = styled.div`

`

const BottomContainer = styled.div``

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