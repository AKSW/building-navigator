import React from 'react'

import Search from './sidebar/Search';
import Results from './sidebar/Results';

class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            sidebarRoute: 'search',
            filters: props.stores.filterStore.getAll(),
            buildings: [],
        };
    }

    componentWillReceiveProps() {
        this.setState({
            sidebarRoute: this.props.stores.uiStore.get('sidebarRoute'),
            filters: this.props.stores.filterStore.getAll(),
            buildings: this.props.stores.buildingStore.getVisibles()
        });
    }

    render() {
        return (
            <div className="col-md-4">
                {this.state.sidebarRoute === 'search' &&
                    <Search filters={this.state.filters} />
                }
                {this.state.sidebarRoute === 'results' &&
                    <Results buildings={this.state.buildings} />
                }
            </div>
        );
    }
}

export default Sidebar;
