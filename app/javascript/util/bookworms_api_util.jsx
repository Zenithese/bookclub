import axios from 'axios';
import humps from 'humps';

export const fetchBookworms = () => {
    return axios.get('http://localhost:3001/api/users',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};