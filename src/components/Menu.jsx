import React from 'react';
import Item from './Item';

const Menu = ({ items, onAddToCart, onCustomize }) => {
  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="items-grid">
        {items.map(item => (
          <Item key={item.id} item={item} onAddToCart={onAddToCart} onCustomize={onCustomize} />
        ))}
      </div>
    </div>
  );
};

export default Menu;