import { SubmitHandler, useForm } from "react-hook-form";
import { Cart } from "../Models/Cart";

type CommentFormType = {
    id: number;
    comment: string;
}
export const CheckoutCommentComponent = ( {cart, setCart} ) => {
    const {register, handleSubmit, setError, formState: {errors} } = useForm<CommentFormType>();
    const onSubmit: SubmitHandler<CommentFormType> = (data) => {
        console.log("Hello world!", data.comment)
        setCart({...cart, comment: data.comment})
        console.log(cart.OrderList[0].comment);
    };    
    
    //setItems({...item, name: event.target.value})
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("comment")}></input>
            <input type="submit" value={"submit"}/>
        </form>
    );
}