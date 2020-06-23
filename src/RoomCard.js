import React from 'react';
import './RoomCard.css';
import { RoomTimeBar } from './RoomTimeBar.js';

export function RoomCard(props) {
    const roomData = props.roomData;
    const isHidden = props.isHidden;
    const diffList = props.diffList;
    const startTime = props.startTime;
    const endTime = props.endTime;
    
    if(!isHidden) {
        return (
            <div className="room-card-container">
                <span className="room-card-content rc-header">{roomData.building}&nbsp;{roomData.room}</span>
                <RoomTimeBar diffList={diffList}/>
                <span className="room-card-content rc-start-time">{startTime}</span>
                <span className="room-card-content rc-end-time">{endTime}</span>
            </div>
        )
    } else {
        return null;
    }
}