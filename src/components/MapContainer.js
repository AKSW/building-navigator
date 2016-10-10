/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, Marker, Popup, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';
import VisibleMarkers from '../containers/VisibleMarkers';
//import {changedMapView} from '../actions';

const MapContainer = ({config, onChangeMapView, onClickMarker}) => {
    const position = [config.lat, config.lng];

    return (
        <div onClick={() => onChangeMapView()}>
            I'm the map container...
            {/*<VisibleMarkers markers={[]} onClickMarker={onClickMarker} />*/}
            <Map center={position} zoom={config.zoom} zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright"/>
                <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                <VisibleMarkers markers={[]} onClickMarker={onClickMarker} />
            </Map>
        </div>
    );
};

MapContainer.propTypes = {
    config: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired,
    //markers: PropTypes.array,
    onChangeMapView: PropTypes.func.isRequired,
};

MapContainer.defaultProps = {
    config: {
        lat: 51.3412,
        lng: 12.3747,
        zoom: 13
    },
    //markers: [],
};

/*const mapStateToProps = (state) => {
    //console.log('State:', state);
    return {
        //markers: getVisibleMarkers(state.places),
        config: MapContainer.defaultProps.config
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeMapView: () => {
            dispatch(changedMapView());
        }
    };
};*/

//export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
export default connect()(MapContainer);
//export default MapContainer;
