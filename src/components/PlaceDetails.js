/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';

const PlaceDetails = (params) => {
    //console.log('PlaceDetails-params: ', params);
    const placeId = params.place;
    return (
        <div>
            <h3>Place Details</h3>
            {placeId}
        </div>
    );
};

PlaceDetails.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};

export default PlaceDetails;
