import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications, updateNotifications, updateNotification } from '../actions/notifications_actions';

const mapStateToProps = ({ entities, session }) => {
    return {
        notifications: entities.notifications
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNotifications: () => dispatch(fetchNotifications()),
        updateNotifications: () => dispatch(updateNotifications()),
        updateNotification: (id) => dispatch(updateNotification(id))
    };
};

function Notifications({ notifications, fetchNotifications, updateNotifications, updateNotification }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleClick = (id) => {
        updateNotification(id)
    }

    const dd = visible && (
        <div className="notifications-drop-down-container">
            <div className="drop-down-arrow-container">
                <div className="notifications-drop-down-arrow" />
            </div>
            <ul className="drop-down-contents">
                <div className="drop-down-username">Notifcations</div>
                <div className="inner-contents-container">
                    {notifications.map((n, i) => {
                        return (
                            <div onClick={() => handleClick(n.id)} style={!n.readAt ? {color: "red"} : {}}className="drop-down-content" key={i}>{n.actor} {n.action}</div>
                        )
                    })}
                </div>
            </ul>
        </div>
    );

    return (
        <div className="notifications-dd-container" tabIndex="0" onBlur={() => setVisible(false)} >
            <div className="notification-button" onClick={() => setVisible(!visible)} />
            <div className="notifications-red-dot" style={{display: visible ? "none" : "block"}} />
            {dd}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);