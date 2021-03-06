import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import { RECEIVE_AVATAR } from '../actions/settings_actions';

const _nullUser = Object.freeze({
    id: null
});

const sessionReducer = (state = _nullUser, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.currentUser.id, avatarId: action.currentUser.avatar_id };
        case LOGOUT_CURRENT_USER:
            return _nullUser;
        case RECEIVE_AVATAR:
            return { ...state, avatarId: action.avatarId }
        default:
            return state;
    }
};

export default sessionReducer;