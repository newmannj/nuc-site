import React from 'react';
import './App.css';
import { Search } from './Search.js';
import { RoomList } from './RoomList.js';
import { Footer } from './Footer';
import { Header } from './Header';
import NeuLogo from './assets/neu-logo.png'


class App extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            currentRooms: {},
            isLoaded: false,
            numToDisplay: 0,
            badRequest: false
        }
    }

    /** Fetch initial list of rooms. */
    componentDidMount() {
        let d = new Date();
        let curDay = d.getDay();
        fetch("/api/classrooms?day=" + curDay)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    currentRooms: result['rooms'],
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
        let d = new Date();
        let curDay = d.getDay();
        fetch("/api/building?day="+curDay+"&building="+building)
        .then(res => res.json())
        .then(
            (result) => {
                if(result['roomCount'] === 0) {
                    this.setState({
                        badRequest: true
                    })
                } else {
                    this.setState({ 
                        isLoaded: true, 
                        currentRooms: result['rooms'], 
                        numToDisplay: 10,
                        badRequest: false
                    })
                }
            }
        );
    }

    render() {
        return (
            <div id="page-container">
                <div className="nuc-container">
                    <Header></Header>
                    <Search 
                        onSearch={this.fetchRooms}
                        badRequest={this.state.badRequest}/>
                    <RoomList
                        rooms={this.state.currentRooms}
                        isLoaded={this.state.isLoaded}
                        numToDisplay={this.state.numToDisplay}
                    />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
