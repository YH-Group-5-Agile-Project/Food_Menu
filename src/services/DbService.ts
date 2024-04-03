import { useEffect, useState } from "react";
import { Dish } from "../Models/Dish";


// interface dishInput {
//     dishType: string;
// }

export const GetDishes = (dishType: string) => {

const [dish, setDish] = useState<Dish[]>();
    useEffect(() => {
        fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/categories/${dishType}/recipes`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDish(data);
            });

    }, [])
    return dish
}





