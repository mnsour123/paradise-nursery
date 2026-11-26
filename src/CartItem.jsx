import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './App.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total cost for one plant (unit price x quantity)
  const calculateItemTotal = (item) => item.cost * item.quantity;

  // Total amount for the whole cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleCheckout = () => alert('Coming Soon');

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <p className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</p>

      {cartItems.length === 0 && <p className="empty-cart">Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Unit price: ${item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p className="item-total">Total: ${calculateItemTotal(item)}</p>
          </div>
          <button className="delete-btn" onClick={() => handleRemove(item)}>
            Delete
          </button>
        </div>
      ))}

      <div className="cart-actions">
        <button className="continue-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
