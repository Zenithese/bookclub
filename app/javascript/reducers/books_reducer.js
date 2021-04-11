import { RECEIVE_BOOK, RECEIVE_BOOKS } from '../actions/books_actions'

const booksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOOK:
            return Object.assign({}, state)
        case RECEIVE_BOOKS:
            return action.books
        default:
            return state;
    }
};

export default booksReducer;