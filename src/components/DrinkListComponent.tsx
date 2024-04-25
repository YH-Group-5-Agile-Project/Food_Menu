import DrinkComponent from "./DrinkComponent";
import styled from "styled-components";

export const DrinkListComponent = () => {
  let drinkListIDs = [
    "12768",
    "12618",
    "15092",
    "12630",
    "12724",
    "12726",
    "11288",
    "178365",
    "11462",
    "11000",
    "11003",
    "12528",
  ];

  const [drinkList, setDrinkList] = useState<Drink[]>([])
  const [showItemAdded, setShowItemAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await DrinkQueries(drinkListIDs);
      setDrinkList(data)
    }
    fetchData();
  }, [])

  const ExpandedRef = useRef<HTMLDivElement>(null);


  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<boolean>(false);
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);

  const HandleClick = (index: number) => {
    
    if (index === selectedDrink) {
      setIsOpenInfo(false);
      setSelectedInfo(false);
    } else if ((selectedDrink || selectedDrink === 0) && index !== selectedDrink) {
      setIsOpenInfo(true);
      setSelectedInfo(false);
      setSelectedDrink(index);

    } else {
      setIsOpenInfo(true);
      setSelectedInfo(true);
      setSelectedDrink(index);
      // setTimeout(() =>
      //   {ExpandedRef.current?.scrollIntoView({
      //     behavior: 'smooth',
      //     block: "center" })
      // }, 300)
    }
  };

  const handleAddToCartClick = (drink: Drink) => {
    SendDrinkToCart(drink);
    setShowItemAdded(true);
    setTimeout(() => {
      setShowItemAdded(false);
    }, 2000);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <DrinksContainer>
      {drinkList.map((drink, index) => {
        console.log(drink)      ;
        return drink ? (
                
        <>
        <DrinkComponent
          isOpen={!isOpenInfo || !selectedInfo}
          key={drink.id} 
          drink={drink} 
          expandDrink={() => HandleClick(index)}
          />
        
        {index === selectedDrink && (
              <ExpandedDrink 
                ref={ExpandedRef}
                isOpen={isOpenInfo}
                selected={selectedInfo}
                onAnimationEnd={() => {
                  if (!isOpenInfo) {
                    setSelectedDrink(null);
                  }
                }}
              >
                <TextContainer>
                  <DishTitle>{drink.name}</DishTitle>
                  <DishDescription>
                    <DishPrice>{drink.price} SEK</DishPrice>
                    <p>{drink.alcoholic ? "Alcoholic" : "Non-Alcoholic"}</p>
                    
                  </DishDescription>
                  <DishIngredients>
                    <strong>Ingredients: </strong>
                    {drink.ingredients.join(', ')}.
                  </DishIngredients>
                </TextContainer>
                <StyledButton
                  disabled={showItemAdded}
                  onClick={() => handleAddToCartClick(drink)}
                >
                  <ItemAddedPopup>Add to order</ItemAddedPopup>
                </StyledButton>
                {showItemAdded && (
                    <ItemAddedToCartPopup Item={drink.name}/>
                  )}
              </ExpandedDrink>
            )}
        </>
      ): <></>})
    }
      </DrinksContainer>
  );
};
const DrinksContainer = styled.div`
  width: 900px;
  gap: 32px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: auto + 300px;

  position: relative;
  // place-items: start;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-flow: dense;
  overflow: hidden;

  /* 220px -------- minmax(250px, 1fr) */

  @media (max-width: 949px) {
    width: 500px;
    gap: 23px;
  }

  @media (max-width: 549px) {
    width: 360px;
  }
`;
