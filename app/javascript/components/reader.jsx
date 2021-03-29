import React from 'react';
import { Link } from 'react-router-dom';

export default function Reader({ username, id }) {

    return (
        <Link to={`/reader/${id}`} >
            <img src="/default-profile-img.jpeg" alt=""/>
            <h2>{username}</h2>
        </Link>
    )
}