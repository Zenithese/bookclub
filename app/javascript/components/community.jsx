import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchReaders } from '../actions/readers_actions'
import Reader from './readers';
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

function Community({ fetchReaders, readers }) {

    useEffect(() => {
        fetchReaders()
    }, [])

    return (
        <div className="community">
            {readers.map((reader, i) => {
                return (
                    <Reader username={reader.username} id={reader.id} key={i}/>
                    // <Link className="reader-link" to={`link`} >
                    //     <Reader username={reader.username} />
                    // </Link>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)