import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights, clearHighlights, deleteHighlight } from '../actions/highlights_actions'
import Comment from './comments'
import useWindowSize from './window_resize_hook';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { fetchLikes, createLike, deleteLike } from '../actions/likes_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
        readerId: entities.reader.id,
        rendition: entities.rendition.rendition,
        likes: entities.likes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (userId, bookId) => dispatch(fetchReadersHighlights(userId, bookId)),
        clearHighlights: () => dispatch(clearHighlights()),
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
        fetchLikes: () => dispatch(fetchLikes()),
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
    }
}

function HighlightsList({ toggle, highlights, fetchReadersHighlights, userId, comments, fetchComments, createComment, bookId, clearHighlights, readerId, rendition, deleteHighlight, likes, fetchLikes, createLike, deleteLike, settings }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")
    const [visibleComments, setVisibleComments] = useState(new Set())

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
        fetchLikes();

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

    const handleVisibleComments = (id) => {
        const newSet = new Set(visibleComments);
        if (visibleComments.has(id)) {
            newSet.delete(id);
            setVisibleComments(newSet);
        } else {
            newSet.add(id);
            setVisibleComments(newSet);
        }
    }

    const handleLike = (id) => {
        likes.highlights && likes.highlights[id] ?
            deleteLike(likes.highlights[id].id)
            : createLike("highlights", id)
    }

    const handleDelete = (cfiRange, id) => {
        const confirmed = window.confirm("Permanently delete highlight?")
        if (confirmed) {
            rendition.annotations.remove(cfiRange, "highlight");
            deleteHighlight(id)
        }
    }

    const commentThread = (thread, id) => {
        return (
            <div className="comments">
                <div className="comment">
                    <div className="comment-actions-container" style={!visibleForms.has(id) ? {} : { display: "none" }}>
                        <div
                            className="comment-icon"
                            onClick={(e) => handleVisibleForm(e, id)}>
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                        <div
                            style={likes.highlights && likes.highlights[id] ? { color: "red" } : { color: "gray" }}
                            onClick={() => handleLike(id)}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        {thread.length ? 
                            <div className="show-hide-comments" onClick={() => handleVisibleComments(id)}>{ !visibleComments.has(id) ? "show comments" : "hide comments" }</div>
                            : null
                        }
                    </div>
                    <div className="first-reply-area" style={visibleForms.has(id) ? {} : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <textarea type="body" placeholder="Comment on quote" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="first-reply-actions">
                            <button onClick={(e) => handleSubmit(e, id)}>Submit</button>
                            <button onClick={(e) => handleVisibleForm(e, id)}>cancel</button>
                        </div>
                    </div>
                    {visibleComments.has(id) && thread.map(comment => {
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
                    <br />
                    <div className="quote">
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "left" }}>&lsquo;&lsquo;</div>
                        </div>
                        <div 
                            href={`#${cfiRange}`} 
                            onClick={() => { rendition.display(cfiRange) }}
                            className="quote-text">
                                {text}
                        </div>
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "right" }}>&rsquo;&rsquo;</div>
                        </div>
                    </div>
                    {commentThread(comments, id)}
                    {/* <div className="remove-highlight" href={`#${cfiRange}`} onClick={() => handleDelete(cfiRange, id)}>delete</div> */}
                </div>
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <ul className={toggle ? settings ? "highlight-list-closed" : "highlight-list-opened" : "highlight-list-closed"}>
            {list}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)