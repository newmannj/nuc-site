/**
 * Converts a 24 hour time string to minutes.
 * @param {string} timeString - The timestring to convert
 * @return {number} The minutes from midnight.
 */
export const getMinutesFromTimeString = (timeString) => {
    let result = 0;
    const detokenized = timeString.split(':');
    result = +(detokenized[0] * 60) + +detokenized[1];
    return result;
}

/**
 * Converts minutes to 12 hour time string.
 * @param {number} minutes - The minutes to convert
 * @return {string} Time string (12h format)
 */
export const minutesToTimeString = (minutes) => {
    let result = '';
    let mins = minutes % 60;
    let hours = Math.floor(minutes / 60);
    hours = hours === 12 ? 12 : hours % 12;
    let hourPadded = hours < 10 ? "0".concat(hours) : hours;
    let minPadded = mins < 10 ? "0".concat(mins) : mins;
    return result.concat(hourPadded).concat(":").concat(minPadded);
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