export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  _id: string;
};

export type Dish = {
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  ingredients: Ingredient[];
  price: number;
};
