import { RECEIVE_UNSEEN_NOTIFICATION_COUNT } from '../actions/notifications_actions'

const settingsReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_UNSEEN_NOTIFICATION_COUNT:
            return action.count > 0 ? action.count : null
        default:
            return state;
    }
};

export default settingsReducer;