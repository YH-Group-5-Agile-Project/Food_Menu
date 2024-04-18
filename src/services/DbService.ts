import { useEffect, useState } from "react";
import { Dish } from "../Models/Dish";
import { Drink } from "../Models/Drink";
import { useQuery } from "@tanstack/react-query";

export const PostQuery = (dishType: string) => {
  return useQuery({
    queryKey: [{ dishType }],
    queryFn: () => {
      return fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    },
    staleTime: 300000,
  });
};

export const DrinkQuery = (drinkId: string) => {
  return useQuery<Drink>({
    queryKey: [{ drinkId }],
    queryFn: async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return NewMapDrink(data);
    },
    staleTime: 300000,
  });
};

const NewMapDrink = (data: any): Drink => {
  const drinkData = data.drinks[0];
  return {
    id: drinkData.idDrink,
    name: drinkData.strDrink,
    alcoholic: drinkData.strAlcoholic === "Alcoholic" ? true : false,
    imgUrl: drinkData.strDrinkThumb,
    ingredients: [
      drinkData.strIngredient1,
      drinkData.strIngredient2,
      drinkData.strIngredient3,
      drinkData.strIngredient4,
    ].filter(Boolean),
    price: 94,
  };
};

//GetDishes ska tas bort när allt är konverterat och funkar med PostQuery, ANVÄND INTE GETDISHES FÖR NYA SAKER ENDAST POSTQUERY
export const GetDishes = (dishType: string) => {
  const [dish, setDish] = useState<Dish[]>();
  useEffect(() => {
    fetch(
      `https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDish(data);
      });
  }, []);
  return dish;
};

//GetDrink ska tas bort när allt är konverterat och funkar med PostQuery, ANVÄND INTE GETDRINK FÖR NYA SAKER ENDAST POSTQUERY

export const GetDrink = (id: string) => {
  const [drink, setDrink] = useState<Drink | null>(null);

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
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
