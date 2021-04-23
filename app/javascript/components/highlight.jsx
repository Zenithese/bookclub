import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../actions/likes_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = ({ entities, session }) => {
    return {
        likes: entities.likes,
        books: entities.books,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
    }
}

function Highlight({ id, text, cfiRange, comments, bookId, i, commentThread, handleVisibleForm, visibleForms, books, likes, createLike, deleteLike, el }) {

    const [visibleThread, setVisibleThread] = useState(false)
    const [cancelClick, setCancelClick] = useState(false)

    useEffect(() => {
        if (!visibleThread && visibleForms.has(id)) {
            handleVisibleForm(id)
        }
    }, [visibleThread])

    const handleClick = (e) => {
        if (cancelClick) {
            setCancelClick(false)
            return
        }
        setVisibleThread(!visibleThread)
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

    return (
        <div>
            <div className="profile-highlights-container" style={i % 2 ? { flexDirection: "row-reverse" } : {}}>
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
                            onMouseUp={() => handleMouseUp("comment")}>
                                <FontAwesomeIcon icon={faComment} /> 
                        </div>
                        <div
                            onClick={handleLike} 
                            onMouseUp={() => handleMouseUp("like")}
                            style={likes.highlights && likes.highlights[id] ? { color: "red" } : { color: "gray"}}>
                                <FontAwesomeIcon icon={faHeart} />
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