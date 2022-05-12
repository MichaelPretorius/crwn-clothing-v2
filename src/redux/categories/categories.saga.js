import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase';
import { fetchCategoriesFail, fetchCategoriesSuccess } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCollectionAndDocuments);
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield put(fetchCategoriesFail(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]);
}
