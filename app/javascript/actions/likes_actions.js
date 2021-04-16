import * as APIUtil from '../util/likes_api_util'

export const RECEIVE_LIKES = "RECEIVE_LIKES"
export const RECEIVE_LIKE = "RECEIVE_LIKE"
export const REMOVE_LIKE = "REMOVE_LIKE"

const receiveLikes = (likes) => {
    return {
        type: RECEIVE_LIKES,
        likes,
    }
}

const receiveLike = (like) => {
    return {
        type: RECEIVE_LIKE,
        like,
    }
}

const removeLike = (like) => {
    return {
        type: REMOVE_LIKE,
        like,
    }
}

export const fetchLikes = () => dispatch => {
    return APIUtil.fetchLikes().then(likes =>
        dispatch(receiveLikes(likes.data))
    )
};

export const createLike = (likeableId, likeableType) => dispatch => {
    return APIUtil.createLike(likeableId, likeableType).then(like =>
        dispatch(receiveLike(like.data))
    )
};

export const deleteLike = (likeableId, userId) => dispatch => {
    return APIUtil.deleteLike(likeableId, userId).then(like =>
        dispatch(removeLike(like.data))
    )
};