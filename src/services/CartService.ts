import { Cart } from "../Models/Cart";
import { Order } from "../Models/Order";

export const SaveCart = (cart: Cart): void => {
    localStorage.setItem("cart", JSON.stringify(cart));
} 

export const SaveOrderToCart = (order: Order): void => {
    console.log("Saving order...", order);
    // Get
    let storedCart: Cart = GetCart();
    // Add
    storedCart.OrderList.push(order);
    // Save
    localStorage.setItem("cart", JSON.stringify(storedCart));
}

export const GetCart = () => {
    console.log("Getting Cart...");
    const storedCart = localStorage.getItem("cart");
    let cart: Cart = {
        id: 1,
        OrderList: [],
        TotalCost: 0
      }
    if(storedCart){
        cart = JSON.parse(storedCart);
    }
    return cart;
}

// Simple ID setter
export const IncreamentId = () => {
    let id = 0;
    const lastId = localStorage.getItem("id");
    if(lastId && typeof(Number)){
        id = JSON.parse(lastId);
    }
    id++
    localStorage.setItem("id", JSON.stringify(id));
    return id;
}

export const CalculateCostOrder = (order: Order) => {
    let cost = 0;
    cost = +order.main.price;
    cost += +order.sides.price;
    return cost;
}

export const CalculateCostCart = (cart: Cart) => {
    let cost = 0;
    cart.OrderList.forEach(order => {
        cost += +order.OrderCost;
    });
    return cost;
}