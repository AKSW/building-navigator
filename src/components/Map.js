import React from 'react';
import {Map as OSMap, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';

import Marker from './map/Marker';

/**
 * Map component
 */
class Map extends React.Component {
    constructor(props) {
        super();

        // node of the map
        this.mapNode = null;

        // local state
        this.state = {
            stores: props.stores,
            markers: [],
            sidebarIsVisible: props.stores.uiStore.get('sidebarIsVisible'),
            isLoading: false
        }

        // local event handlers
        this.handleZoomend = this.handleZoomend.bind(this);
        this.handleDragstart= this.handleDragstart.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickGeolocate = this.handleClickGeolocate.bind(this);
        this.handleLocationFound = this.handleLocationFound.bind(this);
        this.handleMoveend = this.handleMoveend.bind(this);
        this.setMapLoader = this.setMapLoader.bind(this);
    }

    /**
     * Receive props, create markersm set local state, ...
     */
    componentWillReceiveProps(nextProps) {
        let buildings = nextProps.stores.buildingStore.getVisibles();
        buildings = buildings.slice(
            nextProps.stores.uiStore.get('resultsStart'),
            nextProps.stores.uiStore.get('resultsStart') + nextProps.stores.uiStore.get('resultsSteps')
        );

        /**
         * May group markers (buildings on some location)
         * @todo may only update marker groups if bounds/buildings changed
        */
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

        // write local state with new props
        this.setState({
            stores: nextProps.stores,
            markers: mayGroupBuildings(),
            sidebarIsVisible: nextProps.stores.uiStore.get('sidebarIsVisible')
        });

        // write mapNode to mapStore
        if (this.mapNode !== null) {
            this.state.stores.mapStore.setNode(this.mapNode.leafletElement);
        }

        // revalidate map size if sidebar was toggled, prevents grey areas in map
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
     * @todo May only update map if visible buildings/map-bounds changed
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
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

    handleMoveend(e) {
        // we ca do something here after each moving (pan, drag, zoom, ...)
    }

    /**
     * Click somewhere on the map
     */
    handleClick(e) {
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

    /**
     * On users location found, pan to location, update map config and apply bounds
     */
    handleLocationFound(e) {
        if (this.mapNode == null) return;
        // pan to users location if found
        this.mapNode.leafletElement.panTo(e.latlng, {duration: 0.25});
        // set new map config and apply bounds after paning
        window.setTimeout(() => {
            this.updateMapConfig();
            this.applyBounds();
        }, 500);
    }

    handleClickGeolocate(e) {
        this.mapNode.leafletElement.locate();
    }

    /**
     * Set locale isLoading state
     *
     * @param Boolean
     */
    setMapLoader(value) {
        this.setState({isLoading: value});
    }

    /**
     * Update bounds, center and zoom in map store from this map node
     */
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

    /**
     * Apply bounds to map store
     */
    applyBounds() {
        super.handleEvent({
            action: 'apply-bounds'
        });
    }

    /**
     * Render map with control buttons and markers
     */
    render() {
        // map class depends if sidebar is visible
        const mapClass = this.state.stores.uiStore.get('sidebarIsVisible')
            ? "map-wrapper"
            : "map-wrapper map-wrapper-full";

        // map center from map store
        const mapCenter = [
            this.state.stores.mapStore.get('center').latitude,
            this.state.stores.mapStore.get('center').longitude
        ];

        // hide control buttons on mobile views, if sidebar is visible
        const hideZoomControl = this.state.stores.uiStore.get('isSmallView')
            && this.state.stores.uiStore.get('sidebarIsVisible');

        return (
            <div className={mapClass}>
                {this.state.isLoading &&
                    <div className="mapLoader-wrapper">
                        <i className='fa fa-circle-o-notch fa-spin' />
                    </div>
                }
                <div className="leaflet-control-container">
                    <div className="leaflet-bottom leaflet-right">
                        {!hideZoomControl &&
                            <button className="btn btn-default btn-lg leaflet-bar leaflet-control btn-map-geolocate"
                                title="Deinen Standort anzeigen"
                                onClick={this.handleClickGeolocate}
                                aria-hidden={true}
                            >
                                    <i className="fa fa-crosshairs" aria-hidden={true}></i>
                            </button>
                        }
                    </div>
                </div>
                <OSMap
                    ref={(node) => this.mapNode = node}
                    className="osmap"
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
                            <Marker key={mid}
                                marker={marker}
                                zoom={this.state.stores.mapStore.get('zoom')}
                                stores={this.state.stores}
                                setMapLoader={this.setMapLoader}
                            />
                        );
                    })}
                </OSMap>
            </div>
        );
    }
}

export default Map;
