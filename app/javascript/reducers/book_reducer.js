import { STORE_BOOK } from '../actions/books_actions'

const booksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case STORE_BOOK:
            let newState = Object.assign({}, state)
            newState['book'] = action.book
            return newState
        default:
            return state;
    }
};

export default booksReducer;