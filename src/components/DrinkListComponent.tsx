import { DrinkQuery } from "../services/DbService";
import DrinkComponent from "./DrinkComponent";


export const DrinkListComponent = () => {
  const drinkListIDs = [
    12768, 12618, 15092, 12630, 12724, 12726, 11288, 178365, 11462, 11000, 11003,
    12528,
  ];
  let i = 0;

  const { data, isLoading, error } = DrinkQuery(drinkListIDs[i]);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <>{data?.map}
      <DrinkComponent drink={data[0]}/>
    </>
  );
};
