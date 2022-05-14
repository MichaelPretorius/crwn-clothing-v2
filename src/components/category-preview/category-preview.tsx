import { FC } from 'react';

import ProductCard from '../../components/product-card/product-card';
import { CategoryItem } from '../../redux/categories/categories.types';
import { CategoryPreviewContainer, Preview, Title } from './category-preview.style';

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{products
					.filter((_, i) => i < 4)
					.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
