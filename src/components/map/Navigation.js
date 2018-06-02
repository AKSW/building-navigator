import React from 'react'
import {MapLayer} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-control-geocoder'

/**
 * The Route Navigation component.
 * Renders a navigation route from userMarker to selected building
 */
class Navigation extends React.Component {

    constructor(props) {
        super();

        const navigation = props.stores.mapStore.get('navigation');

        this.state = {
            stores: props.stores,

            // slice duplicates the arrays, required for check if it changed
            from: Object.assign({}, navigation.from),
            to: Object.assign({}, navigation.to),
            profile: navigation.profile,
        };

        this.initializeRouting = this.updateRoute.bind(this);
        this.destroyRouting = this.destroyRoute.bind(this);
    }

    /**
     * Set state. Update route if userMarker position or profile changed
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        const nextNavigation = nextProps.stores.mapStore.get('navigation');

        if (this.state.from.latitude !== nextNavigation.from.latitude ||
            this.state.from.longitude !== nextNavigation.from.longitude ||
            this.state.profile !== nextNavigation.profile
        ) {
            this.destroyRoute();
            this.updateRoute();
        }

        this.setState({
            stores: nextProps.stores,

            from: Object.assign({}, nextNavigation.from),
            to: Object.assign({}, nextNavigation.to),
            profile: nextNavigation.profile,
        });
    }

    /**
     * Initial add route
     */
    componentDidMount() {
        this.updateRoute();
    }

    /**
     * Remove route on unmount
     */
    componentWillUnmount() {
        this.destroyRoute();

    }

    /**
     * Update current navigation route
     */
    updateRoute() {
        const {from, to} = this.state.stores.mapStore.get('navigation');
        const map = this.state.stores.mapStore.getNode();

        if (!map) {
            return;
        }

        let navProfile = 'mapbox/driving';

        switch (this.state.stores.mapStore.config.navigation.profile) {
            case 'driving':
                navProfile = 'mapbox/driving';
                break;
            case 'cycling':
                navProfile = 'mapbox/cycling';
                break;
            case 'walking':
                navProfile = 'mapbox/walking';
                break;
        }

        // create waypoints
        const plan = new L.Routing.Plan([
            L.latLng(from.latitude, from.longitude),
            L.latLng(to.latitude, to.longitude)
          ], {
            routeWhileDragging: false,
            addWaypoints: false,
            // dont show marker
            createMarker: () => { return null; },
            geocoder: L.Control.Geocoder.nominatim(),
        }).on('waypointgeocoded', (waypoint) => {
            if (waypoint.waypointIndex === 0) {
                super.handleEvent({
                    action: 'update-user-marker',
                    payload: {
                        latitude: waypoint.waypoint.latLng.lat,
                        longitude: waypoint.waypoint.latLng.lng,
                        title: waypoint.waypoint.name
                    }
                });
            }
        });

        // add navigation router
        this.route = L.Routing.control({
            plan,

            router: L.Routing.mapbox('pk.eyJ1IjoiZG9uc2kiLCJhIjoiY2pocThsMmNpNGMwdjNjbXczbGFhbnBtcSJ9.J8tzeRDqrFA1t_uWXz0AOA', {
                profile: navProfile, // mapbox/driving-traffic , mapbox/driving , mapbox/walking , or mapbox/cycling
                language: 'de'
            }),

            lineOptions: {
                styles: [{color: '#1874c7', opacity: 0.75, weight: 6.5}]
            },
        })
        .on('routesfound', (object) => {
            super.handleEvent({
                action: 'set-route-object',
                payload: {
                    routeObject: object,
                }
            });
        })
        .on('routingerror', (error) => {
            // TODO show error to user (alert)
            console.log("Error on route", error);
        });

        map.addControl(this.route);
    }

    /**
     * Remove route from map
     */
    destroyRoute() {
        const map = this.state.stores.mapStore.getNode();
        if (map) {
          map.removeControl(this.route);
        }
      }

    render() {
        return null;
    }
}

export default Navigation;