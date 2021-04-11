import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { deleteHighlight, fetchReadersHighlights } from '../actions/highlights_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { fetchRendition } from '../actions/rendition_actions'
import { updateSettings } from '../actions/settings_actions'
import ReaderList from './reader_list'
import Settings from './settings'
import HighlightList from './highlight_list_old_copy'


const mapStateToProps = ({ entities, session }, ownProps) => {
    return {
        highlights: entities.highlights,
        comments: entities.comments,
        rendition: entities.rendition.rendition,
        _fontSize: entities.users[session.id].font_size,
        highlightColor: entities.users[session.id].highlight_color,
        _theme: entities.users[session.id].theme,
        id: session.id,
        bookId: ownProps.match.params.book,
        userId: Number(session.id),
        reader: entities.reader,
        book: entities.book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteHighlight: (id) => dispatch(deleteHighlight(id)),
        fetchRendition: () => dispatch(fetchRendition()),
        updateSettings: (id, color, fontSize, theme) => dispatch(updateSettings(id, color, fontSize, theme)),
        fetchReadersHighlights: (userId, bookId) => dispatch(fetchReadersHighlights(userId, bookId)),
    }
}


function Highlights({ id, highlights, _fontSize, highlightColor, _theme, fetchComments, deleteHighlight, rendition, fetchRendition, updateSettings, bookId, createComment, userId, comments, fetchReadersHighlights, reader, book }) {
    const [color, setColor] = useState(highlightColor)
    const [toggle, setToggle] = useState(false)
    const [visible, setVisible] = useState(false)
    const [settings, setSettings] = useState(false)
    const [fontSize, setFontSize] = useState(Number(_fontSize))
    const [theme, setTheme] = useState(_theme)

    useEffect(() => {
        updateSettings(id, color, fontSize, theme);
    }, [updateSettings, id, color, fontSize, theme])

    useEffect(() => {
        if (rendition) {
            highlights.forEach(highlight => {
                const { cfiRange } = highlight;
                updateHighlight(cfiRange)
            });
        }
    }, [highlights, book])

    useEffect(() => {
        if (rendition) rendition.themes.fontSize(String(fontSize) + "%")
        setHighlightsColor(color)
    }, [fontSize])

    useEffect(() => {
        fetchRendition()

        if (rendition) {
            rendition.themes.default({ 'body': { 'color': theme === "dark" ? "#999" : "black", }, });
            rendition.themes.fontSize(String(_fontSize) + "%");
        };

    }, [rendition])

    const updateHighlight = (cfiRange, updateHighlightToggle = false, c = color) => {
        rendition.annotations.remove(cfiRange, "highlight");
        rendition.annotations.highlight(cfiRange, {}, null, `${cfiRange}`,
            { "fill": updateHighlightToggle ? visible ? c : "transparent" : c, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
        );
    }

    const toggleHighlights = () => {
        setVisible(!visible);
        highlights.forEach(highlight => {
            const { cfiRange } = highlight;
            updateHighlight(cfiRange, true)
        });
    };

    const setHighlightsColor = (color) => {
        setColor(color) // selection color
        highlights.forEach(highlight => {
            const { cfiRange } = highlight;
            updateHighlight(cfiRange, false, color)
        });
    };

    const setThemeColor = (theme, textColor) => {
        setTheme(theme)
        rendition.themes.default({ 'body': { 'color': textColor, }, });
    }

    return (
        <div className={toggle ? "" : "annotations-container"}>

            <div className={toggle ? settings ? "annotations-closed-for-settings" : "annotations-opened" : settings ? "annotations-closed-for-settings-opened" : "annotations-closed"} >
                <div className="annotations-buttons" onClick={() => { setToggle(!toggle); if (settings && !toggle) {setSettings(!settings)} }}>
                    <div>{toggle ? "close" : "open"}</div>
                    <br />
                </div>
                <ReaderList bookId={bookId} />
                <HighlightList
                    toggle={toggle}
                    userId={userId}
                    bookId={bookId}
                />
            </div>

            <div className={toggle ? settings ? "toggle-button-closed-for-settings" : "toggle-button-opened" : settings ? "toggle-button-closed-for-settings" : "toggle-button"} onClick={() => { toggleHighlights() }}><FontAwesomeIcon icon={faEye} /></div>

            <Settings 
                settings={settings} 
                setSettings={setSettings} 
                toggle={toggle} 
                fontSize={fontSize} 
                theme={theme} 
                setHighlightsColor={setHighlightsColor} 
                setFontSize={setFontSize} 
                setThemeColor={setThemeColor}
            />

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);

// const [rgba, setRgba] = useState("rgba(255,255,0, 0.3)")
// rendition.themes.default({
//     '::selection': {
//         'background': rgba,
//     },
// }); // selection color

// const updateHighlights = (updateHighlightToggle = false) => {
//     if (highlights.length) {
//         highlights.forEach(highlight => {
//             const { cfiRange } = highlight;
//             rendition.annotations.remove(cfiRange, "highlight");
//             rendition.annotations.highlight(cfiRange, {}, null, `${cfiRange}`,
//                 { "fill": updateHighlightToggle ? visible ? color : "transparent" : color, "fill-opacity": "0.3", "mix-blend-mode": "multiply" }
//             );
//         });
//     };
// }

// const setThemeColor = (theme, textColor) => {
//     setTheme(theme)
//     rendition.themes.default({
//         'body': {
//             'color': textColor,
//         },
//     });
// }

    // const prevHighlightsRef = useRef();
    // useEffect(() => {
    //     prevHighlightsRef.current = highlights;
    // });
    // const prevHighlights = prevHighlightsRef.current;

    // useEffect(() => {
    //     if (rendition && prevHighlights) {
    //         replaceHighlights()
    //     } 
    // }, [bookId, highlights, rendition])

    // const replaceHighlights = (updateHighlightToggle = false) => {
    //     prevHighlights.forEach(highlight => rendition.annotations.remove(highlight.cfiRange, "highlight"))

    //     if (highlights.length) {
    //         highlights.forEach(highlight => {
    //             const { cfiRange } = highlight;
    //             updateHighlight(cfiRange, false)
    //         });
    //     }
    // }
