import React from 'react'
import Swipeable from 'react-swipeable';
import {Button} from 'react-bootstrap';

import Search from './sidebar/Search';
import Results from './sidebar/Results';

class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            sidebarRoute: 'search',
            stores: props.stores,
        };

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sidebarRoute: nextProps.stores.uiStore.get('sidebarRoute'),
            stores: nextProps.stores,
        });
    }

    handleToggleSidebar(e) {
        super.handleEvent({
            action: 'toggle-sidebar',
        });
        e.preventDefault();
    }

    render() {
        const sidebarClass = this.state.stores.uiStore.get('globalDisability') === "blind" ? "sidebar sidebar-full" : "sidebar";

        const sidebarHtml = this.state.stores.uiStore.get('sidebarIsVisible') ? (
            <Swipeable onSwipedLeft={this.handleToggleSidebar}>
                <div className={sidebarClass}>
                    {this.state.sidebarRoute === 'search' &&
                        <Search filters={this.state.stores.filterStore.getAll()} />
                    }
                    {this.state.sidebarRoute === 'results' &&
                        <Results stores={this.state.stores} />
                    }
                </div>
                <div className="btn-toggle-sidebar btn-hide-sidebar">
                    <Button
                        bsClass="btn btn-lg btn-default pull-right"
                        title="Seitenleiste ausblenden"
                        onClick={this.handleToggleSidebar}
                    >
                        <i className="fa fa-angle-double-left" aria-hidden={true}></i>
                    </Button>
                </div>
            </Swipeable>
        ) : (
            <div className="btn-toggle-sidebar btn-show-sidebar">
                <Button
                    bsStyle="default"
                    bsSize="large"
                    aria-label="Seitenleiste einblenden"
                    title="Seitenleiste einblenden"
                    onClick={this.handleToggleSidebar}
                >
                    <i className="fa fa-angle-double-right" aria-hidden={true}></i>
                </Button>
            </div>
        );

        return (sidebarHtml);
    }
}

export default Sidebar;
