import React from 'react';
import ReactTooltip from 'react-tooltip';
import './RoomTimeBar.css';
const utils = require('./utils');

export function RoomTimeBar(props) {
    const diffList = props.diffList;
    const timeBars = diffList.map((diff, index) => {
        if(diff.isClass) {
            return <div data-tip={utils.toTwelveTimestring(diff.startTime) + "-" + utils.toTwelveTimestring(diff.endTime)} 
                        key={index} className="occupied" style={{minWidth: diff.diff+'%'}}>&nbsp;</div>
        } else {
            return <div key={index} className="vacant" style={{minWidth: diff.diff+'%'}}>&nbsp;</div>
        }
    })
    return (
        <div className="timebar-container">
            {timeBars}
            <ReactTooltip effect="solid"/>
        </div>
    )
}