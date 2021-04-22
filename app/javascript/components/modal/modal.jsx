import React, { useEffect } from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import Highlight from './highlight';


function Modal({ modal, closeModal, highlight }) {

    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "scroll"
    }, [modal])

    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'highlight':
            component = (
                Object.keys(highlight).length ? 
                    <Highlight id={highlight.id} text={highlight.text} cfiRange={highlight.cfiRange} comments={highlight.comments} bookId={highlight.bookId} i={highlight.id} />
                    : null
            )
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child-container">
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </div>
    );
}

const msp = state => {
    return {
        modal: state.ui.modal,
        highlight: state.entities.highlight,
        comments: state.entities.comments,
    };
};

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        fetchHighlight: (id) => dispatch(fetchHighlight(id))
    };
};

export default connect(msp, mdp)(Modal);