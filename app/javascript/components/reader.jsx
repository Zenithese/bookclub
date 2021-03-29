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


function Reader({ username, id, bookId }) {

    return (
        <div>
            <img className="reader-image" src="/default-profile-img.jpeg" />
            <h2>{username}</h2>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader)