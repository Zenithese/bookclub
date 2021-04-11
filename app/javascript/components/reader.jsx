import React from 'react';
import { Link } from 'react-router-dom';

export default function Reader({ username, id }) {

    return (
        <Link className="reader-container" to={`/reader/${id}`} >
            <img className="reader-img" src="/default-profile-img.jpeg" alt=""/>
            <h2>{username}</h2>
        </Link>
    )
}