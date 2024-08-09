"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAlarm = void 0;
// ModelAlarm.ts
class ModelAlarm {
    constructor(time, day) {
        this._time = time;
        this._day = day;
        this._snoozeCount = 0;
    }
    get time() {
        return this._time;
    }
    set time(newTime) {
        this._time = newTime;
    }
    get day() {
        return this._day;
    }
    set day(newDay) {
        this._day = newDay;
    }
    get snoozeCount() {
        return this._snoozeCount;
    }
    incrementSnoozeCount() {
        if (this._snoozeCount < 3) {
            this._snoozeCount++;
        }
        else {
            console.log('Max snooze limit reached.');
        }
    }
    resetSnoozeCount() {
        this._snoozeCount = 0;
    }
}
exports.ModelAlarm = ModelAlarm;
