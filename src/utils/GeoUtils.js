import Promise from 'promise-polyfill';

/**
 * Get distance of two locations
 *
 * @param {Float} Latitude of location 1
 * @param {Float} Latitude of longitude 1
 * @param {Float} Latitude of location 2
 * @param {Float} Latitude of longitude 2
 * @return {Float} Distance
 */
export const getDistance = ({lat1, lng1, lat2, lng2}) =>  {
    const R = 6371;  // radius of the earth in km
    const x = (lng2 - lng1) * Math.cos(0.5 * (lat2 + lat1));
    const y = lat2 - lat1;
    const d = R * Math.sqrt(x * x + y * y);
    return d;
};
