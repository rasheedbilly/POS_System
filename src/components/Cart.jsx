import React from 'react';

const Cart = ({ cart, onRemove, onClear, onSubmit, selectedTable }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const canSubmit = cart.length > 0 && selectedTable;
  return (
    <div className="cart">
      <h2>Cart</h2>
      {selectedTable && <div className="cart-table-info">Table: {selectedTable.number}</div>}
      {cart.map((item, index) => (
        <div key={index}>
          <div>
            {item.name} - ${item.price.toFixed(2)}
            <button className="remove-button" onClick={() => onRemove(index)}>x</button>
          </div>
          {item.customization && (
            <div className="customization">
              Bread: {item.customization.bread}, Patty: {item.customization.patty}
              {item.customization.cheese.length > 0 && `, Cheese: ${item.customization.cheese.join(', ')}`}
              {item.customization.toppings.length > 0 && `, Toppings: ${item.customization.toppings.join(', ')}`}
              {item.customization.note && `, Note: ${item.customization.note}`}
            </div>
          )}
        </div>
      ))}
      {cart.length > 0 && (
        <div className="cart-actions">
          <button className="clear-button" onClick={onClear}>Clear All</button>
          <button className="submit-button" onClick={() => onSubmit(cart)} disabled={!selectedTable}>
            {selectedTable ? 'Submit' : 'Select a Table'}
          </button>
        </div>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;