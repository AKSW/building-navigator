/*eslint-disable no-console */
/*eslint max-nested-callbacks: ["error", 5]*/
/*eslint max-len: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-trailing-spaces: 0*/

import React, {PropTypes} from 'react';
import Store from './Store';
import Places from './Places';
import {connect} from 'react-redux';
import SidebarContainer from '../components/SidebarContainer';
import MapContainer from '../components/MapContainer';
import {addPlaces} from '../actions';

class BuildingNavigatorOld extends React.Component {
    constructor() {
        super();
        this.state = {
            output: null,
            places: [],
        };
        
    }  

    componentWillMount() {        
    //componentDidMount() {
        console.log('will mount');
        /*const store = new Store();
        const plc = new Places(store);
    
        store.init((count) => {
            //const triples = graph.toArray();
            if (!this.isUnmounted) {
                this.setState({
                    output: 'Yes, we have ' + count + ' triples in your graph. '
                });
            }

            plc.getPlaces((places) =>{
                console.log('Places: ', places.length);

                if (!this.isUnmounted) {
                    this.setState({
                        places
                    });
                }
            });
        });*/
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    // setNotUnmountedState(key, value) {
    //     if ( ! this.isUnmounted ) {
    //         this.setState({
    //             key: value
    //         });
    //     }
    // }

    /*render() {
        const output = this.state.output;
        const places = this.state.places;
        //console.log(this.props);
        return (            
            <div id="app">
                <header className="header">
                    <h1>The Building Navigator - {this.props.places}</h1>
                    <p>{output}</p>
                </header>                
                <OSMap test='Das ist Mein Test...' places={places} />
            </div>
        );
    }*/

    render() {
        return (
            <div></div>
        );        
    }
}

const BuildingNavigator = ({onClickMarker, addPlacesToStore, onChangeMapView}) => {
    const store = new Store();
    const plc = new Places(store);

    console.log(onClickMarker);

    console.log('TODO may init Store/Places with async middleware');
    store.init((count) => {
        plc.getPlaces((places) =>{
            console.log('Places: ', places);
            const plcs = places.map((place, key) => {
                return {
                    id: key,
                    uri: place.uri.value,
                    name: place.name.value,
                    popoverText: '',
                    lat: parseFloat(place.lat.value),
                    lng: parseFloat(place.lng.value)
                };
            });
            // finally add places to the store            
            addPlacesToStore(plcs);
        });
    });

    return (
        <div>
            <SidebarContainer selectedElement={{}} />
            <MapContainer 
                onChangeMapView={onChangeMapView}
                onClickMarker={onClickMarker}
            />
        </div>
    );
};

/*BuildingNavigator.propTypes = {
};

BuildingNavigator.defaultProps = {
};*/

const mapStateToProps = (state) => {
    //console.log('State:', state);
    return {
        //markers: getVisibleMarkers(state.places),
        //config: MapContainer.defaultProps.config
        /*onClickMarker: (id) => {
            console.log(state.places[id]);
        },*/
        //onClickMarker: onClickMarker(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeMapView: () => {
            //dispatch(changedMapView());
            console.log('changed map view');
        },
        onClickMarker: (markers, id) => {
            console.log(markers[id]);
            //console.log(SidebarContainer);
            SidebarContainer.props.selectedElement = markers[id];
            return markers[id];
        },

        addPlacesToStore: (plcs) => {
            dispatch(addPlaces(plcs));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingNavigator);
