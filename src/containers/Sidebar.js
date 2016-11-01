/*eslint-disable no-console */
/*eslint max-nested-callbacks: ["error", 5]*/
/*eslint max-len: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-trailing-spaces: 0*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SidebarComponent from '../components/SidebarComponent';
import {getPlace} from '../actions';

const mapStateToProps = (state) => {
    //console.log('State:', state);
    return {
        selectedPlace: state.selectedPlace
    };
};

/*const mapDispatchToProps = (dispatch) => {
    return {
    };
};*/

export default connect(mapStateToProps)(SidebarComponent);
