import { combineReducers } from 'redux';

import modal from './modal_reducer'
import count from './unseen_count_reducer'

export default combineReducers({
    modal,
    count,
});