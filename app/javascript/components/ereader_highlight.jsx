import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../actions/likes_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { createComment } from '../actions/comments_actions'
import { deleteHighlight } from '../actions/highlights_actions'
import Comment from './comments'

const mapStateToProps = ({ entities, session }) => {
    return {
        likes: entities.likes,
        books: entities.books,
        userId: session.id,
        rendition: entities.rendition.rendition,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
        createComment: (comment) => dispatch(createComment(comment)),
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
    }
}

function Highlight({ id, text, cfiRange, comments, i, likes, createLike, deleteLike, likesCount, likesArray, userId, highlightUserId, createComment, rendition, deleteHighlight }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")
    const [newCommentId, setNewCommentId] = useState(null)
    const [visibleComments, setVisibleComments] = useState(new Set())

    useEffect(() => {
        if (newCommentId) {
            setVisible(false);
            setBody("")
            setNewCommentId(null)
        }
    }, [comments])

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

    const handleLike = () => {
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

    const likeCount = () => {
        const count = (likes.highlights && likes.highlights[id] ? 1 : 0) + likesCount + (likesArray.includes(userId) ? -1 : 0)
        return count === 0 ? null : count
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const comment = {
            body,
            id,
            userId,
            parent: true,
            ancestorType: "Highlight",
            ancestorId: id
        }
        createComment(comment);
        setNewCommentId(id);
    }

    const commentThread = (thread, id, count) => {
        return (
            <div className="comments">
                <div className="comment">
                    <div className="comment-actions-container" style={!visible ? {} : { display: "none" }}>
                        <div
                            className="comment-icon"
                            onClick={() => {
                                setVisible(!visible)
                                if (!visibleComments.has(id)) handleVisibleComments(id)
                            }
                            }>
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                        <div
                            style={likes.highlights && likes.highlights[id] ? { color: "red" } : { color: "gray" }}
                            onClick={() => handleLike(id)}>
                            <FontAwesomeIcon icon={faHeart} /> {count}
                        </div>
                        {thread.length ?
                            <div className="show-hide-comments" onClick={() => handleVisibleComments(id)}>{!visibleComments.has(id) ? "show comments" : "hide comments"}</div>
                            : null
                        }
                    </div>
                    <div className="first-reply-area" style={visible ? {} : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <textarea type="body" placeholder="Comment on quote" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="first-reply-actions">
                            <button onClick={(e) => handleSubmit(e, id)}>Submit</button>
                            <button onClick={() => setVisible(!visible)}>cancel</button>
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

    return (
        <div className="annotation" key={i}>
            {
                userId == highlightUserId ?
                    <div className="remove-highlight" href={`#${cfiRange}`} onClick={() => handleDelete(cfiRange, id)}><span style={{ marginLeft: "3px" }}>&#x2715;</span></div>
                    : <br />
            }
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
            {commentThread(comments, id, likeCount())}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlight)