import { Drink } from "../Models/Drink";
import styled from "styled-components";
import { SendDrinkToCart } from "../services/CartService";

const DrinkComponent = ({ drink }: { drink: Drink | null }) => {
  if (!drink) {
    return null;
  }

  const handleAddToCartClick = () => {
    SendDrinkToCart(drink);
  };

  const ingredientsList = drink.ingredients.map((ingredient) => ingredient);
  let ingredients;
  if (ingredientsList.length > 1) {
    ingredients =
      ingredientsList.slice(0, -1).join(", ") +
      " and " +
      ingredientsList.slice(-1);
  } else {
    ingredients = ingredientsList[0] || "";
  }
  //Meningsubyggaren återanvänds nästan ofärändrad från DishComponent. Bör nog modifieras och flyttas till en separat fil så att den kan användas för båda?

  return (
    <DrinkContainer key={drink.id}>
      <ImageContainer src={drink.imgUrl} alt={drink.name} />
      <InfoContainer>
        <h1>{drink.name}</h1>
        <TextContainer>
          <p> {ingredients}.</p>
          {drink.alcoholic === false && <p>&nbsp;Non-Alcholic.</p>}
        </TextContainer>
        <DrinkPrice>£{drink.price}</DrinkPrice>

        <CartButton onClick={handleAddToCartClick}>Add to cart</CartButton>
      </InfoContainer>
    </DrinkContainer>
  );
};

export default DrinkComponent;

const DrinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

const ImageContainer = styled.img`
  position: relative;
  border-radius: 40px;
  padding: 20px;
  width: 250px;
  height: 250px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;
const TextContainer = styled.div`
  display: flex;
`;
const CartButton = styled.button`
  position: relative;
  width: fit-content;
  margin-top: px;
`;
const DrinkPrice = styled.h2`
  display: flex;
`;
