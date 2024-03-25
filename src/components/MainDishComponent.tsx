import { useState, useEffect } from "react";
import DishComponent from "./DishComponent";
import { MainDish } from "../Models/MainDish";
import { styled } from "styled-components";


export const MainDishComponent = () => {
    const [mainDish, setMainDish] = useState<MainDish[]>();
    useEffect(() => {
        fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMainDish(data)
        });
            
    }, [])

    const [bigCard, setBigCard] = useState<number | null>(null);

    const HandleClick = (index: number) => {
        setBigCard(index === bigCard ? null : index);
    }

 return (
    <DisplayWrapper>
        {(mainDish?.map((dish, index) => 
        <DishComponent 
            key={index}
            dish={dish}
            isBig={index === bigCard}
            onClick={() => HandleClick(index)}            
        />))}
    </DisplayWrapper>
 )
        

};


const DisplayWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
`






//Vi kan hämta data från apiet men ImageUrl funkar ej.
//Det är inget fel i datan, utan hur vi försöker implementera det.
//Till Allex: Lägg in alla dbilder och commita det så vi alla får dem i projektet.
