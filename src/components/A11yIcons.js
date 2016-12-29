/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Panel,
    PanelGroup,
    Glyphicon,
    Table,
    Button,
    Image
} from 'react-bootstrap';

const entryStyle = {
    list: {
        listStyleType: 'none',
        padding: '0px',
        margin: '0px 0px 5px 0px',
        entry: {
            display: 'inline-block',
            padding: '0px 6px 0px 0px',
        },
        entryDetailed: {
            padding: '0px 6px',
        },
    },
    accIcon: {
        width: '32px',
        height: '32px',
    },
    accIconNA: {
        opacity: '0.5'
    }
};

const A11yIcons = ({
    place,
    showDetails
}) => {
    const iconObj = ({src, style, label, descr}) => {
        src = `/images/icons/${src}`;
        style = typeof style === 'undefined' ? entryStyle.accIcon : style;
        descr = typeof descr === 'undefined' ? label : descr;
        return {
            icon: (
                <Image
                    src={src}
                    className="accessible-icon"
                    style={style}
                    title={label}
                    aria-label={label}
                />
            ),
            descr: (
                <span>{descr}</span>
            )
        };
    };
    const entrance = () => {
        let obj = {};
        if (place.eingangsbereich_rollstuhlgerecht === 'vollständig') {
            obj = iconObj({
                src: 'entrance-wheelchair.gif',
                label: 'Eingang ist vollständig rollstuhlgerecht'
            });
        }
        else if (place.eingangsbereich_rollstuhlgerecht === 'teilweise') {
            obj = iconObj({
                src: 'entrance-wheelchair-restr.gif',
                label: 'Eingang ist teilweise rollstuhlgerecht'
            });
        }
        else {
            obj = iconObj({
                src: 'entrance-wheelchair.gif',
                style: Object.assign({}, entryStyle.accIcon, entryStyle.accIconNA),
                label: 'Eingang ist nicht rollstuhlgerecht'
            });
        }
        return obj;
    };

    const elevator = () => {
        let obj = {};
        if (place.personenaufzug_vorhanden === 'ja') {
            if (place.personenaufzug_rollstuhlgerecht === 'ja') {
                obj = iconObj({
                    src: 'elevator-wheelchair.gif',
                    label: 'Aufzug ist vorhanden und rollstuhlgerecht'
                });
            } else {
                obj = iconObj({
                    src: 'elevator.gif',
                    label: 'Aufzug ist vorhanden'
                });
            }
            obj.descr = (
                <span>
                    {obj.descr}<br />
                    <small>Türbreite: {place.aufzug_tuerbreite_cm} cm<br />
                    Kabinenmaße: {place.aufzug_breite_innenkabine_cm} cm x
                    &nbsp;{place.aufzug_tiefe_innenkabine_cm} cm</small>
                </span>
            );
        } else {
            obj = iconObj({
                src: 'elevator.gif',
                style: Object.assign({}, entryStyle.accIcon, entryStyle.accIconNA),
                label: 'Aufzug ist nicht vorhanden'
            });
        }
        return obj;
    };

    const toilet = () => {
        let obj = {};
        if (place.toilette_in_der_einrichtung_vorhanden === 'ja') {
            if (place.toilette_rollstuhlgerecht === 'vollständig') {
                obj = iconObj({
                    src: 'toilet-wheelchair.gif',
                    label: 'Toilette ist vorhanden und rollstuhlgerecht'
                });
            } else {
                obj = iconObj({
                    src: 'toilet.gif',
                    label: 'Toilette ist vorhanden'
                });
            }
        } else {
            obj = iconObj({
                src: 'toilet.gif',
                style: Object.assign({}, entryStyle.accIcon, entryStyle.accIconNA),
                label: 'Toilette ist nicht vorhanden'
            });
        }
        return obj;
    };

    const iconHTML = showDetails ? (
        <div>
            <Row>
                <Col xs={3} style={{textAlign: 'right'}}>{entrance().icon}</Col>
                <Col xs={9}>{entrance().descr}</Col>
            </Row>
            <Row>
                <Col xs={3} style={{textAlign: 'right'}}>{elevator().icon}</Col>
                <Col xs={9}>{elevator().descr}</Col>
            </Row>
            <Row>
                <Col xs={3} style={{textAlign: 'right'}}>{toilet().icon}</Col>
                <Col xs={9}>{toilet().descr}</Col>
            </Row>
        </div>
    ) : (
        <ul style={entryStyle.list}>
            <li style={entryStyle.list.entry}>
                {entrance().icon}
            </li>
            <li style={entryStyle.list.entry}>
                {elevator().icon}
            </li>
            <li style={entryStyle.list.entry}>
                {toilet().icon}
            </li>
        </ul>
    );

    return (iconHTML);
};

export default A11yIcons;
