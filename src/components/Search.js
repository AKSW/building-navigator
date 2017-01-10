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
    Clearfix,
} from 'react-bootstrap';

import styles from './search.css';

const Search = ({
    filter,
    onSubmit,
    onChange,
    doRequest,
    getActiveFilterOption,
    getFocus
}) => {

    const FormControlRadio = ({filterGroup, entry, id}) => {
        //const ariaLabel = `Filter: ${label}`;
        //console.log('FormControlRadio ', filterGroup, entry);
        return (
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        name={filterGroup}
                        ref={node => {
                            /** @todo test (old) browser compatibility with saving node in state */
                            entry.node = node;
                        }}
                        onChange={e => {
                            onChange(entry, filterGroup);
                            window.setTimeout(() => {
                                getFocus(entry.node);
                            }, 0);
                        }}
                        defaultChecked={entry.active}
                        value={entry.id}
                        aria-label={entry.aria}
                    />
                    {entry.label}
                </label>
            </div>
        );
    };

    const FormControlnoScrollMultiSelect = ({filterGroup}) => {
        return (
            <div className={styles.noScrollMultiSelect}>
                <FormControl
                    componentClass="select"
                    onChange={e => onChange(filterGroup, filterGroup.id)}
                    ref={node => {
                        /** @todo test (old) browser compatibility with saving node in state */
                        filterGroup.node = node;
                    }}
                    value={getActiveFilterOption(filterGroup).id}
                    size={filterGroup.value.length}
                    aria-label={filterGroup.aria}
                >
                    {filterGroup.value.map((entry, key) => {
                        return (
                            <option key={key} value={entry.id}>{entry.label}</option>
                        );
                    })}
                </FormControl>
            </div>
        );
    };

    return (
        <Form
            horizontal
            onSubmit={e => onSubmit(e, filter)}
        >
            <img
                className="hidden"
                src="./images/blank.gif"
                onLoad={() => {
                    getFocus(filter.search.node);
                }}
            />

            <FormGroup>
                <Col md={12}>
                    {doRequest &&
                        <Button
                            type="submit"
                            bsClass="btn btn-primary btn-lg pull-right"
                            aria-label="Suche gestartet, bitte warten"
                        >
                            <span><i className="fa fa-circle-o-notch fa-spin"></i> Suche gestartet</span>
                        </Button>
                    }
                    {!doRequest &&
                        <Button type="submit" bsClass="btn btn-primary btn-lg pull-right">
                            <span>Suche starten</span>
                        </Button>
                    }
                </Col>
            </FormGroup>

            <FormGroup controlId="formDistrict">
                <Col md={12}>
                    <ControlLabel>Ausgangspunkt wählen:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={getActiveFilterOption(filter.district).id}
                        aria-label="Ort der Suche auswählen"
                        onChange={e => onChange(
                            filter.district,
                            'district',
                        )}
                        ref={node => (filter.district.node = node)}
                    >
                        {filter.district.value.map((district, key) => {
                            return (
                                <option key={key} value={district.id}>{district.label}</option>
                            );
                        })}
                    </FormControl>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterSearch">
                <Col md={12}>
                    <ControlLabel><h3>Gebäudename durch Texteingabe auswählen</h3></ControlLabel>
                    <FormControl
                        type="search"
                        aria-label="Hier können Sie Gebäude über ihren Namen suchen"
                        //autoFocus
                        //tabIndex="1"
                        defaultValue={filter.search.value}
                        onChange={e => onChange(
                            filter.search,
                            'search',
                        )}
                        ref={node => {
                            filter.search.node = node;
                        }}
                    />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col md={10}>
                    <h3>Gebäude über Filter auswählen</h3>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterCategory">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.category.label}
                </Col>
                <Col md={9}>
                    <FormControl
                        componentClass="select"
                        onChange={e => onChange(
                            filter.category,
                            'category',
                        )}
                        ref={node => {
                            filter.category.node = node;
                        }}
                        //defaultValue={}
                        value={getActiveFilterOption(filter.category).id}
                        aria-label={filter.category.aria}
                    >
                        {filter.category.value.map((catFilter, key) => {
                            return (
                                <option key={key} value={catFilter.id}>{catFilter.label}</option>
                            );
                        })}
                    </FormControl>
                </Col>
            </FormGroup>

            <br />

            <FormGroup controlId="formFilterParking">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.parking.label}
                </Col>
                <Col md={9}>
                    <FormControlnoScrollMultiSelect filterGroup={filter.parking} />
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterEntrance">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.entrance.label}
                </Col>
                <Col md={9}>
                    <FormControlnoScrollMultiSelect filterGroup={filter.entrance} />
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterElevator">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.elevator.label}
                </Col>
                <Col md={9}>
                    <FormControlnoScrollMultiSelect filterGroup={filter.elevator} />
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterToilet">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.toilet.label}
                </Col>
                <Col md={9}>
                    <FormControlnoScrollMultiSelect filterGroup={filter.toilet} />
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterEtcGeneral">
                <Col componentClass={ControlLabel} md={3}>
                    Sonstiges
                </Col>
                <Col md={9}>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="generalHelp"
                                onChange={e => onChange(
                                    filter.generalHelp,
                                    'generalHelp',
                                )}
                                ref={node => {
                                    filter.generalHelp.node = node;
                                }}
                                value={filter.generalHelp.value}
                                defaultChecked={filter.generalHelp.active}
                                aria-label={filter.generalHelp.label}
                            />
                            {filter.generalHelp.label}
                        </label>
                    </div>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterEtcBlindhelp">
                <Col md={9} mdOffset={3}>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="blindHelp"
                                onChange={e => onChange(
                                    filter.blindHelp,
                                    'blindHelp',
                                )}
                                ref={node => {
                                    filter.blindHelp.node = node;
                                }}
                                value={filter.blindHelp.value}
                                defaultChecked={filter.blindHelp.active}
                                aria-label={filter.blindHelp.label}
                            />
                            {filter.blindHelp.label}
                        </label>
                    </div>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterEtcHearinghelp">
                <Col md={9} mdOffset={3}>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="hearingHelp"
                                onChange={e => onChange(
                                    filter.hearingHelp,
                                    'hearingHelp',
                                )}
                                ref={node => {
                                    filter.hearingHelp.node = node;
                                }}
                                value={filter.hearingHelp.value}
                                defaultChecked={filter.hearingHelp.active}
                                aria-label={filter.hearingHelp.label}
                            />
                            {filter.hearingHelp.label}
                        </label>
                    </div>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col md={12}>
                    <Button type="submit" bsClass="btn btn-lg btn-primary pull-right">
                        {doRequest &&
                            <span><i className="fa fa-circle-o-notch fa-spin"></i> Suche gestartet</span>
                        }
                        {!doRequest &&
                            <span>Suche starten</span>
                        }
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

/*Search.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default Search;
