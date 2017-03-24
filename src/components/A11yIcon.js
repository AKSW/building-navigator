import React from 'react';
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

/**
 * @todo change a11y template: should just return the icon not the list of icons!
 */
class A11yIcon extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            building: props.building
        };

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

        this.initIcons();
    }

    // get object
    get(type) {
        if (this.icons.hasOwnProperty(type)) {
            return this.icons[type];
        } else {
            super.logger.log('a11y icon not found', type, 'error');;
            return {icon: (null), descr: (null)};
        }
    }

    getAll() {
        let ks = [];
        Object.keys(this.icons).forEach((key) => {
            ks.push(key)
        });
        return ks;
    }

    // get icon
    icon(type) {
        return this.get(type).icon;
    }

    // get description
    descr(type) {
        return this.get(type).descr;
    }

    add(type, src, descr) {
        this.icons[type] = {
            icon: (<Image
                        src={`./images/icons/${src}`}
                        className="a11yIcon"
                        title={descr}
                        thumbnail
                        aria-label={descr} />),
            descr: (<span>{descr}</span>)
        }
    }

    initIcons() {
        const building = this.state.building;

        // entrance
        if (building['entrance-suit-f-wheelchair'] === 2) {
            this.add('entrance',
                'entrance-wheelchair.gif',
                'Eingang ist vollständig rollstuhlgerecht'
            );
        }
        else if (building['entrance-suit-f-wheelchair'] === 1) {
            this.add('entrance',
                'entrance-wheelchair-restr.gif',
                'Eingang ist teilweise rollstuhlgerecht'
            );
        }

        // lift
        if (building['lift-suit-f-wheelchair'] === 1) {
            this.add('lift',
                'elevator-wheelchair.gif',
                'Aufzug ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['lift-avail'] === 1) {
            this.add('lift',
                'elevator.gif',
                'Aufzug ist vorhanden'
            );
        }

        // toilet
        if (building['toilet-suit-f-wheelchair'] === 2) {
            this.add('toilet',
                'toilet-wheelchair.gif',
                'Toilette ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['toilet-suit-f-wheelchair'] === 1) {
            this.add('toilet',
                'toilet-wheelchair-restr.gif',
                'Toilette ist vorhanden und teilweise rollstuhlgerecht'
            );
        }
        else if (building['toilet-avail'] === 1) {
            this.add('toilet',
                'toilet-wheelchair-restr.gif',
                'Toilette ist vorhanden'
            );
        }

        // parking
        if (building['parking-f-disabled-avail'] === 1) {
            this.add('parking',
                'parking-wheelchair.gif',
                'Parkplatz ist vorhanden und rollstuhlgerecht'
            );
        }
        else if (building['parking-avail'] == false) {
            this.add('parking',
                'parking.gif',
                'Parkplatz ist vorhanden'
            );
        }

        // blind help
        if (building['help-for-blind'] === 1) {
            this.add('blindHelp',
                'blind-help.gif',
                'Hilfestellung für Sehgeschädigte ist vorhanden'
            );
        }

        // hearing help
        if (building['help-for-hearing-imp'] === 1) {
            this.add('blindHelp',
                'hearing-help.gif',
                'Hilfestellung für Hörgeschädigte ist vorhanden'
            );
        }

        // general help
        if (building['general-help'] === 1) {
            this.add('generalHelp',
                'general-help.gif',
                'Allgemeine Hilfestellung ist vorhanden'
            );
        }
    }

    render() {
        return (null);
    }
}

export default A11yIcon;
