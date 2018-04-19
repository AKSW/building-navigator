/*
Several RDF helper
*/

export const getGraphUri = () => {
    return 'https://behindertenverband-leipzig.de/';
}

export const getPrefixes = () => {
    const prefixes = {
        'owl': 'http://www.w3.org/2002/07/owl#',
        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
        'xsd': 'http://www.w3.org/2001/XMLSchema#',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'geo': 'http://www.w3.org/2003/01/geo/',
        'sh': 'http://www.w3.org/ns/shacl#' ,
        'wa': 'http://semweb.mmlab.be/ns/wa#',
        'place': 'https://github.com/AKSW/leds-asp-f-ontologies/raw/master/ontologies/place/ontology.ttl#',
        'placeacess': 'https://github.com/AKSW/leds-asp-f-ontologies/raw/master/ontologies/place-accessibility/ontology.ttl#'
    };
    return prefixes;
}

export const getPrefix = (prefix) => {
    return getPrefixes()[prefix];
}