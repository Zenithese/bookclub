import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights, clearHighlights, deleteHighlight } from '../actions/highlights_actions'
import Comment from './comments'
import useWindowSize from './window_resize_hook';
import { debounce } from 'lodash';

const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
        readerId: entities.reader.id,
        rendition: entities.rendition.rendition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (userId, bookId) => dispatch(fetchReadersHighlights(userId, bookId)),
        clearHighlights: () => dispatch(clearHighlights()),
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
    }
}

function HighlightsList({ toggle, highlights, fetchReadersHighlights, userId, comments, fetchComments, createComment, bookId, clearHighlights, readerId, rendition, deleteHighlight }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")
    const [width, height] = useWindowSize();

    const delayedFetch = debounce(() => fetchReadersHighlights(userId, bookId), 500)

    const updateCount = useRef(0)
    useEffect(() => {
        updateCount.current++
        if (updateCount.current > 2) delayedFetch()
    }, [width, height])

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return;
        }
        delayedFetch()
    }, [comments])

    useEffect(() => {
        fetchComments();

        return () => {
            clearHighlights()
        }
    }, [])

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const comment = {
            body,
            id,
            userId,
            parent: true,
            ancestorType: "Highlight",
            ancestorId: id,
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
                            <Comment key={comment.id} comment={comment} ancestorType={"Highlight"} ancestorId={id} />
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