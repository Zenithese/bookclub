import React from 'react';
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        rendition: entities.rendition.rendition,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReadersHighlights: (id, bookId) => dispatch(fetchReadersHighlights(id, bookId)),
    }
}


function ReaderListNode({ username, id, bookId, fetchReadersHighlights, highlights, rendition }) {

    const handleClick = () => {
        highlights.forEach(highlight => rendition.annotations.remove(highlight.cfiRange, "highlight"))
        fetchReadersHighlights(id, bookId)
    }
    
    return (
        <option onClick={handleClick} >
            {username}
        </option>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderListNode)