import { RECEIVE_READERS } from '../actions/readers_actions'

const readersReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_READERS:
            return action.readers
        default:
            return state;
    }
};

export default readersReducer;