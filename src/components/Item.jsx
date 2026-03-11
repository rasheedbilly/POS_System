import React from 'react';

const Item = ({ item, onAddToCart, onCustomize }) => {
  const handleClick = () => {
    if (item.name === 'Burger') {
      onCustomize(item);
    } else {
      onAddToCart(item);
    }
  };

  return (
    <button className="item-button" onClick={handleClick}>
      {item.name}
    </button>
  );
};

export default Item;