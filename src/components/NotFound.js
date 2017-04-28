import React from 'react'

/**
 * Renders a message if a ressource wasnt found
 */
class NotFound extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <h1>Nicht gefunden</h1>
                <p>Die aufgerufene Adresse ist nicht verfügbar.<br />
                Dies bedeutet entweder, dass sie einen veralteten Link aufgerufen haben
                oder sich bei Eingabe der Adresse vertippt haben.</p>
                <p>Bitte prüfen Sie die Adresse oder gehen Sie <a href="./">zur Startseite</a>.</p>
            </div>
        );
    }
}

export default NotFound;
