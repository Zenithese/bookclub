import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../actions/likes_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { createComment } from '../actions/comments_actions'
import Comment from './comments'
import useLikeCount from './useLikeCount'

const mapStateToProps = ({ entities, session }) => {
    return {
        likes: entities.likes,
        books: entities.books,
        userId: session.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
        createComment: (comment) => dispatch(createComment(comment)),
    }
}

function Highlight({ highlight, id, text, cfiRange, comments, bookId, i, books, likes, createLike, deleteLike, userId, createComment }) {

    const [visibleThread, setVisibleThread] = useState(false)
    const [cancelClick, setCancelClick] = useState(false)
    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")
    const [newCommentId, setNewCommentId] = useState(null)

    const likeCount = useLikeCount(likes, "highlights", highlight, userId)

    useEffect(() => {
        if (newCommentId) {
            setVisible(false);
            setBody("")
            setNewCommentId(null)
        }
    }, [comments])

    const handleClick = (e) => {
        if (cancelClick) {
            setCancelClick(false)
            return
        }
        setVisibleThread(!visibleThread)
        if (visibleThread && visible) setVisible(false)
    }

    const handleLike = () => {
        likes.highlights && likes.highlights[id] ?
            deleteLike(likes.highlights[id].id)
            : createLike("highlights", id)
    }

    const handleMouseUp = (type) => {
        if (type == "comment" && !visibleThread) return;
        setCancelClick(true)
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
                    <div className="first-reply-area" style={visible ? {} : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <textarea type="body" placeholder="Comment on quote" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="first-reply-actions">
                            <button onClick={(e) => handleSubmit(e, id)}>Submit</button>
                            <button onClick={() => setVisible(false)}>cancel</button>
                        </div>
                    </div>
                    {thread.length ?
                        thread.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment} ancestorType={"Highlight"} ancestorId={id} />
                            )
                        })
                        : <div>Feeling empty here</div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="profile-highlights-container" style={i % 2 ? { flexDirection: "row-reverse" } : {}}>
                <img className="profile-book-image" src={books[bookId].image} style={i % 2 ? { marginLeft: "20px" } : { marginRight: "20px" }} />
                <div onClick={handleClick} className="profile-annotation" >
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
                            onClick={() => setVisible(!visible)}
                            onMouseUp={() => handleMouseUp("comment")}>
                                <FontAwesomeIcon icon={faComment} /> 
                        </div>
                        <div
                            onClick={handleLike} 
                            onMouseUp={() => handleMouseUp("like")}
                            style={likes.highlights && likes.highlights[id] ? { color: "red" } : { color: "gray"}}>
                                <FontAwesomeIcon icon={faHeart} /> {likeCount || null}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`thread ${visibleThread ? 'thread-open' : ''}`}>
                {commentThread(comments, id)}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlight)