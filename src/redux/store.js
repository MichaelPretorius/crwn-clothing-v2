import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// const customLoggerMiddleware = store => next => action => {
// 	if (!action.payload) return next(action);

// 	console.log('redux: ', {
// 		type: action.type,
// 		payload: action.payload,
// 		currentState: store.getState(),
// 	});

// 	next(action);

// 	console.log('redux: ', {
// 		nextState: store.getState(),
// 	});
// };

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
