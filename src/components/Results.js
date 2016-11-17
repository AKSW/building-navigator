/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import ResultsEntry from './ResultsEntry';

const Results = (params) => {
    const {places, filter, activeFilter, placesAccessAttr, onClickResult, toggleDetails} = params;

    const resultsEntries = places.map((place, id) => {
        return (
            <div key={id}>
                <ResultsEntry place={place}
                    tabIdx={2 + id} idx={1 + id}
                    filter={filter}
                    activeFilter={activeFilter}
                    placesAccessAttr={placesAccessAttr[id]}
                    placesLength={places.length}
                    toggleDetails={toggleDetails}
                    onClickResult={onClickResult} />
            </div>
        );
    });

    return (
        <div>
            <br />
            <p tabIndex="1" id="getFocus">
                <small>
                    {places.length === 0 &&
                        "Kein Ergebnis"
                    }
                    {places.length === 1 &&
                        `${places.length} Ergebnis`
                    }
                    {places.length > 1 &&
                        `${places.length} Ergebnisse`
                    }
                    {filter.search.value !== '' &&
                        ` für die Suche: "${filter.search.value}"`
                    }
                    {activeFilter === 1 &&
                        ` mit einem gesetzten Filter.`
                    }
                    {activeFilter > 1 &&
                        ` mit ${activeFilter} gesetzten Filtern.`
                    }
                </small>
            </p>
            <div>
                {resultsEntries}
            </div>
            <p>
                <Link to={'/search'}>Zurück zur Suche</Link>
                <Link to={'/map'}>Alle Ergebnisse auf Karte anzeigen</Link>
            </p>
        </div>
    );
};

Results.propTypes = {
    places: PropTypes.array.isRequired
};

export default Results;
