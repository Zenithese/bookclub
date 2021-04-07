import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        userId: Number(session.id),
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
    }
}

function Comment({ comment, createComment, fetchComments, userId, comments }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")
    const [displayReplies, setDisplayReplies] = useState(false)

    // useEffect(() => {
    //     fetchComments();
    // }, [fetchComments])

    const nestedComments = (comment.comments || []).map(comment => {
        return <Comment key={comment.id} comment={comment} createComment={createComment} userId={userId} fetchComments={fetchComments} comments={comments} />
    }) // Thank you Nick @CoderRocketFuel for the recursive functional component lesson!

    const handleSubmit = (e, id) => {
        debugger
        e.preventDefault();
        if (!body.length) return;
        const comment = {
            body,
            id,
            userId,
        }
        createComment(comment);
    }

    return (
        <div className="comments">
            <div onClick={() => setDisplayReplies(!displayReplies)} style={{fontWeight: "bold"}}>{comment.username}</div>
            
            <div className="comment" key={comment.id} style={{display: displayReplies ? "block" : "none"}}>
                <div className="comment-border" />
                <br />
                <div>{comment.body}</div>
                <br />
                <button onClick={() => setVisible(!visible)} style={!visible ? { display: "block" } : { display: "none" }}>reply</button>
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