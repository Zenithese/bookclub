import { REMOVE_FOLLOW, RECEIVE_FOLLOW, RECEIVE_FOLLOWS } from '../actions/follows_actions'

const followsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FOLLOWS:
            return action.follows
        case RECEIVE_FOLLOW:
            return { ...state, ...{ [action.follow.followId]: { "id": action.follow.id } } }
        case REMOVE_FOLLOW:
            let newState = { ...state }
            delete newState[action.followId]
            return newState
        default:
            return state;
    }
};

export default followsReducer;