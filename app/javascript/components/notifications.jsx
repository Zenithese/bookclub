import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import { fetchNotifications, updateSeenNotifications, updateNotification, fetchUnseenNotificationCount } from '../actions/notifications_actions';
import { fetchHighlight } from '../actions/highlights_actions';

const mapStateToProps = ({ entities, ui }) => {
    return {
        notifications: entities.notifications,
        count: ui.count
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNotifications: () => dispatch(fetchNotifications()),
        updateNotification: (id) => dispatch(updateNotification(id)),
        updateSeenNotifications: () => dispatch(updateSeenNotifications()),
        fetchUnseenNotificationCount: () => dispatch(fetchUnseenNotificationCount()),
        openModal: (action) => dispatch(openModal(action)),
        fetchHighlight: (id) => dispatch(fetchHighlight(id))
    };
};

function Notifications({ notifications, fetchNotifications, updateSeenNotifications, updateNotification, fetchUnseenNotificationCount, count, openModal }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchNotifications();
        fetchUnseenNotificationCount();
    }, []);

    const handleClick = () => {
        if (count) updateSeenNotifications();
        setVisible(!visible)
    }

    const handleNotificationClick = (id, nId) => {
        updateNotification(id)
        fetchHighlight(nId)
        openModal("highlight")
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
                            <div onClick={() => handleNotificationClick(n.id, n.notifiable.ancestor.id)} style={!n.readAt ? {color: "red"} : {color: "black"}} className="drop-down-content" key={i}>{n.actor} {n.action} {n.notifiable.type}</div>
                        )
                    })}
                </div>
            </ul>
        </div>
    );

    return (
        <div className="notifications-dd-container" tabIndex="0" onBlur={() => setVisible(false)} >
            <div className="notification-button" onClick={handleClick} />
            <div className="notifications-red-dot" style={{display: count ? "block" : "none"}} >{count}</div>
            {dd}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);