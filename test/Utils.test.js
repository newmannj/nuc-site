const utils = require('../src/utils.js');

test('minutes from time string', () => {
    expect(utils.getMinutesFromTimeString("08:00")).toBe(480);
    expect(utils.getMinutesFromTimeString("00:00")).toBe(0);
})

test('minutes to time string', () => {
    expect(utils.minutesToTimeString(480)).toBe("08:00");
    expect(utils.minutesToTimeString(0)).toBe("00:00");
})