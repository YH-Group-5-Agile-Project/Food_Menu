import { Link } from "react-router-dom"
import { Cart } from "../Models/Cart"
import { SaveCart } from "../services/CartService"
import { styled } from "styled-components"

const HomePage = () => {
    // Initialize a Cart
    const storedCart = localStorage.getItem("cart")
    if (!storedCart) {
        // if storedCart is null -> create
        let cart: Cart = {
            id: 1,
            OrderList: [],
            TotalCost: 0,
        }
        SaveCart(cart)
    }
    console.log(location.pathname)

    return (
        <HomeDiv>
            <h1>
                COCKTAILS<br></br>AND FOOD
            </h1>
            <Link to="/main">
                <button>New order</button>
            </Link>
        </HomeDiv>
    )
}

export default HomePage

const HomeDiv = styled.div`
    align-self: center;
`
