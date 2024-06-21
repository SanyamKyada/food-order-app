import Header from "./components/Header";
import MealList from "./components/MealList";
import CartContextProvider from "./store/cart-context";
import MealItem from "./components/MealItem";
import { useState, useEffect } from "react";
import { fetchMeals } from "./httpUtils/mealService";

function App() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetchMeals().then((data) => {
      setMeals(data);
    });
  }, []);

  return (
    <CartContextProvider mealsData={meals}>
      <Header />
      <MealList>
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </MealList>
    </CartContextProvider>
  );
}

export default App;
