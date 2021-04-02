import axios from 'axios';
import humps from 'humps';

export const fetchFollows = () => {
    return axios.get('/api/follows',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createFollow = (id) => {
    return axios.post(`/api/follows`, 
        {
            follow_id: id
        },
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const deleteFollow = (id) => {
    return axios.delete(`/api/follows/${id}`, 
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const updateFollow = (id, location) => {
    return axios.patch(
        `/api/follows/${id}`,
        { location: location },
        { withCredentials: true }
    ).then(follow => follow.data)
}