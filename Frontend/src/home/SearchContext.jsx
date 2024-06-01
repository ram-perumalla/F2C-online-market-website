import React, { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // Update localStorage when cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log(product,"product")
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        // Increase the quantity
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add the new product with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };
  const [productQuantities, setProductQuantities] = useState({});
  const [shippingDetails, setShippingDetails]=useState()
  const [totalAmount, setTotalAmount]=useState()
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, cartItems, addToCart, removeFromCart,productQuantities, setProductQuantities, shippingDetails, setShippingDetails,totalAmount,setTotalAmount }}>
      {children}
    </SearchContext.Provider>
  );
};
