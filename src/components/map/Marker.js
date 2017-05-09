import React from 'react';
import L from 'leaflet';
import {Marker as OSMarker, Icon, Popup} from 'react-leaflet';
import {Button} from 'react-bootstrap'

import A11yIcon from '../A11yIcon';
import {getElement} from '../../utils/GuiUtils'

/**
 * Marker component for the map
 */
class Marker extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            marker: props.marker,
            currentBuildingId: 0,
            zoom: props.zoom,
            isLoading: false
        };

        // init marker icons
        this.icons = {};
        this.icons.normalIcon = L.icon({
            iconUrl: './images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor:  [0, -45]
        });
        this.icons.smallIcon = L.icon({
            iconUrl: './images/small-marker-icon.png',
            iconSize: [22, 22],
            iconAnchor: [11, 22],
            popupAnchor:  [0, -45]
        });
        this.icons.selectedIcon = L.icon({
            iconUrl: './images/selected-marker-icon.png',
            iconSize: [31, 51],
            iconAnchor: [15, 51],
            popupAnchor:  [0, -45]
        });

        this.handleClickShowDetails = this.handleClickShowDetails.bind(this);
        this.handleClickMarker = this.handleClickMarker.bind(this);
        this.handleClickNextEntry = this.handleClickNextEntry.bind(this);
        this.handleClickPrevEntry = this.handleClickPrevEntry.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let currentBuildingId = 0;
        nextProps.marker.buildings.forEach((building, bid) => {
            if (building.selectOnMap) {
                currentBuildingId = bid;
            }
        })

        this.setState({
            stores: nextProps.stores,
            currentBuildingId: currentBuildingId,
            marker: nextProps.marker,
            zoom: nextProps.zoom
        });
    }

    /**
     * Click on show details button in popup may loads building data
     * and show building with loaded details in sidebar
     */
    handleClickShowDetails(e, building) {
        this.setState({isLoading: true});

        // may load building data and show details in sidebar
        super.handleEvent({
            action: 'may-load-building-data',
            payload: {
                buildingId: building.id,
            }
        }).then(() => {
            this.sidebarWithBuilding(building);

            // show building details flag
            super.handleEvent({
                action: 'show-building-details',
                payload: {
                    buildingId: building.id,
                }
            });
        });
    }

    /**
     * On click marker, set as selected on map
     * For small devices: show building entry in sidebar
     */
    handleClickMarker(e, building) {
        // building as selected
        this.setSelectedOnMap(building);

        // for small devices, show entry in sidebar
        // for normal devices, load building details in backround
        if (this.state.stores.uiStore.get('isSmallView')) {
            // show global loader (local loader is only visible in popup for desktop devices)
            this.handleEvent({
                action: 'update-ui-config',
                payload: {key: 'loader', value: true}
            });
            // show sidebar with the building
            this.sidebarWithBuilding(building);
        } else {
            super.handleEvent({
                action: 'may-load-building-data',
                payload: {
                    buildingId: building.id,
                }
            });
        }
    }

    /**
     * Next entry for multi-marker
     */
    handleClickPrevEntry(e) {
        const building = this.state.marker.buildings[this.state.currentBuildingId-1];
        this.setSelectedOnMap(building);
        e.preventDefault();
    }

    /**
     * Previous entry for multi-marker
     */
    handleClickNextEntry(e) {
        const building = this.state.marker.buildings[this.state.currentBuildingId+1];
        this.setSelectedOnMap(building);
        e.preventDefault();
    }

    /**
     * Show sidebar and scroll to the building entry
     * Set local loader and global loader to false after scrolling
     *
     * @param {Object} building Building object
     */
    sidebarWithBuilding(building) {
        super.handleEvent({
            action: 'set-current-route',
            payload: {path: 'results'}
        });
        super.handleEvent({
            action: 'show-sidebar'
        });
        // scroll to element entry in sidebar
        getElement(this.state.stores.uiStore.get('userConfig').container, `[id="result-entry-${building.id}"]`).then((entry) => {
            getElement(this.state.stores.uiStore.get('userConfig').container, `.sidebar`).then((sidebar) => {
                sidebar.scrollTop = entry.offsetTop;
                // set loaders state
                this.setState({isLoading: false});
                this.handleEvent({
                    action: 'update-ui-config',
                    payload: {key: 'loader', value: false}
                });
            });
        });
    }

    /**
     * Set building as selected on map, call the event appropriate
     */
    setSelectedOnMap(building) {
        // immediately set local property
        building.selectOnMap = true;
        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {
                buildingId: building.id,
            }
        });
    }

    /**
     * Render marker on specific position with icon, and popup content
     */
    render() {
        const isSmallView = this.state.stores.uiStore.get('isSmallView');
        const marker = this.state.marker;
        const currentBuilding = marker.buildings[this.state.currentBuildingId];
        const position = [currentBuilding.latitude, currentBuilding.longitude];

        // marker icon is normal, small or selected
        let icon = this.icons.normalIcon;
        if (currentBuilding.selectOnMap === true) {
            icon = this.icons.selectedIcon;
        }
        else if (this.state.zoom < 15) {
            icon = this.icons.smallIcon;
        }

        // create accessibility icons class
        const a11yIcons = new A11yIcon({building: currentBuilding});

        // navigation for markers with multiple entries in the same location
        const multiMarkerNav = (
            <ul className="pager">
                {this.state.currentBuildingId > 0 &&
                    <li className="previous">
                        <a role="button" href="#" onClick={this.handleClickPrevEntry}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp; vorheriges
                        </a>
                    </li>
                }
                {marker.buildings.length > 1 &&
                    <li><span>{this.state.currentBuildingId+1} von {marker.buildings.length}</span></li>
                }
                {marker.buildings.length > 1 && (this.state.currentBuildingId+1) < marker.buildings.length &&
                    <li className="next">
                        <a role="button" href="#" onClick={this.handleClickNextEntry}>
                            nächstes <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </a>
                    </li>
                }
            </ul>
        );

        return (
            <OSMarker
                position={position}
                icon={icon}
                onClick={e => this.handleClickMarker(e, currentBuilding)}
                >
                <Popup id={`popup-wrapper-${currentBuilding.id}`}>
                    <span>
                        {!isSmallView &&
                            <div id={`popup-${currentBuilding.id}`} className="popup">
                                <h3>{currentBuilding.title}</h3>

                                <ul className="a11yIcons-list">
                                    {a11yIcons.getAll().map((entry, id) => {
                                        if (a11yIcons.icon(entry) == null) {
                                            return (null);
                                        }
                                        return (<li key={id}>
                                            {a11yIcons.icon(entry)}
                                        </li>);
                                    })}
                                </ul>

                                <Button className="btn-lg" onClick={e => this.handleClickShowDetails(e, currentBuilding)}>
                                    <i className="fa fa-th-list"></i> Details&nbsp;
                                    {this.state.isLoading &&
                                        <i className='fa fa-circle-o-notch fa-spin' />
                                    }
                                </Button>

                                {marker.buildings.length > 1 &&
                                    <div className="multi-marker-nav">{multiMarkerNav}</div>
                                }
                            </div>
                        }
                    </span>
                </Popup>
            </OSMarker>
        );
    }
}

export default Marker;
