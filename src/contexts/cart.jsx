import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer';

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

// USING REDUCER INSIDE CONTEXT
// ---------------------------------
export const CART_ACTION_TYPES = { SET_CART_ITEM: 'SET_CART_ITEM', SET_IS_CART_OPEN: 'SET_IS_CART_OPEN' };

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEM:
			return { ...state, ...payload };
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return { ...state, isCartOpen: payload };
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, cartTotal } = state;

	const addItemToCart = item => {
		const newCartItems = addCartItem(cartItems, item);
		updateCartItemsReducer(newCartItems);
	};
	const removeItemFromCart = item => {
		const newCartItems = removeCartItem(cartItems, item);
		updateCartItemsReducer(newCartItems);
	};
	const clearItemFromCart = item => {
		const newCartItems = clearCartItem(cartItems, item);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = bool => dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

	const updateCartItemsReducer = newCartItems => {
		const newCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
		const newTotal = newCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
				cartItems: newCartItems,
				cartTotal: newTotal,
				cartCount: newCount,
			}),
		);
	};

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

// USING ONLY CONTEXT EXAMPLE
// ---------------------------------
// export const CartProvider = ({ children }) => {
// 	const [isCartOpen, setIsCartOpen] = useState(false);
// 	const [cartItems, setCartItems] = useState([]);
// 	const [cartCount, setCartCount] = useState(0);
// 	const [cartTotal, setCartTotal] = useState(0);

// 	useEffect(() => {
// 		const newCount = cartItems.reduce((total, item) => total + item.quantity, 0);
// 		const newTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// 		setCartCount(newCount);
// 		setCartTotal(newTotal);
// 	}, [cartItems]);

// 	const addItemToCart = item => setCartItems(addCartItem(cartItems, item));
// 	const removeItemFromCart = item => setCartItems(removeCartItem(cartItems, item));
// 	const clearItemFromCart = item => setCartItems(clearCartItem(cartItems, item));

// 	const value = {
// 		isCartOpen,
// 		setIsCartOpen,
// 		cartItems,
// 		addItemToCart,
// 		cartCount,
// 		removeItemFromCart,
// 		clearItemFromCart,
// 		cartTotal,
// 	};
// 	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
