"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTimeFormat = isValidTimeFormat;
exports.isValidDay = isValidDay;
// utils.ts
function isValidTimeFormat(time) {
    const timeParts = time.split(':');
    if (timeParts.length !== 2) {
        return false;
    }
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) {
        return false;
    }
    if (hours < 0 || hours >= 24) {
        return false;
    }
    if (minutes < 0 || minutes >= 60) {
        return false;
    }
    return true;
}
function isValidDay(day) {
    const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return validDays.includes(day);
}
