import { useSelector, useDispatch } from 'react-redux';

import { setIsCartOpen } from '../../redux/cart/cart.action.js';
import { selectCartCount, selectIsCartOpen } from '../../redux/cart/cart.selector.js';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.style.js';

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
