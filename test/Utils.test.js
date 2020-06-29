const utils = require('../src/utils.js');

test('minutes from time string', () => {
    expect(utils.getMinutesFromTimeString("00:00")).toBe(0);
    expect(utils.getMinutesFromTimeString("08:00")).toBe(480);
    expect(utils.getMinutesFromTimeString("12:01")).toBe(721);
    expect(utils.getMinutesFromTimeString("13:24")).toBe(804);
})

test('minutes to time string', () => {
    expect(utils.minutesToTimeString(0)).toBe("00:00");
    expect(utils.minutesToTimeString(480)).toBe("08:00");
    expect(utils.minutesToTimeString(720)).toBe("12:00");
    expect(utils.minutesToTimeString(721)).toBe("12:01");
    expect(utils.minutesToTimeString(1380)).toBe("11:00");
})

test('get free time empty room', () => {
    let diff = [{isClass: false, diff: 100}];
    expect(utils.getFreeTime(diff, 180)).toBe(180);
})

test('get free time one class', () => {
    let diff = [{isClass: false, diff: 50}, {isClass: true, diff: 50}];
    expect(utils.getFreeTime(diff, 180)).toBe(90);
})

test('get free time multiple classes', () => {
    let diff = [{isClass: false, diff: 15}, 
                {isClass: true, diff: 25},
                {isClass: false, diff: 10},
                {isClass: true, diff: 30},
                {isClass: false, diff: 20}];
    expect(utils.getFreeTime(diff, 180)).toBe(81);
})