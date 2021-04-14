import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { searchBooks } from '../actions/books_actions'
import { NavLink } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        searchBooks: (query) => dispatch(searchBooks(query)),
    };
};

function Search({ searchBooks }) {

    const ref = useRef(null)

    const handleClick = () => {
        ref.current.focus()
    }

    const handleChange = (e) => {
        delayedQuery(e.target.value);
    }

    const delayedQuery = useCallback(
        debounce((query) => searchBooks(query), 500),
        []
    );

     return (
         <div className="search-container">
             <NavLink className="reader-link" to={`/search/books`} onClick={handleClick}>
                Books
            </NavLink>
             <NavLink className="reader-link" to={`/search/readers`} onClick={handleClick}>
                Readers
            </NavLink>
            <input ref={ref} className="search" onChange={handleChange}></input>
         </div>
     )
}

export default connect(null, mapDispatchToProps)(Search)