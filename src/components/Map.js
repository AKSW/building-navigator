import React from 'react';

import Marker from './map/Marker';

class Map extends React.Component {
    constructor(props) {
        super();

        this.state = {
            buildings: []
        }
    }

    componentWillReceiveProps() {
        this.setState({
            buildings: this.props.stores.buildingStore.getVisibles()
        });
    }

    /**
     * @todo Map should only update if visible buildings changed
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <p>{`Anzahl gebäude: ${this.state.buildings.length}`}</p>
                <ul>
                    {this.state.buildings.map((building) =>
                        <li key={building.id}>
                            <span>{building.title}</span>
                        </li>
                    )}
                </ul>
                <Marker />
            </div>
        );
    }
}

export default Map;
