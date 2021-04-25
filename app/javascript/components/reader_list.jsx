import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchReaders } from '../actions/readers_actions';
import ReaderListNode from './reader_list_node';
import { fetchReadersHighlights } from '../actions/highlights_actions';
import { fetchFollows } from '../actions/follows_actions';

const mapStateToProps = ({ entities, session }) => {
    return {
        readers: entities.readers.filter(reader => entities.follows[reader.id]),
        highlights: entities.highlights,
        rendition: entities.rendition.rendition,
        currentUser: entities.users[session.id]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFollows: () => dispatch(fetchFollows()),
        fetchReaders: () => dispatch(fetchReaders()),
        fetchReadersHighlights: (id, bookId) => dispatch(fetchReadersHighlights(id, bookId)),
    };
};

function ReaderList({ fetchReaders, readers, bookId, highlights, rendition, fetchReadersHighlights, currentUser, fetchFollows, open }) {

    useEffect(() => {
        fetchFollows()
        fetchReaders()
    }, [])

    const handleSelect = (e) => {
        const reader = e.target.value == "currentUser" ? currentUser : readers[e.target.value]
        highlights.forEach(highlight => rendition.annotations.remove(highlight.cfiRange, "highlight"))
        fetchReadersHighlights(reader.id, bookId)
    }

    return (
        <div style={{ height: "3%", display: open == "annotations" ? "block" : "none"}}>
            <div style={{ paddingTop: "2px"}}>
                <label for="readers" >Select from follows:</label >
                <select name="readers" id="reader-select" onChange={handleSelect}>
                    <option value="currentUser">
                        {currentUser.username}
                    </option>
                    {readers.map((reader, i) => {
                        return (
                            <option value={i}>
                                {reader.username}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderList)