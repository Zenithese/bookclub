import React, { useState } from 'react';
import Cover from './cover';
import Page from './page';
import BackCover from './back_cover';

export default function SessionBook() {

    const [sessionOpen, setSessionOpen] = useState(false)
    const [position, setPosition] = useState(0)
    const [bookClosed, setBookClosed] = useState(false)
    const [defaultZ, setDefaultZ] = useState(0)
    const [bookmarkClicked, setBookmarkClicked] = useState(false)
    const [hoverClass, setHoverClass] = useState("")
    const [frontFlipped, setFrontFlipped] = useState(false)

    // useEffect(() => console.log(position))

    return (
        <div className={sessionOpen ? `session-cover session-cover-open ${bookClosed ? "back-of-book" : ""}` : "session-cover"}>
            <BackCover position={position} setPosition={setPosition} setBookClosed={setBookClosed} pageNum={6} defaultZ={defaultZ} setDefaultZ={setDefaultZ} />
            <Page position={position} setPosition={setPosition} pageNum={4} defaultZ={defaultZ} setDefaultZ={setDefaultZ} bookmarkClicked={bookmarkClicked} setBookmarkClicked={setBookmarkClicked} setHoverClass={setHoverClass} frontFlipped={frontFlipped} />
            <Cover position={position} setPosition={setPosition} setSessionOpen={setSessionOpen} defaultZ={defaultZ} setDefaultZ={setDefaultZ} bookmarkClicked={bookmarkClicked} setBookmarkClicked={setBookmarkClicked} hoverClass={hoverClass} setHoverClass={setHoverClass} frontFlipped={frontFlipped} setFrontFlipped={setFrontFlipped} />
        </div>
    )
}