import styled from "styled-components"
import { DrinkQuery } from "../../services/DbService"
import { Drink } from "../../Models/Drink"

interface DrinkComponentProps {
  drinkId: string
  sendToCart: (drink?: Drink) => void
}

const DrinkComponentAlt = ({ drinkId, sendToCart }: DrinkComponentProps) => {
  const { data, isLoading, error } = DrinkQuery(drinkId)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <DrinkContainer>
      <ImageContainer>
        <DrinkImage src={data?.imgUrl} alt={data?.name} />
        <TitleOverlay>{data?.name}</TitleOverlay>
      </ImageContainer>
      <TextContainer>
        <DrinkDescription>
         {data?.alcoholic ? "" : "Non-alcholic."}
         <br/>
         {data?.ingredients.join(", ")}.
        </DrinkDescription>
        <button onClick={() => sendToCart(data)}> Add to menu</button>
      </TextContainer>
    </DrinkContainer>
  )
}

const TextContainer = styled.div`
display: flex;
width: 65%;
flex-direction: column;
align-items: center;
`

const DrinkDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 10px;
  margin-bottom: 40px;
`
const DrinkContainer = styled.div`
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  z-index: 2;
  margin: 1rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 220px;
  height: 220px;

  @media (max-width: 849px) {
    width: 130px;
    height: 130px;
  }
`

const DrinkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--sixthColor);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: 16px;

  @media (max-width: 949px) {
    font-size: 14px;
  }
`

export default DrinkComponentAlt
