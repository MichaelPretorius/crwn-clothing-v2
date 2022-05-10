import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import { CategoryContainer, Title } from './category.styles';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../redux/categories/categories.selector';

const Category = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const { category } = useParams();
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<Title>{category.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products && products.map(product => <ProductCard key={product.id} product={product} />)}
				</CategoryContainer>
			)}
		</>
	);
};

export default Category;
