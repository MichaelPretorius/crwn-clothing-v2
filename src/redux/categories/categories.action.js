import { getCollectionAndDocuments } from '../../utils/firebase/firebase';
import { createAction } from '../../utils/reducer/reducer';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const setCategories = categories => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = categories =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFail = error => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);

export const fetchCategoriesAsync = () => async dispatch => {
	dispatch(fetchCategoriesStart());
	try {
		const categoriesArray = await getCollectionAndDocuments();
		dispatch(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		dispatch(fetchCategoriesFail(error));
	}
};
