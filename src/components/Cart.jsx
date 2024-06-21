import React, { useContext } from 'react'
import { CartContext } from '../store/cart-context';

export default function Cart() {
    const { items: cartItems, updateItemQuantity, totalAmount } = useContext(CartContext);

  return (
    <>
    {cartItems.length > 0 && <>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className='cart-item'>
              <p>{`${item.name} - ${item.quantity} x $${item.price}`}</p>
              <div className='cart-item-actions'>
                <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
                {item.quantity}
                <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className='cart-total'>
          {`$${totalAmount}`}
        </div>
        </>
      }
      {!cartItems.length && <>
        <p>No items in your cart yet!!</p>
        </>
      }
      </>
  )
}
