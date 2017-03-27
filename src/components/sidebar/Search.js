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
            filters: props.stores.filterStore.getAll()
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
        getElement(this.state.stores.uiStore.get('userConfig').container, '.filter select').then((firstEl) => {
            firstEl.focus();
        })
    }

    handleSubmit(e) {
        super.handleEvent({
            action: 'apply-filters',
            payload: { filters: this.state.filters }
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
        const type = e.target.type;
        let value = e.target.value;

        if (type == 'select-one') {
            value = parseInt(value);
        }
        else if (type == 'checkbox') {
            value = Number(e.target.checked);
        }

        super.handleEvent({
            action: 'update-filter',
            payload: {
                filterId: e.target.getAttribute('name'),
                value: value,
            }
        }).then(() => {
            super.handleEvent({
                action: 'apply-filters'
            });
        });
    }

    render() {

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
                    <Button type="submit" bsClass="btn btn-primary btn-lg pull-right">
                        <span>Zeige Ergebnisse</span>
                    </Button>
                </Col>
                <Clearfix />

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
                            {filter.hasOwnProperty('icon') &&
                                <span className="filter-icon"><i className={`fi-${filter.icon}`} aria-hidden="true"></i>&nbsp;</span>
                            }
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
                                            <option key={key} value={key}>{entry.title}</option>
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
                        Sonstiges
                    </Col>
                </FormGroup>

                {checkboxFilters.map((filter) =>
                    <FormGroup controlId={`formFilterEtc${filter.id}`} key={filter.id} className="filter-wrapper">
                        <Col md={9} mdOffset={3}>
                            <div className="filter checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name={filter.id}
                                        onChange={this.handleChange}
                                        checked={Boolean(filter.value)}
                                        aria-label={filter.aria}
                                    />
                                    {filter.title}
                                </label>
                            </div>
                        </Col>
                    </FormGroup>
                )}

                <hr />

                <Col md={12}>
                    <Button type="submit" bsClass="btn btn-primary btn-lg pull-right">
                        <span>Zeige Ergebnisse</span>
                    </Button>
                </Col>
            </Form>
        );
    }
}

export default Search;
