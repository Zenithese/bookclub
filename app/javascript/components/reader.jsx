import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar'

export default function Reader({ username, id, avatarId }) {

    return (
        <Link className="reader-container" to={`/reader/${id}`} >
            <Avatar className={"reader-img"} avatarId={avatarId} />
            {/* <img className="reader-img" src="/default-profile-img.jpeg" alt=""/> */}
            <h2>{username}</h2>
        </Link>
    )
}