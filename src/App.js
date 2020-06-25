import React from 'react';
import './App.css';
import { Search } from './Search.js';
import { Filter } from './Filter.js';
import { RoomList } from './RoomList.js';
import NeuLogo from './assets/neu-logo.png'


class App extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            currentRooms: {},
            isLoaded: false,
            numToDisplay: 0
        }
    }

    /** Fetch initial list of rooms. */
    componentDidMount() {
        fetch("http://localhost:8000/api/classrooms?day=1")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    currentRooms: result,
                    numToDisplay: 10,
                    filterString: "",
                })
            }
        )
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.setState({
                numToDisplay: this.state.numToDisplay + 10,
            })
        }
    }

    fetchRooms = (building) => {
        fetch("http://localhost:8000/api/building?day=1&building="+building)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({ 
                    isLoaded: true, 
                    currentRooms: result, 
                    numToDisplay: 10 
                })
            }
        );
    }

    updateFilter = (filterString) => this.setState({ filterString: filterString })

    render() {
        return (
            <div>
            <div className="nuc-header">
                <img
                    src={NeuLogo}
                    className="school-logo"
                    alt="Northeastern Logo"></img>
                <h1>Study Space</h1>
            </div>
            <div className="nuc-container">
                <Filter onUpdate={this.updateFilter}/>
                <RoomList
                    rooms={this.state.currentRooms}
                    isLoaded={this.state.isLoaded}
                    numToDisplay={this.state.numToDisplay}
                    filterString={this.state.filterString}
                />
            </div>
            </div>
        );
    }
}

export default App;
