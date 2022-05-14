import { createAction, withMatcher, ActionWithPayload } from '../../utils/reducer/reducer';
import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (cartItems: CartItem[], item: CategoryItem): CartItem[] => {
	const existingCartItem = cartItems.find(i => i.id === item.id);

	if (existingCartItem) return cartItems.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));

	return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => {
	const existingCartItem = cartItems.find(i => i.id === item.id);

	if (existingCartItem && existingCartItem.quantity === 1) return cartItems.filter(i => i.id !== item.id);

	return cartItems.map(i => (i.id === item.id ? { ...item, quantity: item.quantity - 1 } : i));
};

const clearCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => cartItems.filter(i => i.id !== item.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems),
);

export const addItemToCart = (cartItems: CartItem[], item: CategoryItem): SetCartItems => {
	const newCartItems = addCartItem(cartItems, item);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
	const newCartItems = removeCartItem(cartItems, item);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
	const newCartItems = clearCartItem(cartItems, item);
	return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher(
	(isCartOpen: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen),
);
