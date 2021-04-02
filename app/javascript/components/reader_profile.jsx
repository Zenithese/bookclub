import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'
import { fetchFollows, createFollow, deleteFollow } from '../actions/follows_actions'
import HighlightsList from './highlights_list'


const mapStateToProps = ({ entities }, ownProps) => {
    return {
        highlights: entities.highlights,
        readerId: ownProps.match.params.id,
        follows: entities.follows,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)), // without bookId
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (id) => dispatch(createFollow(id)),
        deleteFollow: (id) => dispatch(deleteFollow(id)),
    }
}

function ReaderProfile({ readerId, fetchReadersHighlights, fetchFollows, createFollow, deleteFollow, follows }) {

    useEffect(() => {
        fetchFollows()
        fetchReadersHighlights(readerId)
    }, [])

    // useEffect(() => {
    //     if (follows) {

    //     }
    // }, [follows])

    const handleClick = () => {
        if (follows[readerId]) {
            deleteFollow(follows[readerId]["id"])
        } else {
            createFollow(readerId)
        }
    }

    return (
        <div>
            <img className="reader-img" src="/default-profile-img.jpeg" alt="" />
            <button onClick={handleClick} >{follows[readerId] ? "Unfollow" : "Follow"}</button>
            <br />
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <div>Highlights</div>
                <div>Reading</div>
                <div>Reading</div>
            </div>
            <br />
            <HighlightsList readerId={readerId}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderProfile)