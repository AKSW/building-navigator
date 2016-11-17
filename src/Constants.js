/**
  * Global constants
**/

// export content of db file
export const RDFfile = require('raw!../assets/db.ttl');

export const RDFfileFrmat = 'text/turtle';

export const baseUri = 'http://example.org/';

export const prefixes = `
PREFIX lePlace:<http://le-online.de/place/>
PREFIX leNs:<http://le-online.de/ontology/place/ns#>
`;
