import React, { useState, createContext, useReducer } from 'react';
import { cartReducer } from './reducers';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch, search, setSearch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
