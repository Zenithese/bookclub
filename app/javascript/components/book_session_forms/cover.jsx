import React, { useState, useRef, useEffect } from 'react';

export default function Cover({ position, setPosition, setSessionOpen, defaultZ, setDefaultZ, bookmarkClicked, setBookmarkClicked, hoverClass, setHoverClass, frontFlipped, setFrontFlipped }) {

    const ref = useRef(null)

    useEffect(() => {
        if (bookmarkClicked) {
            setPosition(bookmarkClicked == "Login" ? 4 : 2)
            setFrontFlipped(true)
            setSessionOpen(true)
            setDefaultZ(2)
            setBookmarkClicked(false)
        }
    }, [bookmarkClicked])

    const handleClick = (e) => {
        if (position > 2) return
        setHoverClass("")
        setFrontFlipped(!frontFlipped)
        setSessionOpen(sessionOpen => !sessionOpen)
        if (!frontFlipped) {
            setPosition(position + 2)
            setDefaultZ(2)
        } else {
            setPosition(position - 2)
        }
    };

    const handleHover = () => {
        setHoverClass(frontFlipped ? "open-hover" : "hover")
    }

    const handleLeave = () => {
        setHoverClass("")
    }

    return (
        <div
            ref={ref}
            style={{ zIndex: frontFlipped ? 2 : defaultZ }}
            id="cover" className={`book-box-shadow ${hoverClass} ${frontFlipped ? "open-cover cover" : "cover"}`}
            onClick={handleClick}
            onMouseMove={handleHover}
            onMouseLeave={handleLeave}>
            <div className="front-back-cover-container">
                <div className={`front cover-color ${frontFlipped ? "index" : ""}`}>
                    <h1>Book Club</h1>
                </div>
                <div className={`back cover-color ${frontFlipped ? "" : "index"}`}>
                    <h1>Welcome</h1>
                </div>
            </div>
        </div>
    )
}