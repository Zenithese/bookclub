import * as APIUtil from '../util/session_api_util';

export const STORE_SETTINGS = "STORE_SETTINGS"
export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS"

const storeSettings = (highlightColor, fontSize, theme, id) => {
    return {
        type: STORE_SETTINGS,
        highlight_color: highlightColor, 
        font_size: fontSize, 
        theme,
        id
    }
}

const receiveSettings = () => {
    return {
        type: RECEIVE_SETTINGS,
    }
}

export const updateSettings = (id, color, fontSize, theme) => dispatch => {
    return APIUtil.updateSettings(id, color, fontSize, theme).then(settings => {
        const { highlightColor, fontSize, theme, id } = settings.data
        dispatch(storeSettings(highlightColor, fontSize, theme, id))
    })
}

export const fetchSettings = () => dispatch => {
    return dispatch(receiveSettings())
}