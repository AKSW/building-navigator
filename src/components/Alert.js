import React from 'react';
import {Alert as BSAlert} from 'react-bootstrap';

const Alert = ({error}) => {
    return (
        <BSAlert bsStyle="danger">
            <strong>Fehler bei der Initialisierung des Programms:</strong><br />
            {error}
        </BSAlert>
    );
};

export default Alert;
