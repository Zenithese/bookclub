import axios from 'axios';
import humps from 'humps';

export const fetchComments = () => {
    return axios.get('/api/comments',
        {
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
};

export const createComment = (data) => {
    return axios.post(data.parent ? `/api/highlights/${data.id}/comments` : `/api/comments/${data.id}/comments`,
        {
            comment: {
                body: data.body,
                user_id: data.userId,
                ancestor_type: data.ancestorType,
                ancestor_id: data.ancestorId,
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

export const deleteComment = (id) => {
    return axios.delete(`/api/comments/${id}`)
}