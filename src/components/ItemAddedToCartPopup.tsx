import styled from "styled-components";
import DecorationLineImage from '../assets/design-assets/DecorationLine.png';
import Texture from '../assets/design-assets/climpek.png'

interface PopUpProps {
  Item: string;
}
export const ItemAddedToCartPopup = ({ Item }: PopUpProps) => {

  return (
    <>
      <PopupContainer><BreakLine src={DecorationLineImage} />

        <AddedToCartPopup><h2>{Item} was added to cart</h2></AddedToCartPopup>
      </PopupContainer>
    </>

  )

}



const BreakLine = styled.img`
  width: 95%;
  object-fit: cover;
  height: 55px;
`
const PopupContainer = styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  z-index: 6;
  background-color: var(--fifthColor);
  background-image: url(${Texture});
  border-radius: 20px;
  padding: 10px;
  border: solid 2px goldenrod;
`;
const AddedToCartPopup = styled.div`
`