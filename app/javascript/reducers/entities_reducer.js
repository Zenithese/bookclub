import { combineReducers } from 'redux';
import highlights from './highlights_reducer'
import rendition from './rendition_reducer'
import users from './users_reducer'
import books from './books_reducer'
import book from './book_reducer'
import settings from './setting_reducer'
import comments from './comments_reducer'
import readers from './readers_reducer'
import reader from './reader_reducer'
import follows from './follows_reducer'


export default combineReducers({
    highlights,
    rendition,
    users,
    books,
    book,
    settings,
    comments,
    readers,
    reader,
    follows,
});