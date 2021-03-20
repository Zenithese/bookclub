import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBookworms } from '../actions/bookworms_actions'
import Bookworm from './bookworm';
// import { Link } from 'react-router-dom';

const mapStateToProps = ({ entities }) => {
    return {
        bookworms: entities.bookworms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookworms: () => dispatch(fetchBookworms()),
    };
};

function Community({ fetchBookworms, bookworms }) {

    useEffect(() => {
        fetchBookworms()
    }, [])

    return (
        <div className="community">
            {bookworms.map((bookworm) => {
                return (
                    <Bookworm username={bookworm.username} />
                    // <Link className="bookworm-link" to={`link`} >
                    //     <Bookworm username={bookworm.username} />
                    // </Link>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)