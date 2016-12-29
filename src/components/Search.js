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

const formStyle = {};

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
                        onChange={e => onChange(
                            entry,
                            filterGroup,
                        )}
                        ref={node => {
                            /** @todo test (old) browser compatibility with saving node in state */
                            entry.node = node;
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
            style={formStyle}
        >
            {doRequest &&
                <div id="search-request-loader">
                    <span><i className="fa fa-circle-o-notch fa-spin"></i> Suche gestartet, bitte warten.</span>
                </div>
            }

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
                        ref={node => (filter.search.node = node)}
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
                        {/*<option value="all">Alle</option>
                        <option value="Unterhaltung">Unterhaltung</option>
                        <option value="Kultur">Kultur</option>
                        <option value="Bildung">Bildung</option>*/}
                        {filter.category.value.map((catFilter, key) => {
                            return (
                                <option key={key} value={catFilter.id}>{catFilter.label}</option>
                            );
                        })}
                    </FormControl>
                </Col>
            </FormGroup>

            {/*<FormGroup controlId="formFilterEntrance">
                <Col componentClass={ControlLabel} md={3}>
                    Eingang
                </Col>
                <Col md={9}>
                    <FormControl
                        componentClass="select"
                        size="3"
                        aria-label="Aktueller Filter, Anforderungen an den Eingangsbereich"
                        defaultValue={"0"}
                    >
                        <option value="0">keine Einschränkung</option>
                        <option
                            value="1"
                            aria-label="Eingang ist mindestens teilweise rollstuhlgerecht"
                        >
                            teilweise rollstuhlgerecht
                        </option>
                        <option value="3">vollständig rollstuhlgerecht</option>
                    </FormControl>
                </Col>
            </FormGroup>*/}

            <FormGroup controlId="formFilterElevator">
                <Col componentClass={ControlLabel} md={3}>
                    Aufzug NEU
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
            </FormGroup>

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
                    Aufzug
                </Col>
                <Col md={9}>
                    <Radio
                        onChange={e => onChange(
                            filter,
                            'elevatorAll',
                        )}
                        defaultChecked={
                            !filter.elevatorCabineIsAvailable.active &&
                            !filter.elevatorIsWheelchairAccessible.active
                        }
                        aria-label={'Aktueller Filter, Anforderungen an den Aufzug. ' +
                            'Aktuelle Auswahl, keine Einschränkung'}
                        value="ja"
                        name="elevator"
                    >
                        keine Einschränkung
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

            <hr />

            <FormGroup>
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
