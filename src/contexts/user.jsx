import { createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase';
import { createAction } from '../utils/reducer/reducer';

export const UserContext = createContext({ currentUser: null, setCurrentUser: () => null });

// USING REDUCER INSIDE CONTEXT
// ---------------------------------
export const USER_ACTION_TYPES = { SET_CURRENT_USER: 'SET_CURRENT_USER' };

const INITIAL_STATE = { currentUser: null };

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { currentUser: payload };
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const setCurrentUser = user => dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) createUserDocumentFromAuth(user);
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = { currentUser, setCurrentUser };
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// USING ONLY CONTEXT EXAMPLE
// ---------------------------------
// export const UserProvider = ({ children }) => {
// 	const [currentUser, setCurrentUser] = useState(null);

// 	useEffect(() => {
// 		const unsubscribe = onAuthStateChangedListener(user => {
// 			if (user) createUserDocumentFromAuth(user);
// 			setCurrentUser(user);
// 		});

// 		return unsubscribe;
// 	}, []);

// 	const value = { currentUser, setCurrentUser };
// 	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
