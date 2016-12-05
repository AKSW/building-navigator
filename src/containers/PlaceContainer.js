/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Place from '../components/Place';
import {requestPlaceById} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        doRequest: state.places.doRequest,
        place: state.places.selectedPlace,
        haveSearchResults: state.places.places.length > 0 ? true : false,
        idx: 1,
        //hasHistory: ownProps.params.place === undefined ? false: true
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(requestPlaceById(ownProps.params.place));
    return {
        onClickShowOnMap: () => {
        },
        setFocusTo: (elId) => {
            window.setTimeout(() => {
                const el = document.getElementById(elId);
                console.log('elId: ', elId, ' el', el);
                if (el !== null) {
                    el.focus();
                }
            }, 100);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Place);

