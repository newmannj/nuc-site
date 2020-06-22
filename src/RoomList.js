import React from 'react';
import { RoomCard } from './RoomCard.js';
import './RoomList.css';

export function RoomList(props) {
    const rooms = props.rooms;
    const isLoaded = props.isLoaded;
    const numToDisplay = props.numToDisplay;
    const roomElements = Object.keys(rooms).map((name, index) => {
        let isHidden = index > numToDisplay;
        return(
            <RoomCard 
                key={name}
                roomData={rooms[name]}
                isHidden={isHidden}
            />
        )
    });
    if (isLoaded) {
        return(
            <div className="room-list-container">
                <ul className="room-list">{roomElements}</ul>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }
}