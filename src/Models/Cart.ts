import { Order } from "./Order";

export type Cart = {
  id: number;
  OrderList: Order[];
  TotalCost: number;
};
