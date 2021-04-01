import * as APIUtil from '../util/follows_api_util'

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW"
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS"
export const REMOVE_FOLLOW = "REMOVE_FOLLOW"

const removeFollow = (id) => {
    return {
        type: REMOVE_FOLLOW,
        id
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

// export const deleteFollow = () => dispatch => {
//     return APIUtil.deleteFollow().then(follow => {
//         dispatch(removeFollow(follow.data))
//     })
// }

// export const fetchFollow = () => dispatch => {
//     return APIUtil.fetchFollow().then(follow => {
//         dispatch(receiveFollow(follow.data))
//     })
// }

export const fetchFollows = () => dispatch => {
    return APIUtil.fetchFollows().then(follows => {
        dispatch(receiveFollows(follows.data))
    })
}