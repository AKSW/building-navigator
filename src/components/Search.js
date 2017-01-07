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

    /*const optionsHtml = filter.category.options.map((option, key) => {
        return (
            <option key={key} value={option.value}>{option.text}</option>
        );
    });*/

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

            <FormGroup controlId="formFilterSearch">
                <Col md={12}>
                    <ControlLabel>Gebäudename durch Texteingabe auswählen</ControlLabel>
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

            <FormGroup controlId="formDistrict">
                <Col md={12}>
                    <ControlLabel>Stadtviertel auswählen</ControlLabel>
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

            <FormGroup>
                <Col md={10}>
                    <h3>Gebäude über Filter auswählen</h3>
                </Col>
            </FormGroup>

            <FormGroup controlId="formFilterCategory">
                <Col componentClass={ControlLabel} md={3}>
                    Kategorie
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
                        aria-label={'Hier können Sie Gebäude über Filter auswählen.' +
                            'Aktueller Filter, Gebäude aus den folgenden Kategorien anzeigen'}
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

            <FormGroup controlId="formFilterEntrance">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.entrance.label}
                </Col>
                <Col md={9}>
                    <div className={styles.noScrollMultiSelect}>
                        <FormControl
                            componentClass="select"
                            onChange={e => onChange(
                                filter.entrance,
                                'entrance',
                            )}
                            ref={node => {
                                filter.entrance.node = node;
                            }}
                            value={getActiveFilterOption(filter.entrance).id}
                            size={filter.entrance.value.length}
                            aria-label={filter.entrance.aria}
                        >
                            {filter.entrance.value.map((entry, key) => {
                                return (
                                    <option key={key} value={entry.id}>{entry.label}</option>
                                );
                            })}
                        </FormControl>
                    </div>
                </Col>
            </FormGroup>

            <hr />

            {/*<FormGroup controlId="formFilterElevator">
                <Col componentClass={ControlLabel} md={3}>
                    Aufzug
                </Col>
                <Col md={9}>
                    {filter.elevator.value.map((entry, key) => {
                        return (
                            <FormControlRadio key={key}
                                filterGroup="elevator"
                                entry={entry}
                            />
                        );
                    })}
                </Col>
            </FormGroup>*/}

            <FormGroup controlId="formFilterElevator">
                <Col componentClass={ControlLabel} md={3}>
                    {filter.elevator.label}
                </Col>
                <Col md={9}>
                    <div className={styles.noScrollMultiSelect}>
                        <FormControl
                            componentClass="select"
                            onChange={e => onChange(
                                filter.elevator,
                                'elevator',
                            )}
                            ref={node => {
                                filter.elevator.node = node;
                            }}
                            value={getActiveFilterOption(filter.elevator).id}
                            size={filter.elevator.value.length}
                            aria-label={filter.elevator.aria}
                        >
                            {filter.elevator.value.map((entry, key) => {
                                return (
                                    <option key={key} value={entry.id}>{entry.label}</option>
                                );
                            })}
                        </FormControl>
                    </div>
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterEtc">
                <Col componentClass={ControlLabel} md={3}>
                    Sonstiges
                </Col>
                <Col md={9}>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="hilfeHoergesch"
                                onChange={e => onChange(
                                    filter.hilfeHoergesch,
                                    'hilfeHoergesch',
                                )}
                                ref={node => {
                                    filter.hilfeHoergesch.node = node;
                                }}
                                value="hilfe_fuer_hoergeschaedigte"
                                defaultChecked={filter.hilfeHoergesch.active}
                                aria-label="Hilfestellung für Hörgeschädigte"
                            />
                            Hilfestellung für Hörgeschädigte
                        </label>
                    </div>
                </Col>
            </FormGroup>

            {/*<FormGroup>
                <Col componentClass={ControlLabel} md={3}>
                    Toilette
                </Col>
                <Col md={9}>
                    <Radio
                        onChange={e => onChange(
                            filter,
                            'toiletsAll',
                        )}
                        defaultChecked={
                            !filter.toiletIsAvailable.active &&
                            !filter.toiletIsWheelchairAccessible.active
                        }
                        aria-label="Gebäude nach Toilette filtern. Keine Einschränkung"
                        name="toilet"
                    >
                        keine Einschränkung
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

            <hr />

            <FormGroup controlId="formFilterParking">
                <Col componentClass={ControlLabel} md={3}>
                    Parken
                </Col>
                <Col md={9}>
                    <Radio
                        aria-label="keine Einschränkung"
                        value="ja"
                        name="parking"
                    >
                        keine Einschränkung
                    </Radio>
                    <Radio
                        aria-label="Behindertenparkplatz ist vorhanden"
                        value="ja"
                        name="parking"
                    >
                        Behindertenparkplatz ist vorhanden
                    </Radio>
                </Col>
            </FormGroup>

            <hr />

            <FormGroup controlId="formFilterEtc">
                <Col componentClass={ControlLabel} md={3}>
                    Sonstiges
                </Col>
                <Col md={9}>
                    <Checkbox
                        aria-label="Hilfestellung für Hörgeschädigte"
                    >
                        Hilfestellung für Hörgeschädigte
                    </Checkbox>
                    <Checkbox
                        aria-label="Hilfestellung für Sehgeschädigte"
                    >
                        Hilfestellung für Sehgeschädigte
                    </Checkbox>
                </Col>
            </FormGroup>*/}

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
