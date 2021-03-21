import * as APIUtil from '../util/readers_api_util'

export const RECEIVE_READERS = "RECEIVE_READERS"

const receiveReaders = (readers) => {
    return {
        type: RECEIVE_READERS,
        readers
    }
}

export const fetchReaders = () => dispatch => {
    return APIUtil.fetchReaders().then(books => {
        dispatch(receiveReaders(books.data))
    })
}