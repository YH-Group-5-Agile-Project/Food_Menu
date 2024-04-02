import { Order } from "../Models/Order";

export const SaveOrderToCart = (order: Order): void => {
    console.log("Saving order...", order);
    // Get
    let storedList: Order[] = GetOrderList();
    // Add
    storedList.push(order);
    // Save
    localStorage.setItem("orderlist", JSON.stringify(order));
}

export const GetOrderList = () => {
    console.log("Getting Cart...");
    const storedList = localStorage.getItem("orderlist");
    let orderlist: Order[] = [];
    if(storedList){
        orderlist = JSON.parse(storedList);
    }
    return orderlist;
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

export const CalculateCost = () => {
    let cost = 0.0;
}