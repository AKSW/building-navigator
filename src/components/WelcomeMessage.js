/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';

const backdropStyle = {
    position: 'fixed',
    background: '#999',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: 99991
};

const modalStyle = {
    zIndex: 99992
};

const WelcomeMessage = ({
    onHide
}) => {
    return (
        <div>
            <div style={backdropStyle}></div>
            <Modal.Dialog style={modalStyle}>
                <Modal.Header>
                    <Modal.Title>Willkommen!</Modal.Title>
                </Modal.Header>

                <Modal.Body tabIndex="1">
                    Hier können Sie barrierefreie Gebäude in Leipzig finden.
                    Wählen Sie dazu den gewünschten Ort und Kriterien, zum Beispiel einen Fahrstuhl aus.
                    Oder suchen Sie nach dem Namen einer Einrichtung.
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary"
                        onClick={onHide}
                    >
                        OK, beginnen
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default WelcomeMessage;
