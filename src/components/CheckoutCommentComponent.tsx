import { SubmitHandler, useForm } from "react-hook-form";
import { Cart } from "../Models/Cart";

type CommentFormType = {
    id: number;
    comment: string;
}

type Props = {
    cart: Cart; 
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    orderId: number;
}

export const CheckoutCommentComponent = ( {cart, setCart, orderId}: Props ) => {
    const {register, handleSubmit, setError, formState: {errors} } = useForm<CommentFormType>();
    const onSubmit: SubmitHandler<CommentFormType> = (data) => {
        
        const updatedOrderList = cart.OrderList.map(order => {
            if (order.id === orderId)
                return {...order, comment: data.comment}
            else
                return order;
        })

        setCart(prev => ({
            ...prev, OrderList: updatedOrderList
        }))
    };    
    
    //setItems({...item, name: event.target.value})
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("comment")}
                defaultValue={cart.OrderList.find(order => order.id === orderId)?.comment || ""}
                maxLength={100}
                rows = {5}
            />
            <input type="submit" value={"submit"}/>
        </form>
    );
}