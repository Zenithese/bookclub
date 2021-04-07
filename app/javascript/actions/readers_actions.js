import * as APIUtil from '../util/readers_api_util'

export const RECEIVE_READERS = "RECEIVE_READERS"
export const RECEIVE_READER = "RECEIVE_READER"

const receiveReaders = (readers) => {
    return {
        type: RECEIVE_READERS,
        readers
    }
}

const receiveReader = (reader) => {
    return {
        type: RECEIVE_READER,
        reader
    }
}

export const fetchReaders = () => dispatch => {
    return APIUtil.fetchReaders().then(books => {
        dispatch(receiveReaders(books.data))
    })
}

export const fetchReader = (id) => dispatch => {
    return APIUtil.fetchReader(id).then(reader => {
        dispatch(receiveReader(reader.data))
    })
}