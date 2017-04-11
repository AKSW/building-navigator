import React from 'react';
import {shallow, mount} from 'enzyme';

import {_10buildings} from '../assets/10buildings';
import {fetch} from './fetch';

import {getLogger, getStores, getEventHandler} from './utils';

import BuildingNavigator from '../../src/BuildingNavigator';

// return BuildingNavigator wrapper
// type (String) is: mount or shallow
// mount: full mount of component
// shallow: mounts to first sub-component
// see: http://airbnb.io/enzyme/#basic-usage
export const wrapBuildingNavigator = (type) => {
    fetch(_10buildings);
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const logger = getLogger();
    const stores = getStores(logger);
    const eventHandler = getEventHandler(stores, logger);

    eventHandler.handleEvent({
        action: 'update-ui-config',
        payload: {key: 'userConfig', value: {container: 'building-navigator'}}
    });

    if (type === 'mount') {
        return mount(
            <BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />,
            { attachTo: div }
        );
    } else {
        return shallow(<BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />);
    }
};