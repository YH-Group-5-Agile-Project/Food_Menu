import { useEffect, useState } from "react";
import { MainDish } from "../Models/MainDish";


export const GetAllMainDishes = () => {

const [mainDish, setMainDish] = useState<MainDish[]>();
    useEffect(() => {
        fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMainDish(data)
        });
            
    }, [])
    return mainDish
}





