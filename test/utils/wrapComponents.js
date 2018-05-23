import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import {JSDOM} from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import mockedAxios from 'axios';
//import _100buildings from './assets/100-buildungs-index'

import _10buildings from '../assets/10-buildungs-index';

//import {_10buildings} from '../assets/10buildings';
//import {fetch} from './fetch';
import {pushState} from './pushState';

import {getLogger, getStores, getEventHandler} from './utils';

import BuildingNavigator from '../../src/BuildingNavigator';

window.localStorage = {};
window.localStorage.getItem = () => {
    return null;
}
window.localStorage.setItem = () => {
    return null;
}


function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .reduce((result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }), {});
    Object.defineProperties(target, props);
}

/**
 * Get wrap of BuildingNavigator component
 *
 * @param {string} (type = 'shallow') Type of wrap.
 *      'shallow' mounts only to first sub-component (see: http://airbnb.io/enzyme/#basic-usage)
 *      'mount' full mount of component
 */
export const wrapBuildingNavigator = (type = 'shallow') => {
    //fetch(_10buildings);
    //const div = global.document.createElement('div');
    //global.document.body.appendChild(div);

    //const documentHTML = '<!doctype html><html><body><div id="building-navigator"></div></body></html>';
    //global.document = jsdom(documentHTML);
    //global.window = document.parentWindow;

    const jsdom = new JSDOM('<!doctype html><html><body><div id="building-navigator"></body></html>');
    const { window } = jsdom;

    global.window = window;
    global.document = window.document;
    global.navigator = {
    userAgent: 'node.js',
    };
    copyProps(window, global);

    const logger = getLogger();
    const stores = getStores(logger);
    const eventHandler = getEventHandler(stores, logger);

    // call the mock of history push state for router store
    pushState();

    eventHandler.handleEvent({
        action: 'update-ui-config',
        payload: {key: 'userConfig', value: {container: 'building-navigator'}}
    });

    mockedAxios.mockImplementationOnce(() => {
        return Promise.resolve({ data: _10buildings });
    })

    switch (type) {
        case 'shallow':
            return shallow(<BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />);
            break;
        case 'mount':
            return mount(
                <BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />,
                { attachTo: document.getElementById('building-navigator') }
            );
            break;

        default:
            return null;
    }
};
