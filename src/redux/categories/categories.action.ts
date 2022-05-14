import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer';
import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFail = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, Error>;

export const fetchCategoriesStart = withMatcher(
	(): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START),
);

export const fetchCategoriesSuccess = withMatcher(
	(categories: Category[]): FetchCategoriesSuccess =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories),
);

export const fetchCategoriesFail = withMatcher(
	(error: Error): FetchCategoriesFail => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error),
);

// REDUX THUNK
// ------------------------
// export const setCategories = categories => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
// export const fetchCategoriesAsync = () => async dispatch => {
// 	dispatch(fetchCategoriesStart());
// 	try {
// 		const categoriesArray = await getCollectionAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categoriesArray));
// 	} catch (error) {
// 		dispatch(fetchCategoriesFail(error));
// 	}
// };
