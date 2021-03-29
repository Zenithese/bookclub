import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchReaders } from '../actions/readers_actions'
import ReaderListNode from './reader_list_node';
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

function ReaderList({ fetchReaders, readers }) {

    useEffect(() => {
        fetchReaders()
    }, [])

    return (
        <div>
            {readers.map((reader, i) => {
                return (
                    <ReaderListNode username={reader.username} id={reader.id} key={i}/>
                    // <Link className="reader-link" to={`link`} >
                    //     <Reader username={reader.username} />
                    // </Link>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReaderList)