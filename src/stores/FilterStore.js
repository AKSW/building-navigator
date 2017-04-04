class FilterStore {
    constructor(logger) {
        this.logger = logger;
        this.filters = [];

        /*
         * Search by Name
         */
        // this.add({
        //     uniqueKey: 'title',
        //     title: 'Suche',
        //     type: 'search'
        //     value: ''
        // })

        /*
         * Entrance accessible
         */
        this.add({
            id: 'entrance',
            type: 'select-one',
            title: 'Eingang',
            icon: 'home',
            aria: 'Filter, Anforderungen an den Eingangsbereich',
            valueSet: [
                {key: 'entrance-suit-f-wheelchair', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Eingangsbereich'},
                {key: 'entrance-suit-f-wheelchair', value: 1, title: 'ist teilweise rollstuhlgerecht', aria: 'Eingang ist teilweise rollstuhlgerecht'},
                {key: 'entrance-suit-f-wheelchair', value: 2, title: 'ist rollstuhlgerecht', aria: 'Eingang ist rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Lift available and/or accessible
         */
        this.add({
            id: 'lift',
            type: 'select-one',
            title: 'Aufzug',
            icon: 'elevator',
            aria: 'Filter, Anforderungen an den Aufzug',
            valueSet: [
                {key: 'lift-avail', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Aufzug'},
                {key: 'lift-avail', value: 1, title: 'ist vorhanden', aria: 'Aufzug is vorhanden'},
                {key: 'lift-suit-f-wheelchair', value: 1, title: 'ist rollstuhlgerecht', aria: 'Aufzug is rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Toilet available and/or accessible
         */
        this.add({
            id: 'toilet',
            type: 'select-one',
            title: 'Toilette',
            icon: 'toilet',
            aria: 'Filter, Anforderungen an die Toilette',
            valueSet: [
                {key: 'toilet-avail', value: 0, title: 'keine Einschränkung', arai: 'Keine Anforderungen an die Toilette'},
                {key: 'toilet-avail', value: 1, title: 'ist vorhanden', aria: 'Toilette ist vorhanden'},
                {key: 'toilet-suit-f-wheelchair', value: 1, title: 'ist teilweise rollstuhlgerecht', aria: 'Toilette ist teilweise rollstuhlgerecht'},
                {key: 'toilet-suit-f-wheelchair', value: 2, title: 'ist rollstuhlgerecht', aria: 'Toilette ist rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Parking available and/or accessible
         */
        this.add({
            id: 'parking',
            type: 'select-one',
            title: 'Parkplatz',
            icon: 'car',
            aria: 'Filter, Anforderungen an den Parkplatz',
            valueSet: [
                {key: 'parking-avail', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Parkplatz'},
                {key: 'parking-avail', value: 1, title: 'ist vorhanden', aria: 'Parkplatz ist vorhanden'},
                {key: 'parking-f-disabled-avail', value: 1, title: 'ist behindertengerecht', aria: 'Parkplatz ist behindertengerecht'},
            ],
            value: 0,
        });

        /*
         * Blind help
         */
        this.add({
            id: 'blind',
            type: 'checkbox',
            icon: 'low-vision',
            title: 'Hilfestellung für Sehgeschädigte',
            aria: 'Filter, Hilfestellung für Sehgeschädigte',
            key: 'help-for-blind',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * Hearing help
         */
        this.add({
            id: 'hearing',
            type: 'checkbox',
            icon: 'hard-of-hearing',
            title: 'Hilfestellung für Hörgeschädigte',
            aria: 'Filter, Hilfestellung für Hörgeschädigte',
            key: 'help-for-hearing-imp',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * General help
         */
        this.add({
            id: 'general',
            type: 'checkbox',
            icon: 'question',
            title: 'Allgemeine Hilfestellung',
            aria: 'Filter, Allgemeine Hilfestellung',
            key: 'general-help',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
    }

    /**
     * Get all filters
     *
     * @return Array
     */
    getAll() {
        return this.filters;
    }

    /**
     * Add new filter
     *
     * @param {Object}
     */
    add(filter) {
        this.filters.push(filter);
    }

    /**
     * Updates a filter by its key with a new selected-value.
     *
     * @param {String} Filter id
     * @param {Integer|String} Selected value of values sets, checkbox or input
     */
    update(id, value) {
        this.getAll().forEach((filter, fid) => {
            if (id == filter.id) {
                filter.value = value;
                return;
            }
        });
    }

    /**
     * Reset all filters und set to default values (see constructor)
     */
    resetAll() {
        const filterStore = new FilterStore();
        this.filters = filterStore.getAll();
    }
}

export default FilterStore;
