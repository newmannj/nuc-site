import React from 'react';
import './Search.css';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            badRequest: props.badRequest
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
            <div className={"search-container" + (this.props.badRequest ? " search-error" : "")}>
                <div className="search-button-container">
                    <ion-icon
                        id="search-btn" 
                        name="search"
                        onClick={this.onSearch}></ion-icon>
                </div>
                <div className="search-input-container">
                    <input 
                        id="search" 
                        placeholder="Search for a building, i.e. 'Ryder'"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        />
                </div>
            </div>
        )
    }
}