import axios from 'axios';
import humps from 'humps';

export const fetchHighlights = () => {
    return axios.get('/api/highlights',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const fetchReadersHighlights = (id, bookId) => {
    return axios.get(`/api/highlights_search/?id=${id}&book_id=${bookId}`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createHighlight = (data) => {
    return axios.post('/api/highlights', 
        {
            highlight: {
                text: data.text,
                cfi_range: data.cfiRange,
                user_id: data.userId,
                book_id: data.bookId
            },
        },
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const deleteHighlight = (id) => {
    return axios.delete(`/api/highlights/${id}`)
}