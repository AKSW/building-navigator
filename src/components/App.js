/*eslint-disable no-console */
/*eslint max-nested-callbacks: ["error", 5]*/
/*eslint max-len: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-trailing-spaces: 0*/

import React from 'react';
import Header from './Header';
import BuildingNavigator from '../containers/BuildingNavigator';
import MapContainer from './MapContainer';

/*class CounterButton extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            counter: ++this.state.counter
        });
    }

    render() {
        const counter = this.state.counter;
        return (
            <button onClick={this.handleClick}>Counted {counter} clicks...</button>
        );
    }
}*/

/*class App extends React.Component {
    constructor() {
        super();
        this.state = {
            output: null,
            places: [],
        };
        //this.initStore = this.initStore.bind(this);

        //this.store = null;        
    }  

    componentWillMount() {
    //componentDidMount() {
        const store = new Store();
        const plc = new Places(store);        
    
        store.init((count) => {
            //const triples = graph.toArray();
            if (!this.isUnmounted) {
                this.setState({
                    output: 'Yes, we have ' + count + ' triples in your graph. '
                });
            }

            plc.getPlaces((places) =>{
                console.log('Places: ', places.length);

                if (!this.isUnmounted) {
                    this.setState({
                        places
                    });
                }
            });         
        });
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    // setNotUnmountedState(key, value) {
    //     if ( ! this.isUnmounted ) {
    //         this.setState({
    //             key: value
    //         });
    //     }
    // }

    render() {
        const output = this.state.output;
        const places = this.state.places;
        //console.log(this.props);
        return (            
            <div id="app">
                <header className="header">
                    <h1>The Building Navigator - {this.props.places}</h1>
                    <p>{output}</p>
                </header>
                <OSMap test='Das ist Mein Test...' places={places} />
            </div>
        );
    }
}*/

const App = () => (
  <div>    
    <Header />
    <BuildingNavigator />
  </div>
);

export default App;
