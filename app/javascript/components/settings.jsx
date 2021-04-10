import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function Settings({ settings, toggle, fontSize, theme, setSettings, setHighlightsColor, setFontSize, setThemeColor }) {
    

    return (
        <div className={settings ? toggle ? "" : "settings-button-opened" : toggle ? "settings-button-closed-for-toggle" : "settings-button"} onClick={() => { if (!settings) { setSettings(!settings); if (toggle && !settings) { setToggle(!toggle) } } }}>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: "20px" }} onClick={() => { setSettings(!settings); if (toggle && !settings) { setToggle(!toggle) } }} />
            <div className={settings ? "color-section" : "color-section-closed"} >
                <div className="yellow" onClick={() => { if (settings) setHighlightsColor("yellow") }}></div>
                <div className="lightgreen" onClick={() => { if (settings) setHighlightsColor("lightgreen") }}></div>
                <div className="red" onClick={() => { if (settings) setHighlightsColor("red") }}></div>
                <div className="blue" onClick={() => { if (settings) setHighlightsColor("blue") }}></div>
                <div className="purple" onClick={() => { if (settings) setHighlightsColor("purple") }}></div>
            </div>
            <div className="slider-container">
                <input type="range" min={50} max={150} value={fontSize} className="text-slider" onChange={(e) => setFontSize(e.target.value)}></input>
            </div>
            <br />
            <label className="switch" >
                <input type="checkbox" checked={theme === "dark"} onClick={() => theme === "light" ? setThemeColor("dark", "#999") : setThemeColor("light", "black")} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}