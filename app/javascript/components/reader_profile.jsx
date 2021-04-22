import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchFollows, createFollow, deleteFollow } from '../actions/follows_actions'
import HighlightsList from './highlights_list'
import { fetchReader } from '../actions/readers_actions';
import Avatar from './avatar'
import AvatarList from './avatar_list';


const mapStateToProps = ({ entities, session }, ownProps) => {
    return {
        readerId: ownProps.match.params.id,
        follows: entities.follows,
        reader: entities.reader,
        currentUserId: session.id,
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

function ReaderProfile({ readerId, fetchFollows, createFollow, deleteFollow, follows, fetchReader, reader, currentUserId }) {

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
            <div className="reader-container" >
                <Avatar className={"reader-img"} avatarId={reader.avatarId} />
                {currentUserId == reader.id &&
                    <AvatarList />
                }
                <h1>{reader.username}</h1>
            </div>
            {currentUserId != reader.id && 
                <button onClick={handleClick} >
                    {follows[readerId] ? "Unfollow" : "Follow"}
                </button>
            }
            <br />
            <br />
            <HighlightsList readerId={readerId}/>
            <br />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderProfile)