import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments_actions'
import { fetchReadersHighlights, clearHighlights } from '../actions/highlights_actions'
import useWindowSize from './window_resize_hook';
import { debounce } from 'lodash';
import { fetchLikes } from '../actions/likes_actions'
import EreaderHighlight from './ereader_highlight'

const mapStateToProps = ({ entities, session }) => {
    return {
        highlights: entities.highlights,
        userId: Number(session.id),
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: () => dispatch(fetchComments()),
        fetchReadersHighlights: (userId, bookId) => dispatch(fetchReadersHighlights(userId, bookId)),
        clearHighlights: () => dispatch(clearHighlights()),
        fetchLikes: () => dispatch(fetchLikes()),
    }
}

function HighlightsList({ highlights, fetchReadersHighlights, userId, comments, fetchComments, bookId, clearHighlights, fetchLikes, open }) {

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

    const list = highlights.length ? (
        highlights.map(({ id, text, cfiRange, comments, likesCount, likesArray }, i) => {
            return (
                <EreaderHighlight id={id} text={text} cfiRange={cfiRange} comments={comments} highlightUserId={highlights[i].userId} i={i} likesCount={likesCount} likesArray={likesArray} key={id} />
            )
        })
    ) : (
        <p>no highlights</p >
    )

    return (
        <ul className={open == "settings" ? "highlight-list-closed" : open == "annotations" ? "highlight-list-opened" : "highlight-list-closed"}>
            {list}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsList)