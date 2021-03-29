import React, { useEffect } from 'react';
import SessionBook from './session_book'
import { Redirect } from "react-router-dom";

const Greeting = ({ currentUser, getCurrentUser, openModal }) => {
    useEffect(() => {
        getCurrentUser();
    }, [])

    const sessionLinks = () => (
        <div className="greeting-background">
            <div className="greeting-child">
                <SessionBook />
            </div>
        </div>

    );

    return currentUser ? <Redirect to="/search/books" /> : sessionLinks();
};

export default Greeting;