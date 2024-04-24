import { useEffect, useState } from "react";
import { Drink } from "../Models/Drink";

export const GetDrink = (id: string) => {
  const [drink, setDrink] = useState<Drink | null>(null);

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const drinksArray = await response.json();
        let newDrink = mapDrink(drinksArray.drinks[0]);
        setDrink(newDrink);
      } catch (error) {
        console.error("Couldn't get drink", error);
      }
    };
    fetchDrink();
  }, []);
  return drink;
};
const mapDrink = (oldDrink: any): Drink => {
  const newIngredients: string[] = [];

  for (let i = 1; i < 16; i++) {
    const ingredient = oldDrink[`strIngredient${i}`];
    if (ingredient) {
      newIngredients.push(ingredient);
    } else {
      break;
    }
  }

  return {
    id: oldDrink.idDrink,
    name: oldDrink.strDrink,
    alcoholic: oldDrink.strAlcoholic === "Alcoholic" ? true : false,
    imgUrl: oldDrink.strDrinkThumb,
    ingredients: newIngredients,
    price: oldDrink.price,
  };
};
