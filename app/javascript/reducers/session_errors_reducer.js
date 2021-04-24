import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    RECEIVE_LOGIN_ERRORS,
    RECEIVE_SIGNUP_ERRORS
} from '../actions/session_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            let response;
            action.errors === undefined ? response = null : response = action.errors; // for now
            return response;
        case RECEIVE_LOGIN_ERRORS:
            newState.loginErrors = action.errors
            return newState;
        case RECEIVE_SIGNUP_ERRORS:
            newState.signupErrors = action.errors
            return newState;
        case RECEIVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
};