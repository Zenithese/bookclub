import React from 'react';
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'

const mapStateToProps = ({ entities }) => {
    return {
        bookId: entities.books.book ? entities.books.book.id : null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReadersHighlights: (id, bookId) => dispatch(fetchReadersHighlights(id, bookId)),
    }
}


function ReaderListNode({ username, id, bookId, fetchReadersHighlights }) {

    const handleClick = () => {
        fetchReadersHighlights(id, bookId)
    }
    
    return (
        <div onClick={handleClick} >
            {username}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderListNode)