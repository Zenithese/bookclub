import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'
import { fetchFollows } from '../actions/follows_actions'
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
        fetchFollows: () => dispatch(fetchFollows())
    }
}

function ReaderProfile({ readerId, fetchReadersHighlights, fetchFollows }) {

    useEffect(() => {
        fetchFollows()
        fetchReadersHighlights(readerId)
    }, [])

    return (
        <div>
            <img className="reader-img" src="/default-profile-img.jpeg" alt="" />
            <button>Follow</button>
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