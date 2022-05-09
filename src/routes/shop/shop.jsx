import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCategories } from '../../redux/categories/categories.action';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCollectionAndDocuments();
			dispatch(setCategories(categoriesArray));
		};
		getCategoriesMap();
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
