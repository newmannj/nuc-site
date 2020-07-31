import React from 'react';
import { RoomCard } from './RoomCard.js';
import './RoomList.css';
const utils = require('./utils.js');

function getDiffList(room, startTime, duration) {
    const startMinutes = utils.minutesFromTimeString(startTime);
    const endMinutes = startMinutes + duration;
    //Sort the list to ease diff list calculations.
    const sortedTimes = room.times.sort((classA, classB) => {
        return utils.minutesFromTimeString(classA.startTime) - utils.minutesFromTimeString(classB.startTime);
    })
    const diffList = [];
    let timeRemaining = duration;
    let lastEndTime = startMinutes;
    sortedTimes.forEach((classTime) => {
        const classStartMinutes = utils.minutesFromTimeString(classTime.startTime);
        const classEndMinutes = utils.minutesFromTimeString(classTime.endTime);
        if (classEndMinutes < startMinutes || classStartMinutes > endMinutes || lastEndTime === classEndMinutes) {
            return;
        } else {
            //Add empty space between the last class and this one.
            let emptyTime = (classStartMinutes - lastEndTime);
            if (emptyTime > 0) {
                timeRemaining -= emptyTime;
                emptyTime = (emptyTime / duration) * 100;
                if(emptyTime >= 1) {
                diffList.push({
                    isClass: false,
                    diff: emptyTime
                })}
                
            }
            lastEndTime = classEndMinutes;
            //Calculate the amount of time that the class consumes within the viewing window.
            let classTimeInDuration;
            if (classStartMinutes <= startMinutes && classEndMinutes >= endMinutes) {
                classTimeInDuration = (endMinutes - startMinutes);
            } else if (classStartMinutes < startMinutes) {
                classTimeInDuration = (classEndMinutes - startMinutes);
            } else if (classEndMinutes > endMinutes) {
                classTimeInDuration = (endMinutes - classStartMinutes);
            } else {
                classTimeInDuration = (classEndMinutes - classStartMinutes);
            }
            timeRemaining -= classTimeInDuration;
            let classTimePercentage = (classTimeInDuration / duration) * 100
            //Issues with divs not being able to take up small spaces, so for now
            //don't display.
            if(classTimePercentage >= 1) {
                diffList.push({
                    isClass: true,
                    diff: classTimePercentage,
                    startTime: classTime.startTime,
                    endTime: classTime.endTime
                })
            }
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
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const startTime = utils.minutesToTimeString((hours*60) + minutes);
    const duration = 180;
    const endTime = utils.minutesToTimeString(utils.minutesFromTimeString(startTime) + duration);
    const isLoaded = props.isLoaded;
    const numToDisplay = props.numToDisplay;
    const roomElements = Object.keys(rooms).map((name, index) => {
        let diffList = getDiffList(rooms[name], startTime, duration);
        let freeTime = utils.getFreeTime(diffList, duration);
        let propsObj = {};
        propsObj.key = name;
        propsObj.building = rooms[name].building;
        propsObj.room = rooms[name].room;
        propsObj.startTime = startTime;
        propsObj.endTime = endTime;
        propsObj.duration = duration;
        propsObj.diffList = diffList;
        propsObj.freeTime = freeTime;
        propsObj.conflictsDetected = freeTime < 0;
        return propsObj;
    });
    //Sort in order of free time remaining.
    const sortedEls = roomElements.sort((a, b) => {
        return b.freeTime - a.freeTime
    });
    //Filter sorted results based on filter string.
    let itemizedEls = sortedEls.map((propsObj, index) => {
            return(
                <RoomCard
                    key = {propsObj.key}
                    building = {propsObj.building}
                    room = {propsObj.room}
                    isHidden = {(index > numToDisplay)}
                    diffList = {propsObj.diffList}
                    startTime = {propsObj.startTime}
                    endTime = {propsObj.endTime}
                    conflictsDetected = {propsObj.conflictsDetected}
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
            <div className="room-list-loading">
                <h2>Fetching classrooms...</h2>
            </div>
        );
    }
}