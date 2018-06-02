import React, { Component } from 'react'
import {Marker as OSMarker, Icon} from 'react-leaflet';
import MarkerIcon from './MarkerIcon'

/**
 * UserMarker component for the map
 */
class UserMarker extends Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            position: props.position
        };

        this.refmarker = null;
        this.handleDragend = this.handleDragend.bind(this);
        this.handleClickMarker = this.handleClickMarker.bind(this);
    }

    /**
     * Handle marker dragging
     * @param {EVent} e
     */
    handleDragend(e) {
        const { lat, lng } = this.refmarker.leafletElement.getLatLng();

        this.setState({
            position: [lat, lng]
        });

        super.handleEvent({
            action: 'update-user-marker',
            payload: {
                latitude: lat,
                longitude: lng,
                title: ''
            }
        });
    }

    // required to prevent click on map event
    handleClickMarker(e) {
    }

    /**
     * Render marker on specific position with icon, and popup content
     */
    render() {
        const position = [this.state.position[0], this.state.position[1]];

        const markerIcon = new MarkerIcon();
        const icon = markerIcon.getIcon({
            userMarker: true
        });

        return (
            <OSMarker
                draggable={true}
                position={position}
                icon={icon}
                onDragend={this.handleDragend}
                onClick={this.handleClickMarker}
                ref={(node) => this.refmarker = node}
            />
        );
    }
}

export default UserMarker;
