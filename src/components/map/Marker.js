import React from 'react';
import L from 'leaflet';
import {Marker as OSMarker, Icon, Popup} from 'react-leaflet';

const normalIcon = L.icon({
    iconUrl: './images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor:  [0, -45]
});

const smallIcon = L.icon({
    iconUrl: './images/small-marker-icon.png',
    iconSize: [15, 16],
    iconAnchor: [7, 16],
    popupAnchor:  [0, -6]
});

class Marker extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            building: props.building,
            zoom: props.zoom
        };

        this.handleShowDetails = this.handleShowDetails.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({zoom: nextProps.zoom});
    }

    handleShowDetails(e) {
        super.handleEvent({
            action: 'load-building-data',
            payload: {
                buildingId: e.target.getAttribute('data-building-id'),
            }
        });
    }

    render() {
        const building = this.state.building;
        const position = [building.latitude, building.longitude];
        //console.log('Marker zoom: ', this.state.zoom);
        const icon = this.state.zoom < 15 ? smallIcon : normalIcon;

        return (
            <OSMarker
                position={position}
                icon={icon}
                >
                <Popup>
                    <span>
                        <h3>{building.title}</h3>
                        <a href="#" data-building-id={building.id} onClick={this.handleShowDetails}>Details</a>
                    </span>
                </Popup>
            </OSMarker>
        );
    }
}

export default Marker;
