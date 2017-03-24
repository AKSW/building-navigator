import React from 'react';
import {Map as OSMap, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';

import Marker from './map/Marker';

class Map extends React.Component {
    constructor(props) {
        super();

        this.mapNode = null;

        this.state = {
            stores: props.stores,
            markers: [],
            sidebarIsVisible: props.stores.uiStore.get('sidebarIsVisible')
        }

        this.handleZoomend = this.handleZoomend.bind(this);
        this.handleDragstart= this.handleDragstart.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLocationFound = this.handleLocationFound.bind(this);
        this.handleMoveend = this.handleMoveend.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let buildings = nextProps.stores.buildingStore.getVisibles();
        buildings = buildings.slice(
            nextProps.stores.uiStore.get('resultsStart'),
            nextProps.stores.uiStore.get('resultsStart') + nextProps.stores.uiStore.get('resultsSteps')
        );

        // @todo only update marker groups if bounds/buildings changed
        const mayGroupBuildings = () => {
            const markers = [];
            buildings.map((building, bid) => {
                let newMarkerType = 'normal';
                const newMarker = {
                    type: newMarkerType,
                    latitude: building.latitude,
                    longitude: building.longitude,
                    buildings: []
                };

                markers.map((marker) => {
                    if (marker.latitude == building.latitude && marker.longitude == building.longitude) {
                        newMarkerType = 'multi';
                        marker.type = newMarker;
                        marker.buildings.push(building);
                        return;
                    }
                });

                if (newMarkerType == 'normal') {
                    newMarker.buildings.push(building);
                    markers.push(newMarker);
                }
            });
            return markers;
        }

        this.setState({
            stores: nextProps.stores,
            markers: mayGroupBuildings(),
            sidebarIsVisible: nextProps.stores.uiStore.get('sidebarIsVisible')
        });

        if (this.mapNode !== null) {
            this.state.stores.mapStore.setNode(this.mapNode.leafletElement);
        }

        // revalidate map size if sidebar was toggled, prevents grey areas
        if (this.mapNode !== null &&
            this.state.sidebarIsVisible != nextProps.stores.uiStore.get('sidebarIsVisible')
        ) {
            window.setTimeout(() => {
                this.mapNode.leafletElement.invalidateSize();
            }, 0);
        }
    }

    componentDidMount() {
        if (this.mapNode == null) return;
        // try to geolocate user on start
        this.mapNode.leafletElement.locate();
    }

    /**
     * @todo Map should only update if visible buildings changed
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    updateMapConfig() {
        if (this.mapNode == null) return;
        const osmap = this.mapNode.leafletElement;
        // get bounds of map and decrease size with mapPadding
        const bounds = osmap.getBounds().pad(this.state.stores.uiStore.get('mapPadding'));
        super.handleEvent({
            action: 'update-map-config',
            payload: {
                bounds: {
                    northEast: {
                        latitude: bounds._northEast.lat,
                        longitude: bounds._northEast.lng,
                    },
                    southWest: {
                        latitude: bounds._southWest.lat,
                        longitude: bounds._southWest.lng
                    }
                },
                center: {
                    latitude: osmap.getCenter().lat,
                    longitude: osmap.getCenter().lng
                },
                zoom: osmap.getZoom()
            }
        });
    }

    applyBounds() {
        super.handleEvent({
            action: 'apply-bounds'
        });
    }

    handleZoomend(e) {
        this.updateMapConfig();
        this.applyBounds();
    }

    handleDragstart() {
        if (this.mapNode != null) {
            this.mapNode.leafletElement.closePopup();
        }

    }

    handleDragend(e) {
        this.updateMapConfig();
        this.applyBounds();
    }

    handleClick(e) {
        // @todo may first test if any building is selected
        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {
                buildingId: null,
            }
        });
        if (this.state.stores.uiStore.get('isSmallView') && this.state.stores.uiStore.get('sidebarIsVisible')) {
            super.handleEvent({
                action: 'hide-sidebar'
            });
        }
    }

    handleLocationFound(e) {
        if (this.mapNode == null) return;
        // pan to users location if found
        this.mapNode.leafletElement.panTo(e.latlng, {duration: 0.25});
        window.setTimeout(() => {
            this.updateMapConfig();
            this.applyBounds();
        }, 500);
    }

    handleMoveend(e) {
    }

    render() {
        const mapClass = this.state.stores.uiStore.get('sidebarIsVisible') ? "map-wrapper" : "map-wrapper map-wrapper-full";
        const mapCenter = [this.state.stores.mapStore.get('center').latitude, this.state.stores.mapStore.get('center').longitude];
        const hideZoomControl = this.state.stores.uiStore.get('isSmallView') && this.state.stores.uiStore.get('sidebarIsVisible');
        return (
            <div className={mapClass}>
                <OSMap
                    ref={(node) => this.mapNode = node}
                    className="map"
                    center={mapCenter}
                    zoom={this.state.stores.mapStore.get('zoom')}
                    zoomControl={false}
                    onClick={this.handleClick}
                    onLocationfound={this.handleLocationFound}
                    onZoomend={this.handleZoomend}
                    onDragstart={this.handleDragstart}
                    onDragend={this.handleDragend}
                    onMoveend={this.handleMoveend}
                >
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    {!hideZoomControl &&
                        <ZoomControl position="topright"/>
                    }
                    {!hideZoomControl &&
                        <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                    }
                    {this.state.markers.map((marker, mid) => {
                        return (
                            <Marker key={mid} marker={marker} zoom={this.state.stores.mapStore.get('zoom')} stores={this.state.stores} />
                        );
                    })}
                </OSMap>
            </div>
        );
    }
}

export default Map;
