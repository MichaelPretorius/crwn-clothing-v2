import './category-preview.scss';
import ProductCard from '../../components/product-card/product-card';

const CategoryPreview = ({ title, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				<span className="title">{title.toUpperCase()}</span>
			</h2>
			<div className="preview">
				{products
					.filter((_, i) => i < 4)
					.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
