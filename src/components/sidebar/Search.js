import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            filters: props.filters
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            filters: this.props.filters,
        });
    }

    handleSubmit(e) {
        super.handleEvent({
            action: 'apply-filters',
            payload: {
                filters: this.props.filters
            }
        });
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'sidebarRoute',
                value: 'results'
            }
        });
        e.preventDefault();
    }

    handleChange(e) {
        super.handleEvent({
            action: 'update-filter',
            payload: {
                updated_filter_key: e.target.getAttribute('name'),
                new_filter_value: e.target.value,
            }
        });
    }

    render() {

        const search = this.state.filters.find((filter) => {
            return filter.uniqueKey === 'title';
        });

        const selectFilters = this.state.filters.filter((filter) => {
            return filter.uniqueKey !== 'title';
        });


        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Suche</h2>
                <div>
                    Suche: <input type="search" value={search.selected} name={search.uniqueKey} onChange={this.handleChange} />
                </div>

                {selectFilters.map((filter) =>
                    <div key={filter.title}>

                        <strong>{filter.title}:</strong><br/>

                        <select name={filter.uniqueKey}
                                onChange={this.handleChange}
                                title={filter.title}>

                            {filter.valueSet.map((value) =>
                                <option value={value.value} key={value.value}>{value.title}</option>
                            )}

                        </select>
                    </div>
                )}
            </form>
        );
    }
}

export default Search;
