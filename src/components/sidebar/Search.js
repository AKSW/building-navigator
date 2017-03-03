import React from 'react';
import {
    Button,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

class Search extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            filters: props.filters
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filters: nextProps.filters,
        });
    }

    handleSubmit(e) {
        super.handleEvent({
            action: 'apply-filters',
            payload: {
                filters: this.state.filters
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
                filterId: e.target.getAttribute('name'),
                setKey: e.target.value,
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
            <Form horizontal onSubmit={this.handleSubmit}>
                <Button type="submit" bsClass="btn btn-primary btn-lg pull-right">
                    <span>Zeige Ergebnisse</span>
                </Button>
                
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
                    <Col md={10}>
                        <h3>Gebäude über Filter auswählen</h3>
                    </Col>
                </FormGroup>

                {/**/}

                    

                {selectFilters.map((filter) =>
                    <FormGroup controlId={`formFilter${filter.id}`} key={filter.id}>
                        <Col componentClass={ControlLabel} md={3}>
                            {filter.title}
                        </Col>
                        <Col md={9}>
                            <div className="filterSelect">
                                <FormControl
                                    componentClass="select"
                                    onChange={this.handleChange}
                                    value={filter.selected}
                                    size={filter.valueSet.length}
                                    name={filter.id}
                                    aria-label={filter.aria}
                                    className="filterSelect"
                                >
                                    {filter.valueSet.map((entry, key) => {
                                        return (
                                            <option key={key} value={key}>{entry.title}</option>
                                        );
                                    })}
                                </FormControl>
                            </div>
                        </Col>
                    </FormGroup>
                )}

                <Button type="submit" bsClass="btn btn-primary btn-lg pull-right">
                    <span>Zeige Ergebnisse</span>
                </Button>
            </Form>
        );
    }
}

export default Search;
