import React from 'react';
import {Map as OSMap, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';

import Marker from './map/Marker';

class Map extends React.Component {
    constructor(props) {
        super();

        this.state = {
            buildings: [],
            mapStore: props.stores.mapStore
        }

        this.handleZoomend = this.handleZoomend.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            buildings: nextProps.stores.buildingStore.getVisibles()
        });
    }

    /**
     * @todo Map should only update if visible buildings changed
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    updateMapConfig() {
        const osmap = this.mapNode.leafletElement;
        super.handleEvent({
            action: 'update-map-config',
            payload: {
                center: {
                    latitude: osmap.getCenter().lat,
                    longitude: osmap.getCenter().lng
                },
                zoom: osmap.getZoom()
            }
        });
    }

    handleZoomend(e) {
        this.updateMapConfig();
    }

    handleDragend(e) {
        this.updateMapConfig();
    }

    render() {
        const mapCenter = [this.state.mapStore.get('center').latitude, this.state.mapStore.get('center').longitude];

        const markers = this.state.buildings.map((building) => {
            return (
                <Marker key={building.id} building={building} zoom={this.state.mapStore.get('zoom')} />
            );
        });
        return (
            <div className="map-wrapper">
                <OSMap
                    ref={(node) => { this.mapNode = node; }}
                    className="map"
                    center={mapCenter}
                    zoom={this.state.mapStore.get('zoom')}
                    zoomControl={false}
                    onZoomend={this.handleZoomend}
                    onDragend={this.handleDragend}
                >
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    <ZoomControl position="topright"/>
                    <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                    {markers}
                </OSMap>
            </div>
        );
    }
}

export default Map;
