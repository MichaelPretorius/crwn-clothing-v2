import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.js';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { selectCartItems } from '../../redux/cart/cart.selector.js';

const CartDropdown = () => {
	const navigate = useNavigate();
	const cartItems = useSelector(selectCartItems);

	const goToCheckoutHandler = () => navigate('/checkout');

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
