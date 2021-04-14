import { RECEIVE_NOTIFICATIONS, RECEIVE_NOTIFICATION } from '../actions/notifications_actions'

const notificationsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NOTIFICATIONS:
            return [...action.notifications]
        case RECEIVE_NOTIFICATION:
            return state.map(n => n.id == action.notification.id ? action.notification : n)
        default:
            return state;
    }
};

export default notificationsReducer;