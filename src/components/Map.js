import React from 'react';
import {Map as OSMap, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';

import Marker from './map/Marker';

/**
 * Map component, renders Leaflet map with buildings as markers
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
            lazyPreloader: null
        }

        // local event handlers
        this.handleZoomstart = this.handleZoomstart.bind(this);
        this.handleZoomend = this.handleZoomend.bind(this);
        this.handleDragstart= this.handleDragstart.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickGeolocate = this.handleClickGeolocate.bind(this);
        this.handleLocationFound = this.handleLocationFound.bind(this);
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
         * Create markers from buildings
         * Put buildings on same location into a multi-marker
        */
        const createMarkers = () => {
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
            markers: createMarkers(),
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

    handleZoomstart(e) {
        this.closePopup();
    }

    handleZoomend(e) {
        this.updateMapConfig();
        this.applyBounds();
    }

    handleDragstart() {
        this.closePopup();
    }

    handleDragend(e) {
        this.updateMapConfig();
        this.applyBounds();
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
        const panToDuration = 0.25; // panTo duration in seconds
        // pan to users location if found
        this.mapNode.leafletElement.panTo(e.latlng, {duration: panToDuration});
        // set new map config and apply bounds after paning
        window.setTimeout(() => {
            this.updateMapConfig();
            this.applyBounds();
        }, 2000 * panToDuration); // after 2 x panTo in ms
    }

    /**
     * Click on button show own location
     */
    handleClickGeolocate(e) {
        this.closePopup();
        this.mapNode.leafletElement.locate();
    }

    /**
     * Closes all may previous opened popups
     */
    closePopup() {
        if (this.mapNode == null) return;
        this.mapNode.leafletElement.closePopup();
    }

    /**
     * Update bounds, center and zoom in map store from this map node
     */
    updateMapConfig() {
        if (this.mapNode == null) return;
        const osmap = this.mapNode.leafletElement;

        // get bounds of map and decrease size with mapPadding
        const bounds = osmap.getBounds().pad(this.state.stores.mapStore.get('mapPadding'));
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

        // preloading visible buildings, after 2,5 Sek timout, destroy on change map
        // TODO doenst work on paginate results
        clearTimeout(this.lazyPreloader);
        this.lazyPreloader = setTimeout(() => {
            this.preloadBuildings();
        }, 2500);
    }

    /**
     * Apply map bounds to the buildings
     */
    applyBounds() {
        super.handleEvent({
            action: 'apply-bounds'
        });
    }

    /**
     * Preload visible buildings
     */
    preloadBuildings() {
        let buildings = this.state.stores.buildingStore.getVisibles();
        buildings = buildings.slice(
            this.state.stores.uiStore.get('resultsStart'),
            this.state.stores.uiStore.get('resultsStart') + this.state.stores.uiStore.get('resultsSteps')
        );

        super.handleEvent({
            action: 'may-load-multiple-buildings-data',
            payload: {
                buildings: buildings,
            }
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

        // tiles url (http or https)
        const tilesUrl = document.location.protocol === 'https'
            ? 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            : 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

        // maps current zoom state
        const zoom = this.state.stores.mapStore.get('zoom');

        return (
            <div className={mapClass}>
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
                    zoom={zoom}
                    zoomControl={false}
                    onClick={this.handleClick}
                    onLocationfound={this.handleLocationFound}
                    onZoomstart={this.handleZoomstart}
                    onZoomend={this.handleZoomend}
                    onDragstart={this.handleDragstart}
                    onDragend={this.handleDragend}
                >
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' url={tilesUrl} />
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
                            />
                        );
                    })}
                </OSMap>
            </div>
        );
    }
}

export default Map;
