import React from 'react';
import './Filter.css';

export class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        }
    }
    
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleKeyDown = (e) => { this.props.onUpdate(this.state.query) };

    render() {
        return(
            <div className="filter-container">
            <div className="filter-input-container">
                <input 
                    id="filter" 
                    placeholder="Filter results..."
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyDown}
                    />
            </div>
            </div>
        )
    }
}