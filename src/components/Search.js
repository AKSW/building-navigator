/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, Row, Col, ControlLabel, FormControl, Checkbox, Button} from 'react-bootstrap/lib';

const FormControlCheckbox = ({onChange, filter, id, label}) => {
    const ariaLabel = `Filter: ${label}`;
    return (
        <Checkbox
            onChange={e => onChange(
                id,
                !filter[id].active,
                filter[id].node
            )}
            ref={node => {
                filter[id].node = node;
            }}
            defaultChecked={filter[id].active}
            aria-label={ariaLabel}
            value="Yes"
        >
            {label}
        </Checkbox>
    );
};

const Search = (params) => {
    const {places, filter, onSubmit, onChange} = params;

    const optionsHtml = filter.category.options.map((option, key) => {
        return (
            <option key={key} value={option.value}>{option.text}</option>
        );
    });

    return (
        <div>
            <Form horizontal
                onSubmit={e => onSubmit(e, filter)}
            >
            <FormGroup controlId="formFilterSearch">
                <Col componentClass={ControlLabel} sm={2}>
                    Suche
                </Col>
                <Col sm={8}>
                    <FormControl type="search" title="Suche" aria-label="Suche"
                        //autoFocus
                        value={filter.search.value}
                        onChange={e => onChange(
                            'search',
                            true,
                            filter.search.node
                        )}
                        ref={node => (filter.search.node = node)}
                    />
                </Col>
                <Col sm={2}>
                    <Button type="submit">
                        Suche starten
                    </Button>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <h3>Filter</h3>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterCategory">
                <Col componentClass={ControlLabel} sm={2}>
                    Kategorie
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="select" multiple
                        value={filter.category.value}
                        onChange={e => onChange(
                            'category',
                            true,
                            filter.category.node
                        )}
                        ref={node => {
                            filter.category.node = node;
                        }}
                        aria-label="Gebäude aus den folgenden Kategorien anzeigen">
                        {optionsHtml}
                    </FormControl>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <FormControlCheckbox
                        onChange={onChange}
                        filter={filter}
                        id="liftWithWheelChairSupportAvailable"
                        label="Lift barrierefrei"
                    />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <FormControlCheckbox
                        onChange={onChange}
                        filter={filter}
                        id="toiletForDisabledPeopleAvailable"
                        label="Toilette barrierefrei"
                    />
                </Col>
            </FormGroup>

            {/*<FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit">
                        Suche starten
                    </Button>
                    <br /><br />
                    <p>
                        <small>
                        {places.length === 0 &&
                            "kein Ergebnis"
                        }
                        {places.length === 1 &&
                            `${places.length} Ergebnis`
                        }
                        {places.length > 1 &&
                            `${places.length} Ergebnisse`
                        }
                        &nbsp;für diese Suche
                        </small>
                    </p>
                </Col>
            </FormGroup>*/}
            </Form>
        </div>
    );
};

/*Search.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default Search;
