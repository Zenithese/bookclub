import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchReadersHighlights } from '../actions/highlights_actions'


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

function ReaderProfile({ readerId, highlights, fetchReadersHighlights }) {

    useEffect(() => {
        fetchReadersHighlights(readerId)
    }, [])

    return (
        <ul>
            {highlights.map(highlight => {
                return (
                    <div>
                        {highlight.text}
                    </div>
                )
            })}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderProfile)