import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_LOGIN_ERRORS = 'RECEIVE_LOGIN_ERRORS';
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';

export const receiveCurrentUser = currentUser => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser
    }
};

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

// export const receiveErrors = errors => {
//     return {
//         type: RECEIVE_SESSION_ERRORS,
//         errors
//     }
// };

export const receiveLoginErrors = errors => {
    return {
        type: RECEIVE_LOGIN_ERRORS,
        errors
    }
};

export const receiveSignupErrors = errors => {
    return {
        type: RECEIVE_SIGNUP_ERRORS,
        errors
    }
};

export const signup = user => dispatch => { 
    return (
    APIUtil.signup(user).then(user => (
        dispatch(receiveCurrentUser(user.data))
    ), err => (
        dispatch(receiveSignupErrors(err.response.data))
    ))
)};

export const login = user => dispatch => (
    APIUtil.login(user).then(user => (
        dispatch(receiveCurrentUser(user.data))
    ), err => (
        dispatch(receiveLoginErrors(err.response.data))
    ))
);

export const logout = () => dispatch => (
    APIUtil.logout().then(() => (
        dispatch(logoutCurrentUser())
    ), err => (
        dispatch(logoutCurrentUser())
    ))
);

export const getCurrentUser = () => dispatch => (
    APIUtil.getCurrentUser().then(user => (
        dispatch(receiveCurrentUser(user.data))
    ))
);