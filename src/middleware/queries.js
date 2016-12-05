/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/
/*eslint max-len: 0*/

const graphUri = () => {
    return 'http://building-navigator.de/';
};

const prefixes = () => {
    return `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX geo: <http://www.w3.org/2003/01/geo/>
PREFIX plcOnt: <http://behindertenverband-leipzig.de/place-ontology/>
PREFIX elvOnt: <https://github.com/AKSW/leds-asp-f-ontologies/blob/master/ontologies/elevator/ontology.ttl#>
PREFIX unitMeas: <https://github.com/AKSW/leds-asp-f-ontologies/blob/master/ontologies/unit-and-measurements/ontology.ttl#>
PREFIX lePlace: <http://le-online.de/place/>
PREFIX leNs: <http://le-online.de/ontology/place/ns#>
`;
};

const limit = () => {
    /** @todo limit may depends on maps-zoom state */
    return 30;
};

const buildFilterQuery = (filter) => {
    let filterStr = '';
    const filterArr = [];
    for (const key in filter) {
        if (filter[key].active &&
            filter[key].filter !== ''
        ) {
            filterArr.push(filter[key].filter.replace(/\%s/g, filter[key].value));
        }
    }
    if (filterArr.length > 0) {
        filterStr = `FILTER(${filterArr.join(' && ')})`;
    }
    return filterStr;
};

export const getPlaces = (state) => {

    const filter = buildFilterQuery(state.filter);

    const query = `${prefixes()}
SELECT ?uri ?id ?title ?long AS ?lng ?lat
    (bif:st_distance(?geo, bif:st_point(${state.map.center.lng}, ${state.map.center.lat})) AS ?distanceFromCenter)
    ?elevatorCabineIsAvailable ?elevatorCabineLength ?elevatorCabineWidth ?elevatorDoorWidth ?elevatorCabineHighestButtonOutside ?elevatorCabineHighestButtonInside ?elevatorIsWheelchairAccessible
FROM <${graphUri()}>
WHERE {
    ?uri rdf:type plcOnt:place ;
        plcOnt:ID ?id ;
        dc:title ?title ;
        geo:long ?long ;
        geo:lat ?lat ;
        elvOnt:hasElevatorCabine ?elevatorCabineUri .
    ?elevatorCabineUri elvOnt:isAvailable ?elevatorCabineIsAvailable ;
        unitMeas:length ?elevatorCabineLengthUri ;
        unitMeas:width ?elevatorCabineWidthUri ;
        elvOnt:hasDoorWidth ?elevatorDoorWidthUri ;
        elvOnt:highestDistanceOfControlPanelButtonFromGroundInside ?elevatorCabineHighestButtonOutsideUri ;
        elvOnt:highestDistanceOfControlPanelButtonFromGroundOutside ?elevatorCabineHighestButtonInsideUri .
    ?elevatorCabineLengthUri unitMeas:cm ?elevatorCabineLength . 
    ?elevatorCabineWidthUri unitMeas:cm ?elevatorCabineWidth .
    ?elevatorDoorWidthUri unitMeas:cm ?elevatorDoorWidth .
    ?elevatorCabineHighestButtonOutsideUri unitMeas:cm ?elevatorCabineHighestButtonOutside .
    ?elevatorCabineHighestButtonInsideUri unitMeas:cm ?elevatorCabineHighestButtonInside .
    BIND (bif:st_point(xsd:float(?long), xsd:float(?lat)) as ?geo)
    BIND (
        IF((
            STR(?elevatorCabineIsAvailable) = "ja" &&
            STR(?elevatorCabineLength) > "0" &&
            STR(?elevatorCabineWidth) > "0" &&
            STR(?elevatorDoorWidth) > "0" &&
            STR(?elevatorCabineHighestButtonOutside) < "200" &&
            STR(?elevatorCabineHighestButtonInside) < "200"
        ), "ja", "nein")
        as ?elevatorIsWheelchairAccessible
    )
    ${filter}
}
ORDER BY ?distanceFromCenter
LIMIT ${limit()}`;

    return query;
};

export const placeDetails = (uri) => {
    const query = `${prefixes()}
SELECT ?address
FROM <${graphUri()}>
WHERE {
    <${uri}> <http://schema.org/streetAddress> ?streetAddress ;
        <http://schema.org/postalCode> ?postalCode ;
        <http://schema.org/addressLocality> ?addressLocality .
    BIND(CONCAT(?streetAddress, ", ", ?postalCode, " ", ?addressLocality) AS ?address)
}
`;
    return query;
};

export const getPlaceByUri = (uri) => {
    return '';
};

export const getPlaceById = (id) => {
    const query = `${prefixes()}
SELECT ?uri ?id ?title ?long AS ?lng ?lat
    ?elevatorCabineIsAvailable ?elevatorCabineLength ?elevatorCabineWidth ?elevatorDoorWidth ?elevatorCabineHighestButtonOutside ?elevatorCabineHighestButtonInside ?elevatorIsWheelchairAccessible
FROM <${graphUri()}>
WHERE {
    ?uri plcOnt:ID "${id}" ;
        plcOnt:ID ?id ;
        dc:title ?title ;
        geo:long ?long ;
        geo:lat ?lat ;
        elvOnt:hasElevatorCabine ?elevatorCabineUri .
    ?elevatorCabineUri elvOnt:isAvailable ?elevatorCabineIsAvailable ;
        unitMeas:length ?elevatorCabineLengthUri ;
        unitMeas:width ?elevatorCabineWidthUri ;
        elvOnt:hasDoorWidth ?elevatorDoorWidthUri ;
        elvOnt:highestDistanceOfControlPanelButtonFromGroundInside ?elevatorCabineHighestButtonOutsideUri ;
        elvOnt:highestDistanceOfControlPanelButtonFromGroundOutside ?elevatorCabineHighestButtonInsideUri .
    ?elevatorCabineLengthUri unitMeas:cm ?elevatorCabineLength . 
    ?elevatorCabineWidthUri unitMeas:cm ?elevatorCabineWidth .
    ?elevatorDoorWidthUri unitMeas:cm ?elevatorDoorWidth .
    ?elevatorCabineHighestButtonOutsideUri unitMeas:cm ?elevatorCabineHighestButtonOutside .
    ?elevatorCabineHighestButtonInsideUri unitMeas:cm ?elevatorCabineHighestButtonInside .
    BIND (
        IF((
            STR(?elevatorCabineIsAvailable) = "ja" &&
            STR(?elevatorCabineLength) > "0" &&
            STR(?elevatorCabineWidth) > "0" &&
            STR(?elevatorDoorWidth) > "0" &&
            STR(?elevatorCabineHighestButtonOutside) < "200" &&
            STR(?elevatorCabineHighestButtonInside) < "200"
        ), "ja", "nein")
        as ?elevatorIsWheelchairAccessible
    )
}`;

    return query;
};
