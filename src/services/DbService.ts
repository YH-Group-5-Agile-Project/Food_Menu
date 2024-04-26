import { Drink } from "../Models/Drink"
import { useQuery } from "@tanstack/react-query"

export const PostQuery = (dishType: string) => {
  return useQuery({
    queryKey: [{ dishType }],
    queryFn: () => {
      return fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
    },
    staleTime: 300000,
  })
}

export const DrinkQueries = async (drinkIds: string[]) => {
  const queries = await Promise.all(
    drinkIds.map(async (drinkId) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch drink with ID ${drinkId}`)
      }
      const data = await response.json()
      return NewMapDrink(data)
    }),
  )

  return queries
}

export const DrinkQuery = (drinkId: string) => {
  return useQuery<Drink>({
    queryKey: [{ drinkId }],
    queryFn: async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      return NewMapDrink(data)
    },
    staleTime: 300000,
  })
}

const NewMapDrink = (data: any): Drink => {
  const drinkData = data.drinks[0]
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
    price: drinkData.strAlcoholic === "Alcoholic" ? 230 : 125,
  }
}
