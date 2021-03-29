import React from 'react';
import Search from './search'

export default function Header() {

    return (
        <div className="header">
            <h1 className="header-title" >BookClub</h1>
            <Search />
        </div>
    )
}