import React from 'react';
import {
    Modal,
    Button,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Clearfix
} from 'react-bootstrap';

import Cookies from 'js-cookie';

class Welcome extends React.Component {
    constructor(props) {
        super();

        this.handleGlobalDisab = this.handleGlobalDisab.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleGlobalDisab(e) {
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'globalDisability',
                value: e.target.value
            }
        });
        super.handleEvent({action: 'reset-all-filters'});
        if (e.target.value === 'move') {
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'entrance', value: 1}
            });
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'lift', value: 2}
            });
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'toilet', value: 2}
            });
        }
        else if (e.target.value === 'hear') {
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'hearing', value: 1}
            });
        }
        super.handleEvent({
            action: 'apply-filters'
        });
    }

    handleOk(e) {
        Cookies.set('showWelcome', false);
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'showWelcome',
                value: false
            }
        });
    }

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
                            Hier können Sie barrierefreie Gebäude in Leipzig finden.
                            Wählen Sie dazu den gewünschten Ort und Kriterien, zum Beispiel einen Fahrstuhl aus.
                            Oder suchen Sie nach dem Namen einer Einrichtung.
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
                                    <option value="blind">Blind oder Sehbehindert</option>
                                    <option value="move">Gehbehinderung</option>
                                    <option value="hear">Hörbehindert</option>
                                </FormControl>
                            </Col>
                            <Clearfix />
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" className="btn-lg" onClick={this.handleOk}>
                            OK, beginnen
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default Welcome;
