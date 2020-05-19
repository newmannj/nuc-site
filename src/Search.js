import React from 'react';
import './Search.css';

export class Search extends React.Component {
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

    handleKeyDown = (e) => { if(e.key === 'Enter') this.onSearch() };

    onSearch = () => this.props.onSearch(this.state.query);

    render() {
        return(
            <div className="search-container">
                <input 
                    id="search" 
                    placeholder="Search for a building nearby"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    />
                <button 
                    onClick={this.onSearch}>Get a room!</button>
            </div>
        )
    }
}