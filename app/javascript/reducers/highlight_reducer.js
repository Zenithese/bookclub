import { RECEIVE_COMMENT } from '../actions/comments_actions';
import { RECEIVE_HIGHLIGHT, REMOVE_HIGHLIGHT } from '../actions/highlights_actions'

const highlightReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_HIGHLIGHT:
            return action.highlight
        case REMOVE_HIGHLIGHT:
            return {}
        case RECEIVE_COMMENT:
            if (state.id == action.comment.ancestorId) {
                newState.comments.unshift(action.comment)
                return newState
            }
            return state
        default:
            return state;
    }
};

export default highlightReducer;