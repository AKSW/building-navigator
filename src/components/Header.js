/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router';
//import {Nav, NavItem} from 'react-bootstrap';
//import {LinkContainer} from 'react-router-bootstrap';

const Header = (params) => {
    /*const {places} = params;
    return (
        <Nav bsStyle="tabs" activeKey={1} role="navigation">
            <LinkContainer to={'/search'}>
                <NavItem eventKey={1} aria-label="Suchen & filtern">Suche & Filter</NavItem>
            </LinkContainer>
            {places.length === 0 &&
                <li>
                    <a href="#">keine Ergebnisse</a>
                </li>
            }
            {places.length > 0 &&
                <LinkContainer to={'/results'}>
                    <NavItem eventKey={2} aria-label="Ergebnisse">
                    {places.length}&nbsp;
                    Ergebnis
                    {places.length === 0 || places.length > 1 &&
                        "se"
                    }
                    </NavItem>
                </LinkContainer>
            }
            <LinkContainer to={'/map'} aria-hidden="true">
                <NavItem eventKey={3} aria-label="Karte">Karte</NavItem>
            </LinkContainer>
        </Nav>
    );*/
    return (
        <h2>
            <a href="#">BVL Navigator - Barriefreie Gebäude suchen und filtern</a>
        </h2>
    );
};

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(Header);
