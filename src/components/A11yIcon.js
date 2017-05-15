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
                descr: (null)
            },
            lift: {
                icon: (null),
                descr: (null)
            },
            toilet: {
                icon: (null),
                descr: (null)
            },
            parking: {
                icon: (null),
                descr: (null)
            },
            blindHelp: {
                icon: (null),
                descr: (null)
            },
            hearingHelp: {
                icon: (null),
                descr: (null)
            },
            generalHelp: {
                icon: (null),
                descr: (null)
            }
        };

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
            return {icon: (null), descr: (null)};
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
     * New icon, adds to local icons variable
     *
     * @param {String} Id of the icon
     * @param {String} Path to icon image
     * @param {String} Description of the icon
     */
    add(name, src, descr) {
        this.icons[name] = {
            icon: (<Image
                        src={`./images/bvl/${src}`}
                        className="a11yIcon"
                        title={descr}
                        alt={name}
                        aria-label={descr} />),
            descr: (<span>{descr}</span>)
        }
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
                'Eingang ist vollständig rollstuhlgerecht'
            );
        }
        else if (building['entrance-suit-f-wheelchair'] === 1) {
            this.add('entrance',
                'entrance-wheelchair-restr.svg',
                'Eingang ist teilweise rollstuhlgerecht'
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
                'Toilette ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['toilet-suit-f-wheelchair'] === 1) {
            this.add('toilet',
                'toilet-wheelchair-restr.svg',
                'Toilette ist vorhanden und teilweise rollstuhlgerecht'
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
