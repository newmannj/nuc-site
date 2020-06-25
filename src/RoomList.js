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

function getStatus(diffList) {
    if(diffList[0].isClass !== false) {
        return "occupied"
    } else {
        return "vacant"
    }
}

export function RoomList(props) {
    const rooms = props.rooms;
    const startTime = '10:30';
    const duration = 180;
    const isLoaded = props.isLoaded;
    const numToDisplay = props.numToDisplay;
    const filterString = props.filterString;
    const roomElements = Object.keys(rooms).map((name, index) => {
        let diffList = getDiffList(rooms[name], startTime, duration);
        let freeTime = getFreeTime(diffList, duration);
        let status = getStatus(diffList);
        let propsObj = {};
        propsObj.key = name;
        propsObj.roomData = rooms[name];
        propsObj.startTime = startTime;
        propsObj.endTime = minutesToTimeString(getMinutesFromTimeString(startTime) + duration); 
        propsObj.duration = duration;
        propsObj.diffList = diffList;
        propsObj.freeTime = freeTime;
        propsObj.status = status;
        return propsObj;
    });
    //Sort in order of free time remaining.
    const sortedEls = roomElements.sort((a, b) => {
        return b.freeTime - a.freeTime
    });
    //Filter sorted results based on filter string.
    let filteredEls = sortedEls.filter((roomElement) => roomElement.roomData.building.toLowerCase().includes(filterString.toLowerCase()));
    let itemizedEls = filteredEls.map((propsObj, index) => {
        return(
            <RoomCard
                key = {propsObj.key}
                roomData = {propsObj.roomData}
                isHidden = {(index > numToDisplay)}
                diffList = {propsObj.diffList}
                startTime = {propsObj.startTime}
                endTime = {propsObj.endTime}
                status = {propsObj.status}
            />
        )
    })
    if (isLoaded) {
        return(
            <div className="room-list-container">
                <ul className="room-list">{itemizedEls}</ul>
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