import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, item) => {
	const existingCartItem = cartItems.find(i => i.id === item.id);

	if (existingCartItem) return cartItems.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));

	return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems, item) => {
	const existingCartItem = cartItems.find(i => i.id === item.id);

	if (existingCartItem.quantity === 1) return cartItems.filter(i => i.id !== item.id);

	return cartItems.map(i => (i.id === item.id ? { ...item, quantity: item.quantity - 1 } : i));
};

const clearCartItem = (cartItems, item) => cartItems.filter(i => i.id !== item.id);

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => null,
	cartItems: [],
	addItemToCart: () => null,
	removeItemFromCart: () => null,
	clearItemFromCart: () => null,
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCount = cartItems.reduce((total, item) => total + item.quantity, 0);
		const newTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
		setCartCount(newCount);
		setCartTotal(newTotal);
	}, [cartItems]);

	const addItemToCart = item => setCartItems(addCartItem(cartItems, item));
	const removeItemFromCart = item => setCartItems(removeCartItem(cartItems, item));
	const clearItemFromCart = item => setCartItems(clearCartItem(cartItems, item));

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		removeItemFromCart,
		clearItemFromCart,
		cartTotal,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
