import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../actions/likes_actions'

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

function Highlight({ id, text, cfiRange, comments, bookId, i, commentThread, handleVisibleForm, books, likes, createLike, deleteLike }) {

    const [visibleThread, setVisibleThread] = useState(false)

    const handleClick = (e) => {
        if (e.target.value == "like") return;
        if (e.target.value == "comment" && visibleThread) return; 
        setVisibleThread(!visibleThread)
    }

    const handleLike = () => {
        likes.highlights[id] ?
            deleteLike(likes.highlights[id].id)
            : createLike("highlights", id)
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
                    <div style={{ display: "flex" }} >
                        <button 
                            onClick={(e) => handleVisibleForm(e, id)}
                            value="comment">reply</button>
                        <button 
                            value="like"
                            onClick={handleLike} 
                            style={likes.highlights && likes.highlights[id] ? { backgroundColor: "red" } : {}}
                            >like
                        </button>
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