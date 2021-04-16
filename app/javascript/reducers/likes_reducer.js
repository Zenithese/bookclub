import { RECEIVE_LIKE, RECEIVE_LIKES, REMOVE_LIKE } from '../actions/likes_actions'

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return { ...state, ...{ [action.like.likeable_type.toLowerCase() + "s"]: { ...state[action.like.likeable_type.toLowerCase() + "s"], ...{ [action.like.likeable_id]: { id: action.like.id } } } } }
        case RECEIVE_LIKES:
            return action.likes
        case REMOVE_LIKE:
            let newState = { ...state }
            delete newState[action.like.likeableType.toLowerCase() + "s"][action.like.likeableId]
            return newState
        default:
            return state;
    }
};

export default likesReducer;