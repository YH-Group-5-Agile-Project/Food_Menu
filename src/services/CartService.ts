import { Cart } from "../Models/Cart";
import { Drink } from "../Models/Drink";
import { Order } from "../Models/Order";

export const SaveCart = (cart: Cart): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const SaveOrderToCart = (order: Order): void => {
  console.log("Saving order...", order);
  // Get
  let storedCart: Cart = GetCart();
  // Add
  storedCart.OrderList.push(order);
  // Save
  localStorage.setItem("cart", JSON.stringify(storedCart));
};

export const SendDrinkToCart = (drink: Drink): void => {
  const newOrder: Order = {
    id: IncreamentId(),
    drink: drink,
    OrderCost: drink.price,
  };
  SaveOrderToCart(newOrder);
};

export const GetCart = () => {
  console.log("Getting Cart...");
  const storedCart = localStorage.getItem("cart");
  let cart: Cart = {
    id: 1,
    OrderList: [],
    TotalCost: 0,
  };
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  return cart;
};

export const ResetCart = () => {
  console.log("Reset Cart");
  let newCart: Cart = {
    id: 1,
    OrderList: [],
    TotalCost: 0,
  };
  SaveCart(newCart);
};

// Simple ID setter
export const IncreamentId = () => {
  let id = 0;
  const lastId = localStorage.getItem("id");
  if (lastId && typeof Number) {
    id = JSON.parse(lastId);
  }
  id++;
  localStorage.setItem("id", JSON.stringify(id));
  return id;
};

export const CalculateCostOrder = (order: Order) => {
  let cost = 0;
  if (order.main) {
    cost = order.main !== undefined ? +order.main.price : 0;
  }
  if (order.sides) {
    cost += +order.sides.price;
  }
  if (order.drink) {
    cost += +order.drink.price;
  }
  return cost;
};

export const CalculateCostCart = (cart: Cart) => {
  let cost = 0;
  cart.OrderList.forEach((order) => {
    cost += +order.OrderCost;
  });
  return cost;
};
