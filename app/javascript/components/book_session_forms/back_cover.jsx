import React, { useState, useEffect } from 'react';

export default function BackCover({ position, setPosition, setBookClosed, pageNum, defaultZ, setDefaultZ }) {

    const [flipped, setFlipped] = useState(false);
    const [hover, setHover] = useState("");

    useEffect(() => {
        if (!flipped) {
            setDefaultZ(pageNum)
        }
    }, [flipped, pageNum, setDefaultZ])

    const handleClick = () => {
        setFlipped(!flipped)
        setHover("")
        setBookClosed(bookClosed => !bookClosed)
        if (!flipped) {
            setPosition(position + 2)
        } else {
            setPosition(position - 2)
        }
    };

    const handleHover = () => {
        setHover(flipped ? "closed-hover" : "hover")
    }
    
    const handleLeave = () => setHover("")

    return (
        <div
            style={{ zIndex: flipped ? pageNum : defaultZ }}
            className={`book-box-shadow ${ hover } ${flipped ? "flipped-back-cover back-cover" : "back-cover"}`}
            onClick={handleClick}
            onMouseMove={handleHover}
            onMouseLeave={handleLeave}>
            <div className="front-back-cover-container">
                <div className={`front back-cover-color ${flipped ? " index" : ""}`}>
                    <h1>Welcome Back</h1>
                </div>
                <div className={`back back-cover-color ${flipped ? "" : "index"}`}>
                    <h1>About</h1>
                    <p>Book Club is an online space for reading with your peers. Where referring to the text and sharing your favorite passages, highlights and notes is encouraged. Please start reading and invite others to read along with you.</p>
                </div>
            </div>
        </div>
    )
}