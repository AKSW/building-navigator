/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';

import Sidebar from '../components/Sidebar';
import {
    toggleSidebar,
    updateMainState
} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        sidebarIsVisible: state.main.sidebarIsVisible,
        children: ownProps.children,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleSidebar: () => {
            dispatch(toggleSidebar());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

