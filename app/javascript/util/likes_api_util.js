import axios from 'axios';
import humps from 'humps';

export const fetchLikes = () => {
    return axios.get(`/api/likes`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const createLike = (likeableType, likeableId) => {
    return axios.post(`/api/${likeableType}/${likeableId}/likes`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const deleteLike = (id) => {
    return axios.delete(`/api/likes/${id}`,
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}