import React from 'react';
import {
    Button,
    Glyphicon,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Clearfix
} from 'react-bootstrap';
import {getElement} from '../../utils/GuiUtils'

class Search extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            filters: props.stores.filterStore.getAll(),
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
            filters: nextProps.stores.filterStore.getAll()
        });
    }

    componentDidMount() {
        // set focus on first filter (if welcome message closed)
        if (!this.state.stores.uiStore.get('showWelcome')) {
            getElement(this.state.stores.uiStore.get('userConfig').container, '.filter select').then((firstEl) => {
                firstEl.focus();
            })
        }
    }

    /**
     * Search form submitted, apply filters and go to results
     */
    handleSubmit(e) {
        // set local is loading state
        this.setState({isLoading: true});

        // apply filters and set new route
        super.handleEvent({
            action: 'apply-filters',
            payload: {filters: this.state.filters}
        }).then(() => {
            super.handleEvent({
                action: 'set-current-route',
                payload: {path: 'results'}
            });
        });
        e.preventDefault();
    }

    /**
     * Filter changed, update filterStore and apply filters to buildings
     */
    handleChange(e) {
        const filterId = e.target.getAttribute('name');
        const type = e.target.type;
        let value = e.target.value;

        // value depends on input type (select or checkbox)
        if (type == 'select-one') {
            value = parseInt(value);
        }
        else if (type == 'checkbox') {
            value = Number(e.target.checked);
        }

        // set local state, fixes jittering
        this.state.filters.forEach((filter, fid) => {
            if (filterId == filter.id) {
                filter.value = value;
                return;
            }
        });
        this.setState({filters: this.state.filters});

        // may close any popup
        super.handleEvent({
            action: 'close-map-popup'
        });

        // set global filters state and apply to buildings
        super.handleEvent({
            action: 'update-filter',
            payload: {
                filterId: filterId,
                value: value,
            }
        }).then(() => {
            super.handleEvent({
                action: 'apply-filters'
            });
        });
        e.preventDefault();
    }

    /**
     * Render search filter
     */
    render() {
        const isLoading = this.state.isLoading;

        const search = this.state.filters.find((filter) => {
            return filter.type === 'search';
        });

        const selectFilters = this.state.filters.filter((filter) => {
            return filter.type === 'select-one';
        });

        const checkboxFilters = this.state.filters.filter((filter) => {
            return filter.type === 'checkbox';
        });

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <Col md={12}>
                    <Button type="submit" bsClass="btn btn-primary btn-lg pull-right" disabled={isLoading}>
                        {isLoading &&
                            <span><i className='fa fa-circle-o-notch fa-spin'></i> Zeige Ergebnisse</span>
                        }
                        {!isLoading &&
                            <span>Zeige Ergebnisse</span>
                        }
                    </Button>
                </Col>
                <Clearfix />

                {/* @todo decide how to implement a fulltext search */}
                {/*<FormGroup controlId="formFilterSearch">
                    <Col md={12}>
                        <ControlLabel><h3>Gebäudename</h3></ControlLabel>
                        <FormControl
                            type="search"
                            name={search.uniqueKey}
                            defaultValue={search.value}
                            onChange={this.handleChange}
                            aria-label="Hier können Sie Gebäude über ihren Namen suchen"
                        />
                    </Col>
                </FormGroup>*/}

                <FormGroup>
                    <Col md={12}>
                        <h3>Gebäude über Filter auswählen</h3>
                    </Col>
                </FormGroup>


                {selectFilters.map((filter) =>
                    <FormGroup controlId={`formFilter${filter.id}`} key={filter.id} className="filter-wrapper">
                        <Col componentClass={ControlLabel} md={3} aria-label={filter.aria}>
                            <span className="filter-icon"><img src={`./images/${filter.icon}.svg`} aria-hidden="true" /></span>
                            {filter.title}
                        </Col>
                        <Col md={9}>
                            <div className="filter filterSelect">
                                <FormControl
                                    componentClass="select"
                                    onChange={this.handleChange}
                                    value={filter.value}
                                    size={filter.valueSet.length}
                                    name={filter.id}
                                    aria-label={filter.aria}
                                >
                                    {filter.valueSet.map((entry, key) => {
                                        return (
                                            <option key={key} value={key} aria-label={entry.aria}>{entry.title}</option>
                                        );
                                    })}
                                </FormControl>
                            </div>
                        </Col>
                        <Col md={12}><hr /></Col>
                    </FormGroup>
                )}

                <FormGroup controlId="formFilterEtc">
                    <Col componentClass={ControlLabel} md={3}>
                        <span aria-hidden={true}>Sonstiges</span>
                    </Col>
                </FormGroup>

                {checkboxFilters.map((filter) =>
                    <FormGroup controlId={`formFilterEtc${filter.id}`} key={filter.id} className="filter-wrapper">
                        <Col md={9}>
                            <div className={Boolean(filter.value) ? "filter checkbox checked" : "filter checkbox"}>
                                <label>
                                    <span className="filter-icon"><img src={`./images/${filter.icon}.svg`} aria-hidden="true" /></span>
                                    {filter.title}
                                    <input
                                        type="checkbox"
                                        name={filter.id}
                                        onChange={this.handleChange}
                                        checked={Boolean(filter.value)}
                                        aria-label={filter.aria}
                                    />
                                </label>
                            </div>
                        </Col>
                    </FormGroup>
                )}

                <hr />

                <Col md={12}>
                    <Button type="submit" bsClass="btn btn-primary btn-lg pull-right" disabled={isLoading}>
                        {isLoading &&
                            <span><i className='fa fa-circle-o-notch fa-spin'></i> Zeige Ergebnisse</span>
                        }
                        {!isLoading &&
                            <span>Zeige Ergebnisse</span>
                        }
                    </Button>
                </Col>
            </Form>
        );
    }
}

export default Search;
