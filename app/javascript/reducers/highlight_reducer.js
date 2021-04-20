import { RECEIVE_HIGHLIGHT, REMOVE_HIGHLIGHT } from '../actions/highlights_actions'

const highlightReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HIGHLIGHT:
            return action.highlight
        case REMOVE_HIGHLIGHT:
            return {}
        default:
            return state;
    }
};

export default highlightReducer;