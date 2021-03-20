import { RECEIVE_BOOKWORMS } from '../actions/bookworms_actions'

const booksReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOOKWORMS:
            return action.bookworms
        default:
            return state;
    }
};

export default booksReducer;