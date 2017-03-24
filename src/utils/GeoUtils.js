import Promise from 'promise-polyfill';

/**
 * Get distance of two locations
 *
 * @oaram {Float} Latitude of location 1
 * @oaram {Float} Latitude of longitude 1
 * @oaram {Float} Latitude of location 2
 * @oaram {Float} Latitude of longitude 2
 * @return {Float} Distance
 */
export const getDistance = ({lat1, lng1, lat2, lng2}) =>  {
    /*const d = (
        Math.pow(Math.abs(parseFloat(place.lng.value) - marker.lng), 2) +
        Math.pow(Math.abs(parseFloat(place.lat.value) - marker.lat), 2)
    );
    return Math.sqrt(d);*/
    const R = 6371;  // radius of the earth in km
    const x = (lng2 - lng1) * Math.cos(0.5 * (lat2 + lat1));
    const y = lat2 - lat1;
    const d = R * Math.sqrt(x * x + y * y);
    return d;
};

/**
 * Get geo location of user via html5 geolocation API
 *
 * @deprecated, since we use the map locate() function (http://leafletjs.com/reference.html#map-locate)
 * @return Promise Object with latitude and longitude or false
 */
export const getUserGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function() {
                // geoloaction error, e.g. user avoided
                reject(false);
            });
        } else {
            reject(false);
        }
    });
};