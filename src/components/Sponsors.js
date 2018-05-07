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
                    <a href="http://leds-projekt.de/" target="_blank">
                        <Image src="./images/logos/leds.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="https://www.bmbf.de/" target="_blank">
                        <Image src="./images/logos/bmbf.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="http://www.wachstumskerne.de/" target="_blank">
                        <Image src="./images/logos/wachstumskerne.png" />
                    </a>
                </div>
                <div className="sponsor-entry-wrapper">
                    <a href="http://aksw.org/" target="_blank">
                        <Image src="./images/logos/aksw.png" />
                    </a>
                </div>
                <Clearfix />
                <p className="made-with-refs">
                    Made with ♥ and <a href="https://nodejs.org/" target="_blank">NodeJS</a>,&nbsp;
                    <a href="https://reactjs.org/" target="_blank">React</a>,&nbsp;
                    <a href="http://leafletjs.com/" target="_blank">Leaflet</a>,&nbsp;
                    <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>,&nbsp;
                    <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>&nbsp;and&nbsp;
                    <a href="https://github.com/AKSW/building-navigator/blob/master/package.json" target="_blank">many more</a>.&nbsp;
                    <a href="https://github.com/AKSW/building-navigator/projects/3" target="_blank" className="pull-right">About the Project</a>
                </p>
            </div>
        );
    }
}

export default Sponsors;
