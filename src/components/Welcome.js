import React from 'react';
import {
    Modal,
    Button,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Clearfix,
} from 'react-bootstrap';

import Cookies from 'js-cookie';
import Sponsors from './Sponsors'

/**
 * Welcome message on first visiting.
 * Contains short intro text and global dissability settings
 */
class Welcome extends React.Component {
    constructor(props) {
        super();

        this.handleGlobalDisab = this.handleGlobalDisab.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    /**
     * Changed dissability selection, update and apply filters
     */
    handleGlobalDisab(e) {
        // set global disabiliy in ui store
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'globalDisability',
                value: e.target.value
            }
        });
        // first rest all filters
        super.handleEvent({action: 'reset-all-filters'});
        // updates filter for move-impaired
        if (e.target.value === 'move') {
            super.handleEvent({
                action: 'update-filter',
                payload: {filterId: 'entrance', value: 1}
            });
            super.handleEvent({
                action: 'update-filter',
                payload: {filterId: 'lift', value: 2}
            });
            super.handleEvent({
                action: 'update-filter',
                payload: {filterId: 'toilet', value: 2}
            });
        }
        // activate help for blind
        else if (e.target.value === 'blind') {
            super.handleEvent({
                action: 'update-filter',
                payload: {filterId: 'blind', value: 1}
            });
        }
        // activate gelp for hearing
        else if (e.target.value === 'hear') {
            super.handleEvent({
                action: 'update-filter',
                payload: {filterId: 'hearing', value: 1}
            });
        }
        // apply filters to buildings
        super.handleEvent({
            action: 'apply-filters'
        });
    }

    /**
     * Close welcome message, store in cookie
     */
    handleOk(e) {
        Cookies.set('showWelcome', false, { expires: 1 });
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'showWelcome',
                value: false
            }
        });
    }

    /**
     * Render welcome message with selection for dissability
     */
    render() {
        return (
            <div>
                <div className="welcome-bgr"></div>
                <Modal.Dialog className="welcome-msg" bsSize="large" autoFocus={true}>
                    <Modal.Header>
                        <Modal.Title componentClass="h3">Willkommen!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body tabIndex="1">
                        <p className="welcome-text">
                            Dies ist ein interaktives Tool um barrierefreie Gebäude in Leipzig zu finden.
                            Sie können Gebäude auf der Karte finden oder durch Filter nach verschiedenen Kriterien zur Barrierefreiheit auswählen.
                            Sie können unten eine Vorauswahl der Behinderung treffen.
                        </p>
                        <br />
                        <Form className="global-dissability-form">
                            <p><strong>Vorauswahl der Behinderung:</strong></p>
                            <Col md={9} className="filterSelect">
                                <FormControl
                                    componentClass="select"
                                    aria-label=""
                                    onChange={this.handleGlobalDisab}
                                    size="4"
                                    defaultValue="undefined"
                                >
                                    <option value="undefined">keine Vorauswahl</option>
                                    <option value="blind">Blind oder Sehbehinderung</option>
                                    <option value="move">Gehbehinderung</option>
                                    <option value="hear">Hörbehinderung</option>
                                </FormControl>
                            </Col>
                            <Clearfix />
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" bsSize="large" block onClick={this.handleOk}>
                            OK, beginnen
                        </Button>
                        <hr />
                        <Sponsors />
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default Welcome;
