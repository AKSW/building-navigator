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
class A11yIcons extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            building: props.building,
            showDetails: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({showDetails: nextProps.building.showDetails});
    }

    render() {
        const building = this.state.building;
        const iconObj = ({src, label, descr}) => {
            src = `./images/icons/${src}`;
            descr = typeof descr === 'undefined' ? label : descr;
            return {
                icon: (<Image
                        src={src}
                        className="a11yIcon"
                        title={label}
                        aria-label={label} />),
                descr: (<span>{descr}</span>)
            };
        };
        const entrance = () => {
            let obj = {icon: null, descr: null};
            if (building['entrance-suit-f-wheelchair'] === 2) {
                obj = iconObj({
                    src: 'entrance-wheelchair.gif',
                    label: 'Eingang ist vollständig rollstuhlgerecht'
                });
            }
            else if (building['entrance-suit-f-wheelchair'] === 1) {
                obj = iconObj({
                    src: 'entrance-wheelchair-restr.gif',
                    label: 'Eingang ist teilweise rollstuhlgerecht'
                });
            }
            return obj;
        };
        const lift = () => {
            let obj = {icon: null, descr: null};
            if (building['lift-suit-f-wheelchair'] === 1) {
                obj = iconObj({
                    src: 'elevator-wheelchair.gif',
                    label: 'Aufzug ist vorhanden und rollstuhlgerecht'
                });
            }
            else if (building['lift-avail'] === 1) {
                obj = iconObj({
                    src: 'elevator.gif',
                    label: 'Aufzug ist vorhanden'
                });
            }
            return obj;
        };
        const toilet = () => {
            let obj = {icon: null, descr: null};
            if (building['toilet-suit-f-wheelchair'] === 2) {
                obj = iconObj({
                    src: 'toilet-wheelchair.gif',
                    label: 'Toilette ist vorhanden und rollstuhlgerecht'
                });
            }
            else if (building['toilet-suit-f-wheelchair'] === 1) {
                obj = iconObj({
                    src: 'toilet-wheelchair-restr.gif',
                    label: 'Toilette ist vorhanden und teilweise rollstuhlgerecht'
                });
            }
            else if (building['toilet-avail'] === 1) {
                obj = iconObj({
                    src: 'toilet.gif',
                    label: 'Toilette ist vorhanden'
                });
            }
            return obj;
        };
        
        const iconsHTML = this.state.showDetails ? (
            <div>
                <Row>
                    <Col xs={3} style={{textAlign: 'right'}}>{entrance().icon}</Col>
                    <Col xs={9}>{entrance().descr}</Col>
                </Row>
                <Row>
                    <Col xs={3} style={{textAlign: 'right'}}>{lift().icon}</Col>
                    <Col xs={9}>{lift().descr}</Col>
                </Row>
                <Row>
                    <Col xs={3} style={{textAlign: 'right'}}>{toilet().icon}</Col>
                    <Col xs={9}>{toilet().descr}</Col>
                </Row>
            </div>
        ) : (
            <ul className="a11yIcons-list">
                <li>
                    {entrance().icon}
                </li>
                <li>
                    {lift().icon}
                </li>
                <li>
                    {toilet().icon}
                </li>
            </ul>
        );


        return (iconsHTML);
    }
}

export default A11yIcons;
