import React from 'react'

import Sponsors from './Sponsors'

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
                <h1>Gebäude Navigator</h1>
                <h2><i className="fa fa-meh-o" aria-hidden="true"></i> Adresse nicht gefunden</h2>
                <p>Dies bedeutet entweder, dass Sie einen veralteten Link aufgerufen haben
                oder sich bei Eingabe der Adresse vertippt haben.</p>
                <p>Bitte prüfen Sie die Adresse oder gehen Sie <a href="./">zur Startseite</a>.</p>
                <br />
                <hr />
                <br />
                <Sponsors />
            </div>
        );
    }
}

export default NotFound;
