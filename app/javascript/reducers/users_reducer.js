import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { STORE_SETTINGS } from '../actions/settings_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case STORE_SETTINGS:
            let newState = { ...state }
            newState[action.id].highlight_color = action.highlight_color
            newState[action.id].font_size = action.font_size
            newState[action.id].theme = action.theme
            return newState
        default:
            return state;
    }
};

export default usersReducer;