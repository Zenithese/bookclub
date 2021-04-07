import axios from 'axios';
import humps from 'humps';

export const fetchReaders = () => {
    return axios.get('/api/users',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const fetchReader = (id) => {
    return axios.get(`/api/users/${id}`, 
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        },
    )
}