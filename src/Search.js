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
            <div className="search-button-container">
                <ion-icon
                    id="search-btn" 
                    name="search"></ion-icon>
            </div>
            <div className="search-input-container">
                <input 
                    id="search" 
                    placeholder="Search for a building nearby"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    />
            </div>
            </div>
        )
    }
}