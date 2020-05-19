import React from 'react';
import './App.css';
import { Search } from './Search.js';
import { RoomList } from './RoomList.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRooms: {},
            isLoaded: false,
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
                    currentRooms: result
                })
            }
        )
    }

    fetchRooms(building) {
        console.log("Doing search for:" + building);
    }

    render() {
        return (
            <div className="nuc-container">
                <h1>Study Space @NU</h1>
                <Search 
                    onSearch={this.fetchRooms}
                />
                <RoomList
                    rooms={this.state.currentRooms}
                    isLoaded={this.state.isLoaded}
                />
            </div>
        );
    }
}

export default App;
