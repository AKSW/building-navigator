import React from 'react';
import {
    Modal,
    Button,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

import Cookies from 'js-cookie';

class Welcome extends React.Component {
    constructor(props) {
        super();

        this.handleGlobalDisab = this.handleGlobalDisab.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleGlobalDisab(e) {
        super.logger.log('@todo: set filers if global disability was selected');
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
                payload: {filterId: 'entrance', setKey: 1}
            });
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'lift', setKey: 2}
            });
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'toilet', setKey: 2}
            });
        }
        else if (e.target.value === 'hear') {
            super.handleEvent({action: 'update-filter',
                payload: {filterId: 'hearing', setKey: 1}
            });
        }
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
                <Modal.Dialog className="welcome-msg">
                    <Modal.Header>
                        <Modal.Title>Willkommen!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body tabIndex="1">
                        <p>
                            Hier können Sie barrierefreie Gebäude in Leipzig finden.
                            Wählen Sie dazu den gewünschten Ort und Kriterien, zum Beispiel einen Fahrstuhl aus.
                            Oder suchen Sie nach dem Namen einer Einrichtung.
                        </p>

                        <FormGroup>
                            <Col componentClass={ControlLabel} md={3}>
                                Vorauswahl der Behinderung:
                            </Col>
                            <Col md={9}>
                                <FormControl
                                    componentClass="select"
                                    aria-label=""
                                    onChange={this.handleGlobalDisab}
                                >
                                    <option value="undefined">keine Vorauswahl</option>
                                    <option value="blind">Blind oder Sehbehindert</option>
                                    <option value="move">Gehbehinderung</option>
                                    <option value="hear">Hörbehindert</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleOk}>
                            OK, beginnen
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default Welcome;
