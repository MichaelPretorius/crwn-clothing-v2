import { createAction } from '../../utils/reducer/reducer';
import { CART_ACTION_TYPES } from './cart.types';

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

export const addItemToCart = (cartItems, item) => {
	const newCartItems = addCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
	const newCartItems = removeCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, item) => {
	const newCartItems = clearCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = bool => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
