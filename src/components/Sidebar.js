/**
  * Component for the filter sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import Toggle from 'material-ui/Toggle';

const Sidebar = (props) => {
    return (
        <div>
            <h3>Filter</h3>
            <Toggle
                label="Accessible Lift"
                defaultToggled={props['lift-liftWithWheelChairSupportAvailable']}
                onToggle={() => props.updateFilter(
                    'lift-liftWithWheelChairSupportAvailable',
                    !props['lift-liftWithWheelChairSupportAvailable']
                )}
            />
        </div>
    );
};

Sidebar.propTypes = {
    updateFilter: PropTypes.func
};

export default Sidebar;
