import React from 'react';
import './RoomCard.css';
import { RoomTimeBar } from './RoomTimeBar.js';

/** Simple function to get minutes from time string. Probably should pull out
 * to a utils in the future. */
function getMinutesFromTimeString(timeString) {
    let result = 0;
    const detokenized = timeString.split(':');
    result = +(detokenized[0] * 60) + +detokenized[1];
    return result;
}

export function RoomCard(props) {
    const roomData = props.roomData;
    const isHidden = props.isHidden;
    const startTime = '08:30'; //Not sure on best format to keep this.
    const duration = 180; //Duration of time bar in minutes.
    const startMinutes = getMinutesFromTimeString(startTime);
    const endMinutes = startMinutes + duration;
    //Sort the list to ease diff list calculations.
    const sortedTimes = roomData.times.sort((classA, classB) => {
        return getMinutesFromTimeString(classA.startTime) - getMinutesFromTimeString(classB.startTime);
    })
    const diffList = [];
    let timeRemaining = duration;
    let lastEndTime = startMinutes;
    sortedTimes.forEach((classTime) => {
        const classStartMinutes = getMinutesFromTimeString(classTime.startTime);
        const classEndMinutes = getMinutesFromTimeString(classTime.endTime);
        if (classEndMinutes < startMinutes || classStartMinutes > endMinutes) {
            return;
        } else {
            //Add empty space between the last class and this one.
            let emptyTime = (classStartMinutes - lastEndTime);
            if (emptyTime > 0) {
                timeRemaining -= emptyTime;
                emptyTime = (emptyTime / duration) * 100;
                diffList.push({
                    isClass: false,
                    diff: emptyTime
                })
            }
            lastEndTime = classEndMinutes;
            //Calculate the percentage of duration that the class consumes.
            let classTime;
            if (classStartMinutes <= startMinutes && classEndMinutes >= endMinutes) {
                classTime = (endMinutes - startMinutes);
            } else if (classStartMinutes < startMinutes) {
                classTime = (classEndMinutes - startMinutes);
            } else if (classEndMinutes > endMinutes) {
                classTime = (endMinutes - classStartMinutes);
            } else {
                classTime = (classEndMinutes - classStartMinutes);
            }
            timeRemaining -= classTime;
            classTime = (classTime / duration) * 100
            diffList.push({
                isClass: true,
                diff: classTime
            })
        }
    })
    if(!isHidden) {
        return (
            <div className="room-card-container">
                <span>{roomData.building}&nbsp;{roomData.room}</span>
                <RoomTimeBar
                    diffList={diffList}
                />
            </div>
        )
    } else {
        return null;
    }
}