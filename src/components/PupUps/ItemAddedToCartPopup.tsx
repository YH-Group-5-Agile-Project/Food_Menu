import styled from "styled-components"
import DecorationLineImage from "../../assets/design-assets/DecorationLine.png"
import Texture from "../../assets/design-assets/climpek.png"

export const ItemAddedToCartPopup = () => {
  return (
    <>
      <PopupContainer>
        <BreakLine src={DecorationLineImage} />
        <AddedToCartPopup>
          <h2>Added to order.</h2>
        </AddedToCartPopup>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  background-color: var(--fifthColor);
  background-image: url(${Texture});
  border-radius: 20px;
  padding: 10px;
  border: solid 2px goldenrod;
`

const AddedToCartPopup = styled.div``