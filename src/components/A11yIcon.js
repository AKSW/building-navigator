import React from 'react';
import {Image} from 'react-bootstrap';

/**
 * Accessibility icons for entrance, lift, toilet, ...
 *
 * Can be used in components like:
 *  render() {
 *      const a11yIcons = new A11yIcon({building: buildingObj});
 *      return (
 *          {a11yIcons.icon('entrance')}
 *      );
 *  }
 */
class A11yIcon extends React.Component {
    constructor(props) {
        super();

        this.state = {
            building: props.building
        };

        // init all icons with null values
        this.icons = {
            entrance: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            lift: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            toilet: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            parking: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            blindHelp: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            hearingHelp: {
                icon: (null),
                descr: (null),
                details: (null)
            },
            generalHelp: {
                icon: (null),
                descr: (null),
                details: (null)
            }
        };

        this.handleClickIcon = this.handleClickIcon.bind(this);
        this.createIcons();
    }

    /**
     * Get specific icon and description
     *
     * @param {String} Name id of the icon
     * @returns {Object}
     */
    get(name) {
        if (this.icons.hasOwnProperty(name)) {
            return this.icons[name];
        } else {
            super.logger.log('a11y icon not found', name, 'error');;
            return {icon: (null), descr: (null), details: (null)};
        }
    }

    /**
     * Get all icons
     *
     * @returns {Object}
     */
    getAll() {
        let ks = [];
        Object.keys(this.icons).forEach((key) => {
            ks.push(key)
        });
        return ks;
    }

    /**
     * Get specific icon
     *
     * @param {String} Name of the icon
     * @returns {Object}
     */
    icon(name) {
        return this.get(name).icon;
    }

    /**
     * Get specific description
     *
     * @param {String} Name of the icon
     * @returns {Object}
     */
    descr(name) {
        return this.get(name).descr;
    }

    /**
     * Get specific details
     *
     * @param {String} Name of the icon
     * @returns {Object}
     */
    details(name) {
        return this.get(name).details;
    }

    /**
     * New icon, adds to local icons variable
     *
     * @param {String} Id of the icon
     * @param {String} Path to icon image
     * @param {String} Description of the icon
     */
    add(name, src, descr, details = null) {
        this.icons[name] = {
            icon: (<Image
                        src={`./images/bvl/${src}`}
                        className="a11yIcon"
                        title={descr}
                        alt={name}
                        aria-label={descr}
                        onClick={this.handleClickIcon}
                        />),
            descr: (<span>{descr}</span>),
            details: details ? (<div>{details.map((p, i) => <span key={i}>{p}</span>)}</div>) : (null)
        }
    }

    handleClickIcon(e) {
        // @TODO may toggle tooltip
    }

    /**
     * Create all icons
     */
    createIcons() {
        const building = this.state.building;

        // entrance
        if (building['entrance-suit-f-wheelchair'] === 2) {
            this.add('entrance',
                'entrance-wheelchair.svg',
                'Eingang ist vollständig rollstuhlgerecht',
                [
                    'Türbreite mehr als 90cm',
                    'Eingang ohne Treppe (max 3cm) oder mit Rampe (max 6% Steigung)'
                ]
            );
        }
        else if (building['entrance-suit-f-wheelchair'] === 1) {
            this.add('entrance',
                'entrance-wheelchair-restr.svg',
                'Eingang ist teilweise rollstuhlgerecht',
                [
                    'Türbreite mehr als 70cm',
                    'Maximal eine Stufe oder Rampe mit max 12% Steigung'
                ]
            );
        }

        // lift
        if (building['lift-suit-f-wheelchair'] === 1) {
            this.add('lift',
                'elevator-wheelchair.svg',
                'Aufzug ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['lift-avail'] === 1) {
            this.add('lift',
                'elevator.svg',
                'Aufzug ist vorhanden'
            );
        }

        // toilet
        if (building['toilet-suit-f-wheelchair'] === 2) {
            this.add('toilet',
                'toilet-wheelchair.svg',
                'Toilette ist vorhanden und rollstuhlgerecht',
                [
                    'Türbreite mehr als 90cm',
                    'Platz vor (150cm) und neben (90cm) der Toilette',
                    'Handlauf links und rechts vorhanden'
                ]
            );
        }
        else if (building['toilet-suit-f-wheelchair'] === 1) {
            this.add('toilet',
                'toilet-wheelchair-restr.svg',
                'Toilette ist vorhanden und teilweise rollstuhlgerecht',
                [
                    'Türbreite mehr als 70cm',
                    'Platz vor (100cm) und neben (70cm) der Toilette',
                    'Handlauf links oder rechts vorhanden'
                ]
            );
        }
        else if (building['toilet-avail'] === 1) {
            this.add('toilet',
                'toilet.svg',
                'Toilette ist vorhanden'
            );
        }

        // parking
        if (building['parking-f-disabled-avail'] === 1) {
            this.add('parking',
                'parking-wheelchair.svg',
                'Parkplatz ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['parking-avail'] === 1) {
            this.add('parking',
                'parking.svg',
                'Parkplatz ist vorhanden'
            );
        }

        // blind help
        if (building['help-for-blind'] === 1) {
            this.add('blindHelp',
                'blind-help.svg',
                'Hilfestellung für Sehgeschädigte ist vorhanden'
            );
        }

        // hearing help
        if (building['help-for-hearing-imp'] === 1) {
            this.add('hearingHelp',
                'hearing-help.svg',
                'Hilfestellung für Hörgeschädigte ist vorhanden'
            );
        }

        // general help
        if (building['general-help'] === 1) {
            this.add('generalHelp',
                'general-help.svg',
                'Allgemeine Hilfestellung ist vorhanden'
            );
        }
    }

    // Required for React.Component
    render() {
        return (null);
    }
}

export default A11yIcon;
