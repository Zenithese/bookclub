import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { createLike, deleteLike } from '../actions/likes_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        userId: Number(session.id),
        comments: entities.comments,
        likes: entities.likes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        createLike: (likeableType, likeableId) => dispatch(createLike(likeableType, likeableId)),
        deleteLike: (id) => dispatch(deleteLike(id)),
    }
}

function Comment({ comment, createComment, fetchComments, userId, comments, createLike, deleteLike, likes }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")
    const [displayReplies, setDisplayReplies] = useState(true)

    const nestedComments = (comment.comments || []).map((comment) => {
        return <Comment key={comment.id} comment={comment} createComment={createComment} userId={userId} fetchComments={fetchComments} comments={comments} createLike={createLike} deleteLike={deleteLike} likes={likes} />
    }) // @CoderRocketFuel

    const handleSubmit = (e, id) => {
        e.preventDefault();
        if (!body.length) return;
        const comment = {
            body,
            id,
            userId,
        }
        createComment(comment);
    }

    useState(() => {
        console.log(likes)
    }, [likes])

    const handleLike = () => {
        likes.comments[comment.id] ?
            deleteLike(likes.comments[comment.id].id)
            : createLike("comments", comment.id)
    }

    return (
        <div className="comments">
            <div className="comment-img-username-container">
                <img className="comment-reader-img" src="/default-profile-img.jpeg" alt="" />
                <div onClick={() => setDisplayReplies(!displayReplies)} className="comment-username">{comment.username}</div>
            </div>
            <div className="comment" key={comment.id} style={{display: displayReplies ? "block" : "none"}}>
                <div className="comment-border" />
                <div>{comment.body}</div>
                <br />
                <div style={{ display: "flex" }} style={!visible ? { display: "block" } : { display: "none" }}>
                    <button onClick={() => setVisible(!visible)} >reply</button>
                    <button onClick={handleLike} style={likes.comments[comment.id] ? { backgroundColor: "red" } : {}}>like</button>
                </div>
                <div style={visible ? { display: "block" } : { display: "none" }} >
                    <textarea type="body" placeholder="Reply to comment" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    <br />
                    <button onClick={(e) => handleSubmit(e, comment.id)}>Submit</button>
                    <button onClick={() => setVisible(!visible)}>cancel</button>
                </div>
                <br />
                {nestedComments}
            </div>
            <br />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);