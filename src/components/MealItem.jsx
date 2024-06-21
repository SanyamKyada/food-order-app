import React, { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function MealItem({ meal }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img src={`backend/public/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">
          <span>{currencyFormatter.format(meal.price)}</span>
        </div>
        <p className="meal-item-description">{meal.description}</p>
        <div className="meal-item-actions">
          <Button onClick={() => addItemToCart(meal.id)}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
