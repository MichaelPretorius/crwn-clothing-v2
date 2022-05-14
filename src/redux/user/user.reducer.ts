import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firebase';
import { setCurrentUser } from './user.action';

export type UserState = {
	readonly currentUser: UserData | null;
};

const INITIAL_STATE: UserState = { currentUser: null };

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
	if (setCurrentUser.match(action)) {
		return { currentUser: action.payload };
	}
	return state;

	// switch (type) {
	// 	case USER_ACTION_TYPES.SET_CURRENT_USER:
	// 		return { currentUser: payload };
	// 	default:
	// 		return state;
	// }
};
