import axios from 'axios';
import humps from 'humps';

export const fetchNotifications = () => {
    return axios.get('/api/notifications',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const updateSeenNotifications = () => {
    return axios.post('api/notifications/mark_as_seen',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const updateNotification = (id) => {
    return axios.patch(`api/notifications/${id}`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const fetchUnseenNotificationCount = () => {
    return axios.get(`/api/notifications/not_seen`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};