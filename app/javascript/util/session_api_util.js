import axios from 'axios';
import humps from 'humps';

export const login = user => {
    return axios.post(
        '/api/session', 
        { user }, 
        { withCredentials: true }
    )
};

export const getCurrentUser = () => {
    return axios.get('/api/session', 
        {
            withCredentials: true,
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        },
    )
}

export const signup = user => {
    return axios.post(
        '/api/users', 
        { user }, 
        { withCredentials: true }
    )
};

export const updateSettings = (id, color, fontSize, theme) => {
    return axios.patch(
        `/api/users/${id}`,
        { highlight_color: color, font_size: fontSize, theme },
        {
            withCredentials: true,
            transformResponse: [
                ...axios.defaults.transformResponse,
                data => humps.camelizeKeys(data)
            ],
        }
    )
}

export const logout = () => {
    return axios.delete(
        '/api/session',
        { withCredentials: true }
    )
};