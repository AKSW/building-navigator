import React from 'react'
import {Image, Clearfix} from 'react-bootstrap';

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
                <Clearfix />
                <p class="made-with-refs">
                    Made with ♥ and <a href="https://nodejs.org/" target="_blank" aria-hidden={true}>NodeJS</a>,&nbsp;
                    <a href="https://reactjs.org/" target="_blank" aria-hidden={true}>React</a>,&nbsp;
                    <a href="http://leafletjs.com/" target="_blank" aria-hidden={true}>Leaflet</a>,&nbsp;
                    <a href="https://getbootstrap.com/" target="_blank" aria-hidden={true}>Bootstrap</a> and&nbsp;
                    <a href="https://fontawesome.com/" target="_blank" aria-hidden={true}>Font Awesome</a>.

                </p>
            </div>
        );
    }
}

export default Sponsors;
