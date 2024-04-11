import { Dish } from "./Dish";
import { Drink } from "./Drink";

export type Order = {
  id: number;
  main?: Dish;
  sides?: Dish;
  drink?: Drink;
  OrderCost: number;
};
