export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  _id: string;
};

export type MainDish = {
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  ingredients: Ingredient[];
  price: number;
};
