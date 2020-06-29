import React from 'react';
import './RoomCard.css';
import { RoomTimeBar } from './RoomTimeBar.js';

export function RoomCard(props) {
    const roomData = props.roomData;
    const isHidden = props.isHidden;
    const diffList = props.diffList;
    const startTime = props.startTime;
    const endTime = props.endTime;
    const currentlyOpen = diffList[0].isClass ? "Busy" : "Open";
    
    if(!isHidden) {
        return (
            <div className="room-card-container">
                <span className="room-card-content rc-header">{roomData.building}&nbsp;{roomData.room}</span>
                <div className="status-container">
                    <span className="status-text">{currentlyOpen}</span>
                    <ion-icon
                        class={'status-icon ' + (diffList[0].isClass ? "busy" : "open") }
                        name="square"></ion-icon>
                </div>
                <RoomTimeBar diffList={diffList}/>
                <span className="room-card-content rc-start-time">{startTime}</span>
                <span className="room-card-content rc-end-time">{endTime}</span>
            </div>
        )
    } else {
        return null;
    }
}