import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'
import HighlightsList from './highlights_list'


const mapStateToProps = ({ entities }, ownProps) => {
    return {
        highlights: entities.highlights,
        readerId: ownProps.match.params.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReadersHighlights: (id) => dispatch(fetchReadersHighlights(id)), // without bookId
    }
}

function ReaderProfile({ readerId, fetchReadersHighlights }) {

    useEffect(() => {
        fetchReadersHighlights(readerId)
    }, [])

    return (
        <div>
            <HighlightsList readerId={readerId}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderProfile)