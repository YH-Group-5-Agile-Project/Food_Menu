import styled from "styled-components";
import { MainDish } from "../Models/MainDish";

  interface AddToCartPopupProps {
    dish: MainDish;
    onClose: () => void;
  }

export function AddToCartPopup({dish, onClose}: AddToCartPopupProps) {
        /* const [quantity, setQuantity] = useState(1);
      
        const handleQuantityChange = (event) => {
          setQuantity(parseInt(event.target.value));
        };
      
        const handleAddToCart = () => {
          // Add item to cart logic (using your cart state management approach)
          console.log(`Adding ${quantity} of ${foodItem.name} to cart`);
          onClose(); // Close the popup
        }; */
       
        return (
            <>
            <a onClick={onClose}><Overlay/></a>
            <PopupContainer className="add-to-cart-popup">
                <h2>Add {} to Cart</h2>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" />
        {/*         <button onClick={}>Add to Cart</button>
                <button onClick={}>Close</button> */}
            </PopupContainer>
            </>
        );
}

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 70%;
`
const PopupContainer = styled.div`
    position: absolute;
    width: 30rem;
    height: 30rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    background-color: blue;
`


