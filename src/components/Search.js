/**
 * @file HTML component for the search and filter form
 * @author Simeon Ackermann
 */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    InputGroup,
    ControlLabel,
    FormControl,
    Checkbox,
    Button,
    Radio,
    Glyphicon,
    Clearfix
} from 'react-bootstrap';

/*const FormControlCheckbox = ({onChange, filter, id, label}) => {
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
            value="ja"
        >
            {label}
        </Checkbox>
    );
};*/

const FormControlRadio = ({onChange, filter, name, id, label}) => {
    const ariaLabel = `Filter: ${label}`;
    return (
        <Radio
            onChange={e => onChange(
                id,
                true,
                filter[id].node
            )}
            ref={node => {
                filter[id].node = node;
            }}
            defaultChecked={filter[id].active}
            aria-label={ariaLabel}
            value="ja"
            name={name}
        >
            {label}
        </Radio>
    );
};

const Search = ({
    filter,
    onSubmit,
    onChange,
    doRequest
}) => {

    /*const optionsHtml = filter.category.options.map((option, key) => {
        return (
            <option key={key} value={option.value}>{option.text}</option>
        );
    });*/

    return (
        <Form horizontal
            onSubmit={e => onSubmit(e, filter)}
        >
            <FormGroup controlId="formFilterSearch" bsSize="large">
                <Col md={12}>
                    <InputGroup>
                        <FormControl type="search"
                            aria-label="Suche nach Namen"
                            placeholder="Suche..."
                            //autoFocus
                            //tabIndex="1"
                            value={filter.search.value}
                            onChange={e => onChange(
                                'search',
                                true,
                                filter.search.node
                            )}
                            ref={node => (filter.search.node = node)}
                        />
                        <InputGroup.Button>
                            <Button
                                type="submit"
                                bsSize="large"
                                aria-label="Suche starten"
                            >
                                {doRequest &&
                                    <i className="fa fa-circle-o-notch fa-spin"></i>
                                }
                                {!doRequest &&
                                    <Glyphicon glyph="search" aria-hidden="true" />
                                }
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col md={10}>
                    <h3>Filter</h3>
                </Col>
            </FormGroup>

            <Col xs={4} md={12}>
                <div className="row">
                    <FormGroup>
                    <Col componentClass={ControlLabel} md={2}>
                        Aufzug
                    </Col>
                    <Col md={10}>
                        <Radio
                            onChange={e => onChange(
                                'evatorAll',
                                true,
                                undefined
                            )}
                            defaultChecked={
                                !filter.elevatorCabineIsAvailable.active &&
                                !filter.elevatorIsWheelchairAccessible.active
                            }
                            aria-label="Gebäude nach Aufzug filtern. Keine Einschränkung"
                            value="ja"
                            name="elevator"
                        >
                            egal
                        </Radio>
                        <FormControlRadio
                            onChange={onChange}
                            filter={filter}
                            name="elevator"
                            id="elevatorCabineIsAvailable"
                            label="Aufzug ist vorhanden"
                        />
                        <FormControlRadio
                            onChange={onChange}
                            filter={filter}
                            id="elevatorIsWheelchairAccessible"
                            name="elevator"
                            label="Aufzug ist rollstuhlgerecht"
                        />
                    </Col>
                    </FormGroup>
                </div>
            </Col>

            <Col xs={4} md={12}>
                <div className="row">
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            Toilette
                        </Col>
                        <Col md={10}>
                            <Radio
                                onChange={e => onChange(
                                    'toiletsAll',
                                    true,
                                    undefined
                                )}
                                defaultChecked={
                                    !filter.toiletIsAvailable.active &&
                                    !filter.toiletIsWheelchairAccessible.active
                                }
                                aria-label="Gebäude nach Toilette filtern. Keine Einschränkung"
                                name="toilet"
                            >
                                egal
                            </Radio>
                            <FormControlRadio
                                onChange={onChange}
                                filter={filter}
                                name="toilet"
                                id="toiletIsAvailable"
                                label="Toilette ist vorhanden"
                            />
                            <FormControlRadio
                                onChange={onChange}
                                filter={filter}
                                id="toiletIsWheelchairAccessible"
                                name="toilet"
                                label="Toilette ist rollstuhlgerecht"
                            />
                        </Col>
                    </FormGroup>
                </div>
            </Col>

            {/*<FormGroup controlId="formFilterCategory">
                <Col componentClass={ControlLabel} md={2}>
                    Kategorie
                </Col>
                <Col md={10}>
                    <FormControl componentClass="select"
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
            </FormGroup>*/}

            <Clearfix>
                <FormGroup>
                    <Col mdOffset={2} md={10}>
                        <Button type="submit" bsStyle="primary">
                            {doRequest ? 'Suche gestartet' : 'Suche starten'}
                        </Button>
                    </Col>
                </FormGroup>
            </Clearfix>
        </Form>
    );
};

/*Search.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default Search;
