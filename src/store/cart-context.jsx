import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {}, // These values will actually not get used but it will be suggested by auto-completion
  updateItemQuantity: () => {},
  totalAmount: 0,
});

function ShoppingCartReducer(state, action) {
  // here the state will be latest guaranteed snapshot of the curent state
  if (action.type === "ADD_ITEM") {
    // const updatedItems = [...prevShoppingCart.items];
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      // (cartItem) => cartItem.id === id
      (cartItem) => cartItem.id === action.playload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const meal = action.playload.mealsData.find(
        (item) => item.id === action.playload.id
      );
      updatedItems.push({
        id: action.playload.id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
      });
    }

    return {
      //...state, // Not needed here bcaz we have only one value
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.playload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.playload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      //...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_ITEMS") {
    return {
      items: [],
    };
  }
  return state;
}

export default function CartContextProvider({ children, mealsData }) {
  const [cartState, cartDispatch] = useReducer(ShoppingCartReducer, {
    items: [],
  });

  function handleAddToCart(id) {
    cartDispatch({
      type: "ADD_ITEM",
      playload: {
        id,
        mealsData,
      },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    cartDispatch({
      type: "UPDATE_ITEM",
      playload: {
        productId,
        amount,
      },
    });
  }

  function handleClearCart() {
    cartDispatch({
      type: "CLEAR_ITEMS",
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
    totalAmount: cartState.items
      .reduce((x, y) => x + y.price * y.quantity, 0)
      .toFixed(2),
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
