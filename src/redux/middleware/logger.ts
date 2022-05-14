import { Middleware } from 'redux';

import { RootState } from '../store';

export const customLoggerMiddleware: Middleware<{}, RootState> = store => next => action => {
	if (!action.payload) return next(action);

	console.log('redux: ', {
		type: action.type,
		payload: action.payload,
		currentState: store.getState(),
	});

	next(action);

	console.log('redux: ', {
		nextState: store.getState(),
	});
};
