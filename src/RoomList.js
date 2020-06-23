import React from 'react';
import { RoomCard } from './RoomCard.js';
import './RoomList.css';

/** Simple function to get minutes from time string. Probably should pull out
 * to a utils in the future. */
function getMinutesFromTimeString(timeString) {
    let result = 0;
    const detokenized = timeString.split(':');
    result = +(detokenized[0] * 60) + +detokenized[1];
    return result;
}

function minutesToTimeString(minutes) {
    let result = '';
    let mins = minutes % 60;
    let hours = Math.floor(minutes / 60);
    return result.concat(hours).concat(":").concat(mins);
}

function getFreeTime(diffList, duration) {
    let result = 0;
    diffList.forEach((diff) => {
        if(!diff.isClass) {
            result += diff.diff / 100 * duration;
        }
    })
    return result;
}

function getDiffList(room, startTime, duration) {
    const startMinutes = getMinutesFromTimeString(startTime);
    const endMinutes = startMinutes + duration;
    //Sort the list to ease diff list calculations.
    const sortedTimes = room.times.sort((classA, classB) => {
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
    if(timeRemaining !== 0) {
        diffList.push({
            isClass: false,
            diff: timeRemaining/duration * 100
        })
    }
    return diffList;
}

export function RoomList(props) {
    const rooms = props.rooms;
    const startTime = '08:30';
    const duration = 180;
    const isLoaded = props.isLoaded;
    const numToDisplay = props.numToDisplay;
    const roomElements = Object.keys(rooms).map((name, index) => {
        let isHidden = index > numToDisplay;
        let diffList = getDiffList(rooms[name], startTime, duration);
        let freeTime = getFreeTime(diffList, duration);
        return(
            <RoomCard 
                key={name}
                roomData={rooms[name]}
                isHidden={isHidden}
                startTime={startTime}
                duration={duration}
                diffList={diffList}
                freeTime={freeTime}
            />
        )
    });
    const sortedEls = roomElements.sort((a, b) => {
        return b.props.freeTime - a.props.freeTime
    });
    if (isLoaded) {
        return(
            <div className="room-list-container">
                <ul className="room-list">{sortedEls}</ul>
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