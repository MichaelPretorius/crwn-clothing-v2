import { takeLatest, all, call, put } from 'typed-redux-saga';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase';
import { fetchCategoriesFail, fetchCategoriesSuccess } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield* call(getCollectionAndDocuments);
		yield* put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield* put(fetchCategoriesFail(error as Error));
	}
}

export function* onFetchCategories() {
	yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
	yield* all([call(onFetchCategories)]);
}
