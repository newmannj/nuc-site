const utils = require('../src/utils');

test('obtains correct minutes from timestring', () => {
    expect(utils.minutesFromTimeString('0000')).toBe(0);
    expect(utils.minutesFromTimeString('0630')).toBe(390);
    expect(utils.minutesFromTimeString('1100')).toBe(660);
    expect(utils.minutesFromTimeString('1200')).toBe(720);
    expect(utils.minutesFromTimeString('1630')).toBe(990);
})

test('obtains correct timestring from minutes', () => {
    expect(utils.minutesToTimeString(0)).toBe('0000');
    expect(utils.minutesToTimeString(600)).toBe('1000');
    expect(utils.minutesToTimeString(1000)).toBe('1640');
})

test('24 hr timestring converts correctly to 12 hr', () => {
    expect(utils.toTwelveTimestring('0800')).toBe('8:00 AM');
    expect(utils.toTwelveTimestring('1130')).toBe('11:30 AM');
    expect(utils.toTwelveTimestring('1300')).toBe('1:00 PM');
})