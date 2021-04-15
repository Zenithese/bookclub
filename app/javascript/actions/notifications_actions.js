import * as APIUtil from '../util/notifications_api_util'

export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS"
export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION"
export const RECEIVE_UNSEEN_NOTIFICATION_COUNT = "RECEIVE_UNSEEN_NOTIFICATION_COUNT"

const receiveNotification = (notification) => {
    return {
        type: RECEIVE_NOTIFICATION,
        notification,
    }
}

const receiveNotifications = (notifications) => {
    return {
        type: RECEIVE_NOTIFICATIONS,
        notifications,
    }
}

const receiveUnseenNotificationCount = (count) => {
    return {
        type: RECEIVE_UNSEEN_NOTIFICATION_COUNT,
        count: count.count,
    }
}

export const fetchNotifications = () => dispatch => {
    return APIUtil.fetchNotifications().then(notifications => {
        dispatch(receiveNotifications(notifications.data))
    })
}

export const updateNotification = (id) => dispatch => {
    return APIUtil.updateNotification(id).then(notification => {
        dispatch(receiveNotification(notification.data))
    })
}

export const fetchUnseenNotificationCount = () => dispatch => {
    return APIUtil.fetchUnseenNotificationCount().then(count => {
        dispatch(receiveUnseenNotificationCount(count.data))
    })
}

export const updateSeenNotifications = () => dispatch => {
    return APIUtil.updateSeenNotifications().then(count => {
        dispatch(receiveUnseenNotificationCount(count.data))
    })
}