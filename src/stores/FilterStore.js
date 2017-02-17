class FilterStore {
    constructor(logger) {
        this.logger = logger;
        this.filters = [];

        /*
         * Search by Name 
         */
        this.add({
            uniqueKey: 'title',
            title: 'Suche',
            selected: ''
        })

        /*
         * Lift available
         */
        this.add({
            uniqueKey: 'lift-avail',
            title: 'Aufzug ist vorhanden',
            valueSet: [
                {title: 'egal', value: 0},
                {title: 'ist vorhanden', value: 1},
            ],
            selected: 0
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
     * @param Object
     */
    add(filter) {
        this.filters.push(filter);
    }

    /**
     * Updates a filter by its key with a new selected-value.
     *
     * @param String updated_filter_key
     * @param String|Integer new_filter_value
     */
    update(updated_filter_key, new_filter_value) {
        this.filters.forEach((filter, fid) => {
            if (updated_filter_key == filter.uniqueKey) {
                filter.selected = new_filter_value;
                return;
            }
        });
    }
}

export default FilterStore;
