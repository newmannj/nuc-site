/**
 * Converts raw minutes from midnight to a 24 hour time string.
 * @param {} timeString 
 */
export const getMinutesFromTimeString = (timeString) => {
    let result = 0;
    const detokenized = timeString.split(':');
    result = +(detokenized[0] * 60) + +detokenized[1];
    return result;
}

export const minutesToTimeString = (minutes) => {
    let result = '';
    let mins = minutes % 60;
    let hours = Math.floor(minutes / 60);
    hours = hours === 12 ? 12 : hours % 12;
    let hourPadded = hours < 10 ? "0".concat(hours) : hours;
    let minPadded = mins < 10 ? "0".concat(mins) : mins;
    return result.concat(hourPadded).concat(":").concat(minPadded);
}

export const getFreeTime = (diffList, duration) => {
    let result = 0;
    diffList.forEach((diff) => {
        if(!diff.isClass) {
            result += diff.diff / 100 * duration;
        }
    })
    return result;
}