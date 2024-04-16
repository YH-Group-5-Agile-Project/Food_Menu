import { useEffect, useState } from "react";
import { Dish } from "../Models/Dish";
import { Drink } from "../Models/Drink";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const PostQuery = (dishType: string) => {
  return useQuery({
    queryKey: [{ dishType }],
    queryFn: async () => {
      const response = await axios.get(
        `https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`
      );
      return response.data;
    },
    staleTime: 300000,
  });
};

export const DrinkQuery = (drinkId: number) => {
  return useQuery({
    queryKey: [{ drinkId }],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );a
      return response.data;
    },
    staleTime: 300000,
  });
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
