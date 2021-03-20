import axios from 'axios';
import humps from 'humps';

export const fetchBooks = () => {
    return axios.get('/api/books',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const updateBook = (id, location) => {
    return axios.patch(
        `/api/books/${id}`,
        { location: location },
        { withCredentials: true }
    ).then(book => book.data)
}