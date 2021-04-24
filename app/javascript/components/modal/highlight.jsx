import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../../actions/likes_actions';
import Comment from '../comments';
import { fetchLikes } from '../../actions/likes_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { createComment } from '../../actions/comments_actions'
import { fetchHighlight } from '../../actions/highlights_actions';

const mapStateToProps = ({ entities, session }) => {
    return {
        likes: entities.likes,
        books: entities.books,
        highlight: entities.highlight,
        userId: session.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
        fetchLikes: () => dispatch(fetchLikes()),
        createComment: (comment) => dispatch(createComment(comment)),
        fetchHighlight: (id) => dispatch(fetchHighlight(id))
    }
}

function Highlight({ id, text, cfiRange, comments, bookId, i, books, likes, createLike, deleteLike, fetchLikes, userId, createComment }) {

    const [visibleThread, setVisibleThread] = useState(false)
    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")
    const [newCommentId, setNewCommentId] = useState(null)

    useEffect(() => {
        fetchLikes();
    }, [])

    useEffect(() => {
        if (visibleForms.has(newCommentId)) {
            const newSet = new Set(visibleForms);
            newSet.delete(newCommentId);
            setVisibleForms(newSet);
        }
    }, [newCommentId])

    const handleClick = (e) => {
        if (e.target.value == "like") return;
        if (e.target.value == "comment" && visibleThread) return;
        setVisibleThread(!visibleThread)
    }

    const handleLike = () => {
        likes.highlights && likes.highlights[id] ?
            deleteLike(likes.highlights[id].id)
            : createLike("highlights", id)
    }

    const handleVisibleForm = (id) => {
        const newSet = new Set(visibleForms);
        if (visibleForms.has(id)) {
            newSet.delete(id);
            setVisibleForms(newSet);
        } else {
            newSet.add(id);
            setVisibleForms(newSet);
        }
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

    const commentThread = (thread, id) => {
        return (
            <div className="first-comments">
                <div className="comment">
                    <div className="first-reply-area" style={visibleForms.has(id) ? {} : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <textarea type="body" placeholder="Comment on quote" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="first-reply-actions">
                            <button onClick={(e) => handleSubmit(e, id)}>Submit</button>
                            <button onClick={() => handleVisibleForm(id)}>cancel</button>
                        </div>
                    </div>
                    {thread.map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment} ancestorType={"Highlight"} ancestorId={id} />
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="modal-highlights-container-container">
            <div className="modal-highlights-container" style={i % 2 ? { flexDirection: "row-reverse" } : {}}>
                <img className="profile-book-image" src={books[bookId].image} style={i % 2 ? { marginLeft: "20px" } : { marginRight: "20px" }} />
                <div onClick={handleClick} className="profile-annotation" key={i}>
                    <div className="inner-profile-annotation-container">
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "left" }}>&lsquo;&lsquo;</div>
                        </div>
                        <div className="quote">
                            <span className="text">{text}</span>
                        </div>
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "right" }}>&rsquo;&rsquo;</div>
                        </div>
                    </div>
                    <div className="highlight-comment-actions-container" >
                        <div
                            className="comment-icon"
                            onClick={() => handleVisibleForm(id)}
                            // onMouseUp={() => handleMouseUp("comment")}
                            >
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                        <div
                            onClick={handleLike}
                            // onMouseUp={() => handleMouseUp("like")}
                            style={likes.highlights && likes.highlights[id] ? { color: "red" } : { color: "gray" }}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-thread modal-thread-open">
                {commentThread(comments, id)}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlight)