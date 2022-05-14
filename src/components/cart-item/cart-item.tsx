import { FC } from 'react';

import { CartItem } from '../../redux/cart/cart.types';
import { CartItemContainer, ItemDetails } from './cart-item.styles';

export type CartItemProps = {
	cartItem: CartItem;
};

const CartItemComponent: FC<CartItemProps> = ({ cartItem: { name, quantity, imageUrl, price } }) => {
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItemComponent;
