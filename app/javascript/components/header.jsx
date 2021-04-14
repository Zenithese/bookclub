import React from 'react';
import Search from './search';
import ProfileDD from './profile_dd';
import Notifications from './notifications';

export default function Header() {

    return (
        <div className="header">
            <h1 className="header-title" >BookClub</h1>
            <Search />
            <ProfileDD />
            <Notifications />
        </div>
    )
}