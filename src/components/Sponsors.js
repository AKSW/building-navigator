import React from 'react'
import {Image} from 'react-bootstrap';

/**
 * Show the list of sponsors
 */
class Sponsors extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="sponsors-wrapper" aria-hidden={true}>
                <p>Entwickelt im Rahmen des LEDS Projekts:</p>
                <div className="sponsor-entry-wrapper">
                    <a href="http://leds-projekt.de/" target="_blank" aria-hidden={true}>
                        <Image src="./images/logos/leds.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="https://www.bmbf.de/" target="_blank" aria-hidden={true}>
                        <Image src="./images/logos/bmbf.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="http://www.wachstumskerne.de/" target="_blank" aria-hidden={true}>
                        <Image src="./images/logos/wachstumskerne.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="http://aksw.org/" target="_blank" aria-hidden={true}>
                        <Image src="./images/logos/aksw.png" />
                    </a>
                </div>
            </div>
        );
    }
}

export default Sponsors;
