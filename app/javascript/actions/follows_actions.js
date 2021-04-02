import * as APIUtil from '../util/follows_api_util'

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW"
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS"
export const REMOVE_FOLLOW = "REMOVE_FOLLOW"

const removeFollow = (followId) => {
    return {
        type: REMOVE_FOLLOW,
        followId
    }
}

const receiveFollow = (follow) => {
    return {
        type: RECEIVE_FOLLOW,
        follow
    }
}

const receiveFollows = (follows) => {
    return {
        type: RECEIVE_FOLLOWS,
        follows
    }
}

export const deleteFollow = (id) => dispatch => {
    return APIUtil.deleteFollow(id).then(follow => {
        dispatch(removeFollow(follow.data.followId))
    })
}

export const createFollow = (id) => dispatch => {
    return APIUtil.createFollow(id).then(follow => {
        dispatch(receiveFollow(follow.data))
    })
}

export const fetchFollows = () => dispatch => {
    return APIUtil.fetchFollows().then(follows => {
        dispatch(receiveFollows(follows.data))
    })
}