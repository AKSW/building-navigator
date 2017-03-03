import React from 'react'

import Search from './sidebar/Search';
import Results from './sidebar/Results';

class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            sidebarRoute: 'search',
            stores: props.stores,
            filters: props.stores.filterStore.getAll(),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sidebarRoute: nextProps.stores.uiStore.get('sidebarRoute'),
            filters: nextProps.stores.filterStore.getAll()
        });
    }

    render() {
        const sidebarClass = this.state.stores.uiStore.get('globalDisability') === "blind" ? "sidebar sidebar-full" : "sidebar";
        return (
            <div className={sidebarClass}>
                {this.state.sidebarRoute === 'search' &&
                    <Search filters={this.state.filters} />
                }
                {this.state.sidebarRoute === 'results' &&
                    <Results stores={this.state.stores} />
                }
            </div>
        );
    }
}

export default Sidebar;
