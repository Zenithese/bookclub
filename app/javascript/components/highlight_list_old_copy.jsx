import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights, clearHighlights } from '../actions/highlights_actions'
import Comment from './comments'



const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
        readerId: entities.reader.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (userId, bookId) => dispatch(fetchReadersHighlights(userId, bookId)),
        clearHighlights: () => dispatch(clearHighlights()),
    }
}

function HighlightsList({ toggle, highlights, fetchReadersHighlights, userId, comments, fetchComments, createComment, bookId, clearHighlights, readerId, rendition }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")

    useEffect(() => {
        fetchComments();

        return () => {
            clearHighlights()
        }
    }, [])

    useEffect(() => {
        if (comments) {
            fetchReadersHighlights(userId, bookId);
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
                    {thread.map(comment => {
                        return (
                            <Comment key={comment.id} comment={comment} />
                        )
                    })}
                </div>
            </div>
        )
    }

    const list = highlights.length ? (
        highlights.map(({ id, text, cfiRange, comments }, i) => {
            return (
                <div className="annotation" key={i}>
                    <div href={`#${cfiRange}`} onClick={() => { rendition.display(cfiRange) }}>Go to:</div>
                    <br />
                    <div className="quote">
                        <span className="text">{text}</span>
                    </div>
                    <hr />
                    {commentThread(comments, id)}
                    <div href={`#${cfiRange}`} onClick={() => { console.log(rendition.annotations); rendition.annotations.remove(cfiRange, "highlight"); console.log(id); deleteHighlight(id) }}>remove</div>
                </div>
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <ul className={toggle ? "highlight-list-opened" : "highlight-lilst-closed"}>
            {list}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)