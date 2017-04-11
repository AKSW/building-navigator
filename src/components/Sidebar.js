import React from 'react'
import Swipeable from 'react-swipeable';
import {Button} from 'react-bootstrap';

import Search from './sidebar/Search';
import Results from './sidebar/Results';

class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
        };

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
        });
    }

    handleToggleSidebar(e) {
        super.handleEvent({
            action: 'toggle-sidebar',
        });
        e.preventDefault();
    }

    /**
     * Render sidebar, search or result component with hide-button. Or if its hidden a show-button
     */
    render() {
        // get current route (search or results) for the sidebar
        const currentRoute = this.state.stores.routerStore.getCurrentRoute();

        // @todo may implement transparent onSwipeRight overlay over map
        const sidebarHtml = this.state.stores.uiStore.get('sidebarIsVisible')
            ? (<Swipeable onSwipedLeft={this.handleToggleSidebar}>
                    <div className="sidebar">
                        {currentRoute.component === 'Search' &&
                            <Search stores={this.state.stores} />
                        }
                        {currentRoute.component === 'Results' &&
                            <Results stores={this.state.stores} />
                        }
                    </div>
                    <div className="btn-toggle-sidebar btn-hide-sidebar">
                        <Button
                            bsClass="btn btn-lg btn-default pull-right"
                            title="Seitenleiste ausblenden"
                            aria-hidden={true}
                            onClick={this.handleToggleSidebar}
                        >
                            <i className="fa fa-angle-double-left" aria-hidden={true}></i>
                        </Button>
                    </div>
                </Swipeable>)
            : (<div className="btn-toggle-sidebar btn-show-sidebar">
                    <Button
                        bsStyle="default"
                        bsSize="large"
                        title="Seitenleiste einblenden"
                        onClick={this.handleToggleSidebar}
                        aria-hidden={true}
                    >
                        <i className="fa fa-angle-double-right" aria-hidden={true}></i>
                    </Button>
                </div>
            );

        return (sidebarHtml);
    }
}

export default Sidebar;
