import React, { useState } from 'react';

export default function Highlight({ id, text, cfiRange, comments, bookId, i, commentThread, books }) {

    const [visibleThread, setVisibleThread] = useState(false)

    return (
        <div>
            <div className="profile-highlights-container" style={i % 2 ? { flexDirection: "row-reverse" } : {}}>
                <img className="profile-book-image" src={books[bookId].image} style={i % 2 ? { marginLeft: "20px" } : { marginRight: "20px" }} />
                <div onClick={() => setVisibleThread(!visibleThread)} className="profile-annotation" key={i}>
                    <div className="inner-profile-annotation-container">
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "left" }}>&lsquo;&lsquo;</div>
                        </div>
                        <div className="quote">
                            <span className="text">{text}</span>
                        </div>
                        <div className="apostrophe-container">
                            <div className="apostrophe" style={{ float: "right" }}>&rsquo;&rsquo;</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`thread ${visibleThread ? 'thread-open' : ''}`}>
                {commentThread(comments, id)}
            </div>
        </div>
    )
}