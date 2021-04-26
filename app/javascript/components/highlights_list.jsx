import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'
import { fetchLikes } from '../actions/likes_actions'
import { fetchReadersHighlights, clearHighlights } from '../actions/highlights_actions'
import Comment from './comments'
import Highlight from './highlight'



const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)),
        clearHighlights: () => dispatch(clearHighlights()),
    }
}

function HighlightsList({ highlights, userId, comments, fetchComments, fetchReadersHighlights, readerId, createComment, clearHighlights, fetchLikes }) {

    const [visibleForms, setVisibleForms] = useState(new Set())
    const [body, setBody] = useState("")
    const [newCommentId, setNewCommentId] = useState(null)

    useEffect(() => {
        fetchComments();
        fetchLikes();

        return () => {
            clearHighlights()
        }
    }, [fetchComments])

    useEffect(() => {
        if (comments) {
            fetchReadersHighlights(readerId);
        }
    }, [comments, fetchReadersHighlights])

    useEffect(() => {
        if (visibleForms.has(newCommentId)) {
            const newSet = new Set(visibleForms);
            newSet.delete(newCommentId);
            setVisibleForms(newSet);
        }
    }, [highlights])

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

    const commentThread = (thread, id) => {
        return (
            <div className="first-comments">
                <div className="comment">
                    <div className="first-reply-area" style={visibleForms.has(id) ? {} : { display: "none" }} onSubmit={(e) => handleSubmit(e, id)} >
                        <textarea type="body" placeholder="Comment on quote" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="first-reply-actions">
                            <button onClick={(e) => handleSubmit(e, id)}>Submit</button>
                            <button onClick={(e) => handleVisibleForm(e, id)}>cancel</button>
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

    const list = highlights.length ? (
        highlights.map(({ id, text, cfiRange, comments, bookId, likesCount, likesArray }, i) => {
            return (
                <Highlight id={id} text={text} cfiRange={cfiRange} comments={comments} bookId={bookId} i={i} commentThread={commentThread} handleVisibleForm={handleVisibleForm} visibleForms={visibleForms} likesCount={likesCount} likesArray={likesArray} />
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <div className="profile-highlights">
            {list}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)