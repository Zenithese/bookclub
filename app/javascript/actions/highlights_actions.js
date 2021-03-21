import * as APIUtil from '../util/highlights_api_util'

export const RECEIVE_HIGHLIGHT = "RECEIVE_HIGHLIGHT"
export const RECEIVE_HIGHLIGHTS = "RECEIVE_HIGHLIGHTS"
export const REMOVE_HIGHLIGHT = "REMOVE_HIGHLIGHT"
export const RECEIVE_READERS_HIGHLIGHTS = "RECEIVE_READERS_HIGHLIGHTS"

const receiveHighlight = (highlight) => {
    return {
        type: RECEIVE_HIGHLIGHT,
        highlight,
    }
}

const receiveHighlights = (highlights) => {
    return {
        type: RECEIVE_HIGHLIGHTS,
        highlights,
    }
}

const removeHighlight = (id) => {
    return {
        type: REMOVE_HIGHLIGHT,
        id
    }
}

const receiveReadersHighlights = (highlights) => {
    return {
        type: RECEIVE_READERS_HIGHLIGHTS,
        highlights,
    }
}

export const createHighlight = (highlight) => dispatch => {
    return APIUtil.createHighlight(highlight).then(highlight => 
        dispatch(receiveHighlight(highlight.data))
    )
};

// export const fetchHighlights = () => dispatch => {
//     return dispatch(receiveHighlights());
// };
export const fetchHighlights = () => dispatch => {
    return APIUtil.fetchHighlights().then(highlights => 
        dispatch(receiveHighlights(highlights.data))
    )
};

export const deleteHighlight = (id) => dispatch => {
    return APIUtil.deleteHighlight(id).then(response => 
        dispatch(removeHighlight(response.data.id))
    )
};

export const fetchReadersHighlights = (id, bookId) => dispatch => {
    return APIUtil.fetchReadersHighlights(id, bookId).then(response =>
        dispatch(receiveReadersHighlights(response.data))
    )
};