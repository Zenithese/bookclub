import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function Settings({ fontSize, theme, setHighlightsColor, setFontSize, setThemeColor, open, setOpen }) {
    
    const handleClick = () => {
        setOpen(open != "settings" ? "settings" : null)
    }

    return (
        <div 
            className={open == "settings" ? "settings-button-opened" : open == "annotations" ? "settings-button-closed-for-toggle" : "settings-button"}
            onClick={handleClick}>
            <div className={open == "settings" ? "" : "faCog-container"} 
                onClick={handleClick}>
                {   open == "settings" ?
                        <span>&#x2715;</span>
                        : <FontAwesomeIcon icon={faCog} style={{ fontSize: "20px" }} />
                }
            </div>
            <div className="controls-container" style={open == "settings" ? {} : { display: "none" }}>
                <div className={open == "settings" ? "color-section" : "color-section-closed"} >
                    <div className="yellow" onClick={() => setHighlightsColor("yellow")}></div>
                    <div className="lightgreen" onClick={() => setHighlightsColor("lightgreen")}></div>
                    <div className="red" onClick={() => setHighlightsColor("red")}></div>
                    <div className="blue" onClick={() => setHighlightsColor("blue")}></div>
                    <div className="purple" onClick={() => setHighlightsColor("purple")}></div>
                </div>
                <div className="slider-container">
                    <input type="range" min={50} max={150} value={fontSize} className="text-slider" onChange={(e) => setFontSize(e.target.value)}></input>
                </div>
                <br />
                <label className="switch" >
                    <input type="checkbox" checked={theme === "dark"} onChange={() => theme === "light" ? setThemeColor("dark", "#999") : setThemeColor("light", "black")} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}