import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchReaders } from '../actions/readers_actions'
import Reader from './reader'
// import { Link } from 'react-router-dom';

const mapStateToProps = ({ entities }) => {
    return {
        readers: entities.readers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReaders: () => dispatch(fetchReaders()),
    };
};

function Readers({ fetchReaders, readers }) {

    useEffect(() => {
        fetchReaders()
    }, [])

    return (
        <div className="community">
            {readers.map((reader, i) => {
                return (
                    <Reader username={reader.username} id={reader.id} key={i} />
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Readers)