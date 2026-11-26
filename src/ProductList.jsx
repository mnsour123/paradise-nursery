import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

// Builds a small plant thumbnail (SVG data URI) so images always load
const thumb = (emoji, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220"><rect width="300" height="220" fill="${color}"/><text x="150" y="140" font-size="100" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#d8efd3'), description: 'Produces oxygen at night.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🍃', '#e3f3d0'), description: 'Filters formaldehyde and xylene.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#f0f5d9'), description: 'Removes mold spores from the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🌱', '#d3ecd9'), description: 'Adds natural humidity to rooms.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#dcefe0'), description: 'Absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#e6f4d7'), description: 'Purifies air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e8def5'), description: 'Calming scent that aids sleep.', cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#f5f0e4'), description: 'Sweet fragrance for any room.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#dbead6'), description: 'Fresh herb scent, great for cooking.', cost: 15 },
      { name: 'Mint', image: thumb('🍀', '#d4efd0'), description: 'Cooling aroma and tea ingredient.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#f6f3cf'), description: 'Lemony scent that relaxes the mind.', cost: 14 },
      { name: 'Gardenia', image: thumb('🌸', '#f9e3ea'), description: 'Rich floral fragrance.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Jade Plant', image: thumb('🌳', '#d6ecd0'), description: 'Symbol of good luck, very hardy.', cost: 16 },
      { name: 'Echeveria', image: thumb('🥬', '#e2efd8'), description: 'Rosette-shaped succulent.', cost: 13 },
      { name: 'Haworthia', image: thumb('🌾', '#e5efd2'), description: 'Compact and low light tolerant.', cost: 11 },
      { name: 'Barrel Cactus', image: thumb('🌵', '#f2ecd0'), description: 'Round cactus needing little water.', cost: 19 },
      { name: 'String of Pearls', image: thumb('⚪', '#e0f0e6'), description: 'Trailing plant with bead-like leaves.', cost: 21 },
      { name: 'Zebra Cactus', image: thumb('🦓', '#e9f1dc'), description: 'Striped leaves, easy to care for.', cost: 15 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* Navbar shown on both the Plants page and the Cart page */}
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="nav-links">
          <a onClick={onHomeClick}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a className="cart-link" onClick={() => setShowCart(true)} aria-label="Cart">
            🛒
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-section">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
