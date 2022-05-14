import { UserData } from '../../utils/firebase/firebase';
import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer';
import { USER_ACTION_TYPES } from './user.types';

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData | null>;

export const setCurrentUser = withMatcher(
	(user: UserData | null): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user),
);
