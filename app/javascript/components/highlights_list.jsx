import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights } from '../actions/highlights_actions'
import Comment from './comments'



const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        // fetchHighlights: () => dispatch(fetchHighlights()),
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)),
    }
}

function HighlightsList({ highlights, userId, comments, fetchComments, fetchReadersHighlights, readerId, createComment }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")

    useEffect(() => {
        fetchComments();
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
                    <a href={`#${cfiRange}`} onClick={() => { rendition.display(cfiRange) }}>Go to:</a>
                    <br />
                    <div className="quote">
                        <span className="text">{text}</span>
                    </div>
                    <hr />
                    {commentThread(comments, id)}
                    <a href={`#${cfiRange}`} onClick={() => { console.log(rendition.annotations); rendition.annotations.remove(cfiRange, "highlight"); console.log(id); deleteHighlight(id) }}>remove</a>
                </div>
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <ul>
            {list}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)