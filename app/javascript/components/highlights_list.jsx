import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments_actions'
import { fetchLikes } from '../actions/likes_actions'
import { fetchReadersHighlights, clearHighlights } from '../actions/highlights_actions'
import Highlight from './highlight'

const mapStateToProps = ({ entities }) => {
    return {
        highlights: entities.highlights,
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: () => dispatch(fetchComments()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)),
        clearHighlights: () => dispatch(clearHighlights()),
    }
}

function HighlightsList({ highlights, comments, fetchComments, fetchReadersHighlights, readerId, createComment, clearHighlights, fetchLikes }) {

    useEffect(() => {
        fetchComments();
        fetchLikes();

        return () => {
            clearHighlights()
        }
    }, [fetchComments])

    useEffect(() => {
        if (comments) {
            fetchReadersHighlights(readerId);
        }
    }, [comments])

    const list = highlights.length ? (
        highlights.map(({ id, text, cfiRange, comments, bookId, likesCount, likesArray }, i) => {
            return (
                <Highlight id={id} text={text} cfiRange={cfiRange} comments={comments} bookId={bookId} i={i} likesCount={likesCount} likesArray={likesArray} key={id}/>
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <div className="profile-highlights">
            {list}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)