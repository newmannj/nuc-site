import React from 'react';
import './RoomTimeBar.css';

export function RoomTimeBar(props) {
    const diffList = props.diffList;
    const timeBars = diffList.map((diff, index) => {
        if(diff.isClass) {
            return <div key={index} className="occupied" style={{minWidth: diff.diff+'%'}}>&nbsp;</div>
        } else {
            return <div key={index} className="vacant" style={{minWidth: diff.diff+'%'}}>&nbsp;</div>
        }
    })
    return (
        <div className="timebar-container">
            {timeBars}
        </div>
    )
}