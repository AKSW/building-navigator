import React from 'react';

class Results extends React.Component {
    render() {
        return (
            <div>
                <h3>Result...</h3>
                Gebäude: 
                {this.props.buildings.length}
            </div>
        );
    }
}

export default Results;
