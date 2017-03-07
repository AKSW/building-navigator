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
        //     value: ''
        // })

        /*
         * Entrance accessible
         */
        this.add({
            id: 'entrance',
            title: 'Eingang',
            aria: 'Aktueller Filter, Anforderungen an den Eingangsbereich',
            valueSet: [
                {title: 'keine Einschränkung', key: 'entrance-suit-f-wheelchair', value: 0},
                {title: 'ist teilweise rollstuhlgerecht', key: 'entrance-suit-f-wheelchair', value: 1},
                {title: 'ist rollstuhlgerecht', key: 'entrance-suit-f-wheelchair', value: 2},
            ],
            selected: 0,
        });

        /*
         * Lift available and/or accessible
         */
        this.add({
            id: 'lift',
            title: 'Aufzug',
            aria: 'Aktueller Filter, Anforderungen an den Aufzug',
            valueSet: [
                {title: 'keine Einschränkung', key: 'lift-avail', value: 0},
                {title: 'ist vorhanden', key: 'lift-avail', value: 1},
                {title: 'ist barrierefrei', key: 'lift-suit-f-wheelchair', value: 1},
            ],
            selected: 0,
        });

        /*
         * Toilet available and/or accessible
         */
        this.add({
            id: 'toilet',
            title: 'Toilette',
            aria: 'Aktueller Filter, Anforderungen an die Toilette',
            valueSet: [
                {title: 'keine Einschränkung', key: 'toilet-avail', value: 0},
                {title: 'ist vorhanden', key: 'toilet-avail', value: 1},
                {title: 'ist teilweise rollstuhlgerecht', key: 'toilet-suit-f-wheelchair', value: 1},
                {title: 'ist rollstuhlgerecht', key: 'toilet-suit-f-wheelchair', value: 2},
            ],
            selected: 0,
        });

        /*
         * Parking available and/or accessible
         */
        this.add({
            id: 'parking',
            title: 'Parkplatz',
            aria: 'Aktueller Filter, Anforderungen an den Parkplatz',
            valueSet: [
                {title: 'keine Einschränkung', key: 'parking-avail', value: 0},
                {title: 'ist vorhanden', key: 'parking-avail', value: 1},
                {title: 'ist behindertengerecht', key: 'parking-f-disabled-avail', value: 1},
            ],
            selected: 0,
        });

        /*
         * Blind help
         */ 
        this.add({
            id: 'blind',
            title: 'Hilfestellung für Sehgeschädigte',
            aria: '',
            valueSet: [
                {title: 'nicht vorhanden', key: 'help-for-blind', value: 0},
                {title: 'vorhanden', key: 'help-for-blind', value: 1},
            ],
            selected: 0,
        });
        /*
         * Hearing help
         */ 
        this.add({
            id: 'hearing',
            title: 'Hilfestellung für Hörgeschädigte',
            aria: '',
            valueSet: [
                {title: 'nicht vorhanden', key: 'help-for-hearing-imp', value: 0},
                {title: 'vorhanden', key: 'help-for-hearing-imp', value: 1},
            ],
            selected: 0,
        });
        /*
         * General help
         */ 
        this.add({
            id: 'general',
            title: 'Allgemeine Hilfestellung',
            aria: '',
            valueSet: [
                {title: 'nicht vorhanden', key: 'general-help', value: 0},
                {title: 'vorhanden', key: 'general-help', value: 1},
            ],
            selected: 0,
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
     * @param {Integer} Selected key of value sets
     */
    update(id, value) {
        this.getAll().forEach((filter, fid) => {
            if (id == filter.id) {
                filter.selected = value;
                return;
            }
        });
    }

    /**
     * Reset all filters und set to default values (see constructor)
     */
    resetAll() {
        // @todo this is may bad code?
        const filterStore = new FilterStore();
        this.filters = filterStore.getAll();
    }
}

export default FilterStore;
