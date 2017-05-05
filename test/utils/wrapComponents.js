import React from 'react';
import {shallow, mount} from 'enzyme';

import {_10buildings} from '../assets/10buildings';
import {fetch} from './fetch';
import {pushState} from './pushState';

import {getLogger, getStores, getEventHandler} from './utils';

import BuildingNavigator from '../../src/BuildingNavigator';

/**
 * Get wrap of BuildingNavigator component
 *
 * @param {string} (type = 'shallow') Type of wrap.
 *      'shallow' mounts only to first sub-component (see: http://airbnb.io/enzyme/#basic-usage)
 *      'mount' full mount of component
 */
export const wrapBuildingNavigator = (type = 'shallow') => {
    fetch(_10buildings);
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const logger = getLogger();
    const stores = getStores(logger);
    const eventHandler = getEventHandler(stores, logger);

    // call the mock of history push state for router store
    pushState();

    eventHandler.handleEvent({
        action: 'update-ui-config',
        payload: {key: 'userConfig', value: {container: 'building-navigator'}}
    });

    switch (type) {
        case 'shallow':
            return shallow(<BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />);
            break;
        case 'mount':
            return mount(
                <BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />,
                { attachTo: div }
            );
            break;

        default:
            return null;
    }
};
