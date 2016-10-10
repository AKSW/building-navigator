/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const getElementDetails = () => {
    return <p>I'm your element</p>;
};

const SidebarContainer = ({selectedElement}) => {
    const ElementDetails = getElementDetails();
    console.log('selectedElement:', selectedElement);
    return (
        <aside id="sidebar">
            I'm your sidebar ;)
            <div>
                {ElementDetails}
            </div>
        </aside>
    );
};

SidebarContainer.propTypes = {
    selectedElement: PropTypes.object
};

/*MapContainer.defaultProps = {
    config: {
        lat: 51.3412,
        lng: 12.3747,
        zoom: 13
    },
    //markers: [],
};*/

export default connect()(SidebarContainer);
