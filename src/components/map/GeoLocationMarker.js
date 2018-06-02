import React from 'react';
import {Marker as OSMarker, Tooltip} from 'react-leaflet';
import MarkerIcon from './MarkerIcon'

/**
 * Marker component for the map
 */
class GeoLocationMarker extends React.Component {
    constructor(props) {
        super();

        this.state = {
            position: props.position
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            position: nextProps.position
        });
    }

    /**
     * Render marker on specific position with icon, and popup content
     */
    render() {
        const position = this.state.position;

        const markerIcon = new MarkerIcon();
        const icon = markerIcon.getIcon({
            geouserMarker: true
        });

        return (
            <OSMarker
                position={position}
                icon={icon}
            >
                <Tooltip offset={[0, 12]}><span>Dein Standort</span></Tooltip>
            </OSMarker>
        );
    }
}

export default GeoLocationMarker;
