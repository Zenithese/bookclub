import { RECEIVE_READER } from '../actions/readers_actions'

const readerReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_READER:
            return action.reader
        default:
            return state;
    }
};

export default readerReducer;