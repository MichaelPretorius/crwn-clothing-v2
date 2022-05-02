import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, item) => {
	const existingCartItem = cartItems.find(i => i.id === item.id);

	if (existingCartItem) return cartItems.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));

	return [...cartItems, { ...item, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => null,
	cartItems: [],
	addItemToCart: () => null,
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCount = cartItems.reduce((total, item) => total + item.quantity, 0);
		setCartCount(newCount);
	}, [cartItems]);

	const addItemToCart = item => setCartItems(addCartItem(cartItems, item));

	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
