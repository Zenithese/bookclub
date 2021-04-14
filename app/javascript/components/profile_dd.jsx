import React, { useState } from 'react';
import { logout } from '../actions/session_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ entities, session }) => {
    return {
        username: entities.users[session.id].username,
        id: session.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

function ProfileDD({ username, logout, id }) {

    const [visible, setVisible] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleBlur = () => {
        if (redirect) {
            setRedirect(false)
        } else {
            setVisible(false)
        }
    }

    const dd = visible && (
        <div className="drop-down-container">
            <div className="drop-down-arrow-container">
                <div className="drop-down-arrow" />
            </div>
            <ul className="drop-down-contents">
                <div className="drop-down-username">{username}</div>
                <div className="inner-contents-container">
                    <Link
                        className="drop-down-content"
                        to={`/reader/${id}`}
                        onMouseDown={() => setRedirect(true)}
                        onClick={() => setVisible(false)}>
                        Profile
                    </Link>
                    <div className="drop-down-content" onClick={() => logout()}>Logout</div>
                </div>
            </ul>
        </div>
    )

    return (
        <div className="profile-dd-container" tabIndex="0" onBlur={handleBlur} >
            <img className="profile-dd-img" src="/default-profile-img.jpeg" alt="" onClick={() => setVisible(!visible)} />
            {dd}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDD)