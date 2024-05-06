import { SubmitHandler, useForm } from "react-hook-form"
import { Cart } from "../../Models/Cart"
import { SaveCart } from "../../services/CartService"
import styled from "styled-components"
import { ButtonWrapper } from "./CheckoutComponent"

type CommentFormType = {
  id: number
  comment: string
}

type Props = {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  orderId: number
  toggle: () => void
}

export const CheckoutCommentComponent = ({ toggle, cart, setCart, orderId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormType>()
  const onSubmit: SubmitHandler<CommentFormType> = (data) => {
    // Update Comment in Order
    toggle()
    const updatedOrderList = cart.OrderList.map((order) => {
      if (order.id === orderId) return { ...order, comment: data.comment }
      else return order
    })

    // Update Cart in useState and localstorage
    const updatedCart = { ...cart, OrderList: updatedOrderList }
    setCart(updatedCart)
    SaveCart(updatedCart)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("comment", {
            maxLength: {
              value: 100,
              message: "Comment must be less than 100 characters",
            },
            validate: (value) => value.split("\n").length <= 5 || "Comment must be less than 5 rows",
          })}
          defaultValue={cart.OrderList.find((order) => order.id === orderId)?.comment || ""}
        />
        {errors.comment && <p>{errors.comment.message}</p>}
        <button type="submit" value={"Submit"}>
          Submit
        </button>
    </FormContainer>
  )
}



const FormContainer = styled.form`
  display: contents;
`
