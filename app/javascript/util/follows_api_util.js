import axios from 'axios';
import humps from 'humps';

export const fetchFollows = () => {
    return axios.get('http://localhost:3001/api/follows',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const updateFollow = (id, location) => {
    return axios.patch(
        `http://localhost:3001/api/follows/${id}`,
        { location: location },
        { withCredentials: true }
    ).then(follow => follow.data)
}