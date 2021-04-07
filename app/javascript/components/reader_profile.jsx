import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'
import { fetchFollows, createFollow, deleteFollow } from '../actions/follows_actions'
import HighlightsList from './highlights_list'
import { fetchReader } from '../actions/readers_actions';


const mapStateToProps = ({ entities }, ownProps) => {
    return {
        readerId: ownProps.match.params.id,
        follows: entities.follows,
        reader: entities.reader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (id) => dispatch(createFollow(id)),
        deleteFollow: (id) => dispatch(deleteFollow(id)),
        fetchReader: (id) => dispatch(fetchReader(id)),
    }
}

function ReaderProfile({ readerId, fetchFollows, createFollow, deleteFollow, follows, fetchReader, reader }) {

    useEffect(() => {
        fetchFollows()
        fetchReader(readerId)
    }, [])

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
            <h1>{reader.username}</h1>
            <button onClick={handleClick} >{follows[readerId] ? "Unfollow" : "Follow"}</button>
            <br />
            <br />
            <HighlightsList readerId={readerId}/>
            <br />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderProfile)