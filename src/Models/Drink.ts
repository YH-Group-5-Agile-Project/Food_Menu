export type Drink = {
    id: string;
    name: string;
    alcoholic: boolean;
    imgUrl: string;
    ingredients: string[];
}

export type Drinks = {
    drinks: Drink[];
}