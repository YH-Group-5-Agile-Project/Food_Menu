import { Dish } from "./Dish";

export type Order = {
    id: number;
    main?: Dish;
    sides: Dish;
    OrderCost: number;
}