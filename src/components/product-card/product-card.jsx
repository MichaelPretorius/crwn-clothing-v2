import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../redux/cart/cart.action';
import { selectCartItems } from '../../redux/cart/cart.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import { ProductCartContainer, Footer, Name, Price } from './product-card.styles';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, price, imageUrl } = product;

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
				Add to card
			</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
