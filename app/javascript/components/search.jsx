import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { searchBooks } from '../actions/books_actions'
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        searchBooks: (query) => dispatch(searchBooks(query)),
    };
};

function Search({ searchBooks }) {

    const handleChange = (e) => {
        delayedQuery(e.target.value);
    }

    const delayedQuery = useCallback(
        debounce((query) => searchBooks(query), 500),
        []
    );

     return (
         <div className="search-container">
            <Link className="reader-link" to={`/search/readers`} >
                 <button>Readers</button>
            </Link>
            <Link className="reader-link" to={`/search/books`} >
                 <button>Books</button>
            </Link>
            <input className="search" onChange={handleChange}></input>
         </div>
     )
}

export default connect(null, mapDispatchToProps)(Search)