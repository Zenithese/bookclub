import * as APIUtil from '../util/notifications_api_util'

export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS"
export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION"


const receiveNotifications = (notifications) => {
    return {
        type: RECEIVE_NOTIFICATIONS,
        notifications,
    }
}

const receiveNotification = (notification) => {
    return {
        type: RECEIVE_NOTIFICATION,
        notification,
    }
}

export const fetchNotifications = () => dispatch => {
    return APIUtil.fetchNotifications().then(notifications => {
        dispatch(receiveNotifications(notifications.data))
    })
}

export const updateNotifications = () => dispatch => {
    return APIUtil.updateNotifications().then(notifications => {
        dispatch(receiveNotifications(notifications.data))
    })
}

export const updateNotification = (id) => dispatch => {
    return APIUtil.updateNotification(id).then(notification => {
        dispatch(receiveNotification(notification.data))
    })
}