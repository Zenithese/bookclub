import React, { Component } from "react";
import { ReactReader } from "react-reader";
import { connect } from 'react-redux';
import { createHighlight } from '../actions/highlights_actions'
import { createRendition } from '../actions/rendition_actions'
import { updateBook } from '../actions/books_actions'
import { darkTheme, lightTheme } from '../assests/ereader_styles'

const storage = global.localStorage || null;

const mapDispatchToProps = dispatch => {
    return {
        createHighlight: (highlight) => dispatch(createHighlight(highlight)),
        createRendition: (rendition) => dispatch(createRendition(rendition)),
        updateBook: (id, location) => dispatch(updateBook(id, location))
    };
};

const mapStateToProps = ({ entities }, ownProps) => {
    return {
        book: entities.books[ownProps.match.params.book],
        theme: entities.settings.settings ? entities.settings.settings.theme : "light",
        userId: Object.keys(entities.users)[0],
        highlights: entities.highlights,
    }
}

class Ereader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            location:
                props.book ? props.book.location : 2,
            visible: false,
            x: 0,
            y: 0,
            cfiRange: null,
            el: null,
            lastEffectiveEvent: null
        };
        this.rendition = null;
        this.handleHighlight = this.handleHighlight.bind(this)
    }

    handleHighlight() {
        const { cfiRange } = this.state
        const { createHighlight, userId, book } = this.props
        const _this = this
        this.rendition.book.getRange(cfiRange).then(function (range) {
            var text;
            if (range) {
                text = range.toString();

                let highlight = {
                    text,
                    cfiRange,
                    userId: Number(userId),
                    bookId: book.id
                }

                createHighlight(highlight)

                _this.setState({visible: false})
            }
        })
    }

    getRendition = rendition => {

        this.rendition = rendition
        this.props.createRendition(rendition)
        const _this = this

        rendition.on("selected", function (cfiRange, contents) {
            let className = `${cfiRange}-${Math.random()}`
            rendition.annotations.remove(cfiRange, "highlight");
            rendition.annotations.highlight(cfiRange, {}, null, className, { "fill": "transparent" });

            if (_this.state.lastEffectiveEvent == "mouseup") {
                const el = document.getElementsByClassName(className)[0].firstElementChild.getBoundingClientRect()
                _this.setState({
                    visible: true,
                    x: el.x + ((el.width / 2) - 35),
                    y: el.y - 20
                })
            } else {
                _this.setState({ cfiRange: cfiRange, lastEffectiveEvent: "selected", el: document.getElementsByClassName(className)[0] })
            }

        });

        
        rendition.on("mousedown", function (event) {
            _this.setState({ visible: false, x: event.clientX, y: event.clientY, lastEffectiveEvent: "mousedown"})
        })

        rendition.on("mouseup", function (event) {
            if (_this.state.lastEffectiveEvent == "selected") {
                if (event.clientX < _this.state.x) {
                    const el = _this.state.el.firstElementChild.getBoundingClientRect()
                    _this.setState({ 
                        visible: true, 
                        x: el.x - 35,
                        y: el.y - 20
                    }) // lifting at left side of selection
                } else {
                    const el = _this.state.el.lastElementChild.getBoundingClientRect()
                    _this.setState({ 
                        visible: true, 
                        x: el.x + el.width - 35, 
                        y: el.y + 20 
                    }) // lifting at right side of selection
                }
            }

            _this.setState({ el: null, lastEffectiveEvent: "mouseup" })
        })

    }

    onLocationChanged = location => {
        this.setState(
            {
                location
            },
            () => {
                storage && storage.setItem("epub-location", location);
            }
        );
        this.props.updateBook(this.props.book.id, this.state.location)
    };

    render() {
        const { location } = this.state;
        return (
            <div style={{ position: "relative", height: "100%" }} >

                <ReactReader
                    url={this.props.book ? this.props.book.epubFile : undefined}
                    title={this.props.book ? this.props.book.title : undefined}
                    location={location}
                    locationChanged={this.onLocationChanged}
                    getRendition={this.getRendition}
                    styles={this.props.theme === "dark" ? darkTheme : lightTheme}
                />

                { this.state.visible ? 
                    <div 
                        className="tooltip" 
                        style={{ left: `${this.state.x}px`, top: `${this.state.y}px` }}>
                            <span 
                                className="popuptext" 
                                onClick={ () => this.handleHighlight() }>
                                Highlight!
                            </span>
                    </div> 
                    : null 
                }

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ereader);