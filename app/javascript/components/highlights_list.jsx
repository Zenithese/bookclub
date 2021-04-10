import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights, clearHighlights } from '../actions/highlights_actions'
import Comment from './comments'
import Highlight from './highlight'



const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
        books: entities.books
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)),
        clearHighlights: () => dispatch(clearHighlights()),
    }
}

function HighlightsList({ highlights, userId, comments, fetchComments, fetchReadersHighlights, readerId, createComment, books, clearHighlights }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")

    useEffect(() => {
        fetchComments();

        return () => {
            clearHighlights()
        }
    }, [fetchComments])

    useEffect(() => {
        if (comments) {
            fetchReadersHighlights(readerId);
        }
    }, [comments, fetchReadersHighlights])

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const comment = {
            body,
            id,
            userId,
            parent: true,
        }
        createComment(comment);
    }

    const handleVisibleForm = (e, id) => {
        e.preventDefault();
        const newSet = new Set(visibleForms);
        if (visibleForms.has(id)) {
            newSet.delete(id);
            setVisibleForms(newSet);
        } else {
            newSet.add(id);
            setVisibleForms(newSet);
        }
    }

    const commentThread = (thread, id) => {
        return (
            <div className="comments">
                <div className="comment">
                    <button onClick={(e) => handleVisibleForm(e, id)}>Thoughts</button>
                    <form style={visibleForms.has(id) ? { display: "block" } : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <label>thought:</label>
                        <input type="body" value={body} onChange={(e) => setBody(e.target.value)} />
                    </form>
                    {thread.map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment} />
                        )
                    })}
                </div>
            </div>
        )
    }

    const list = highlights.length ? (
        highlights.map(({ id, text, cfiRange, comments, bookId }, i) => {
            return (
                <Highlight id={id} text={text} cfiRange={cfiRange} comments={comments} bookId={bookId} i={i} commentThread={commentThread} books={books} />
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