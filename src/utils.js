/**
 * Converts 24hr time string to minutes from midnight.
 * @param {string} timeString - Timestring of format "HHMM"
 * @return {number} Number of minutes from midnight
 */
export const minutesFromTimeString = (timeString) => {
    let result = 0;
    let hours = timeString.substring(0, 2);
    let mins = timeString.substring(2);
    result = +(hours * 60) + +mins;
    return result;
}

/**
 * Converts minutes to 24 hour time string.
 * @param {number} minutes - The minutes to convert
 * @return {string} Time string (24h format)
 */
export const minutesToTimeString = (minutes) => {
    console.log(minutes)
    let result = '';
    let mins = minutes % 60;
    let hours = Math.floor(minutes / 60);
    let hourPadded = hours < 10 ? "0".concat(hours) : hours;
    let minPadded = mins < 10 ? "0".concat(mins) : mins;
    return result.concat(hourPadded).concat(minPadded);
}

/**
 * Gets the free time in minutes from the provided diffList and duration.
 * @param {array} diffList - List of alternating class/non class diffs.
 * @param {number} duration - Duration (minutes) of the time window.
 * @return {number} The number of free minutes.
 */
export const getFreeTime = (diffList, duration) => {
    let result = 0;
    diffList.forEach((diff) => {
        if(!diff.isClass) {
            result += diff.diff / 100 * duration;
        }
    })
    return result;
}