import * as APIUtil from '../util/bookworms_api_util'

export const RECEIVE_BOOKWORMS = "RECEIVE_BOOKWORMS"

const receiveBookworms = (bookworms) => {
    return {
        type: RECEIVE_BOOKWORMS,
        bookworms
    }
}

export const fetchBookworms = () => dispatch => {
    return APIUtil.fetchBookworms().then(books => {
        dispatch(receiveBookworms(books.data))
    })
}