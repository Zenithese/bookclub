import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { createLike, deleteLike } from '../actions/likes_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import Avatar from './avatar'
import useLikeCount from './useLikeCount'

const mapStateToProps = ({ entities, session }) => {
    return {
        userId: Number(session.id),
        comments: entities.comments,
        likes: entities.likes,
        highlights: entities.highlights,
        avatarId: session.avatarId,
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

function Comment({ comment, createComment, fetchComments, userId, comments, createLike, deleteLike, likes, highlights, ancestorType, ancestorId, avatarId }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")
    const [displayReplies, setDisplayReplies] = useState(true)
    const [update, setUpdate] = useState(false)

    const likeCount = useLikeCount(likes, "comments", comment, userId)

    const nestedComments = (comment.comments || []).map((comment) => {
        return <Comment key={comment.id} comment={comment} createComment={createComment} userId={userId} fetchComments={fetchComments} comments={comments} createLike={createLike} deleteLike={deleteLike} likes={likes} highlights={highlights} ancestorType={ancestorType} ancestorId={ancestorId} avatarId={avatarId} />
    }) // @CoderRocketFuel

    useEffect(() => {
        if (update) {
            setVisible(!visible);
            setUpdate(false);
        }
    }, [highlights])

    const handleSubmit = (id) => {
        if (!body.length) return;
        const comment = {
            body,
            id,
            userId,
            ancestorType,
            ancestorId,
        }
        createComment(comment);
        setUpdate(true)
    }

    const handleLike = () => {
        likes.comments && likes.comments[comment.id] ?
            deleteLike(likes.comments[comment.id].id)
            : createLike("comments", comment.id)
    }

    return (
        <div className="comments">
            <div className="comment-img-username-container">
                <Avatar className={"comment-reader-img"} avatarId={comment.userId == userId ? avatarId : comment.avatarId} />
                <div onClick={() => setDisplayReplies(!displayReplies)} className="comment-username">{comment.username}</div>
            </div>
            <div className="comment" key={comment.id} style={{ display: displayReplies ? "block" : "none" }}>
                <div className="comment-border" />
                <div className="comment-body">{comment.body}</div>
                <div className="comment-actions-container" style={!visible ? {} : { display: "none" }}>
                    <div className="comment-icon" onClick={() => setVisible(!visible)} ><FontAwesomeIcon icon={faComment} /></div>
                    <div
                        style={likes.comments && likes.comments[comment.id] ? { color: "red" } : { color: "gray" }}
                        onClick={handleLike}
                    ><FontAwesomeIcon icon={faHeart} /> {likeCount || null}
                    </div>
                </div>
                <div className="reply-area" style={visible ? { display: "block" } : { display: "none" }} >
                    <textarea type="body" placeholder="Reply to comment" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    <div className="first-reply-actions">
                        <button onClick={() => handleSubmit(comment.id)}>Submit</button>
                        <button onClick={() => setVisible(!visible)}>cancel</button>
                    </div>
                </div>
                {nestedComments}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);