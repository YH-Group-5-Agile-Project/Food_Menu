export type Drink = {
  id: string
  name: string
  alcoholic: boolean
  imgUrl: string
  ingredients: string[]
  price: number
}

export type Drinks = {
  drinks: Drink[]
}