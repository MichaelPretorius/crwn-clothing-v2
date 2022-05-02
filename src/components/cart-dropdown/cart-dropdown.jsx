import { useContext } from 'react';

import './cart-dropdown.scss';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { CartContext } from '../../contexts/cart';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items" />
			{cartItems.map(item => (
				<CartItem key={item.id} cartItem={item} />
			))}
			<Button>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
