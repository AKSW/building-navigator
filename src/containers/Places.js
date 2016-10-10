/*eslint-disable no-console */

/*
 * Contains functionality to get places from the data source (Store.js) using SPARQL.
 */

export default class Places {
    constructor(store) {
        this.locations = [];
        this.store = store;
        console.log('TODO: rewrite Places.js');
    }

    getPlaces(callback) {
        /*const query = 'PREFIX lePlace:<http://le-online.de/place/> \
                SELECT DISTINCT ?s \
                FROM NAMED <http://example.org/> { GRAPH ?g { ?s ?p ?o } } \
                LIMIT 10 \
            ';*/
        const query = 'PREFIX lePlace:<http://le-online.de/place/> \
            PREFIX leNs:<http://le-online.de/ontology/place/ns#> \
            SELECT ?uri ?name ?lat ?lng \
            FROM NAMED <http://example.org/> { GRAPH ?g { \
                ?uri leNs:placeName ?name ; leNs:lat ?lat ; leNs:lng ?lng \
            } } LIMIT 10 \
        ';
        this.store.execute(query, (result) => {
            //console.log('Query result: ', result);
            /*store.getGraph((graph) => {
                console.log('Graph: ', graph);
            });*/
            this.locations = result;

            callback(this.locations);

            /*if ( ! this.isUnmounted ) {
                this.setState({
                    output: this.state.output + 'Query returns ' + result.length + ' triple. '
                });
            }*/
        });
    }
}
