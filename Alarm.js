"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alarm = void 0;
const ModelAlarm_1 = require("./ModelAlarm");
class Alarm {
    constructor(time, day) {
        this.model = new ModelAlarm_1.ModelAlarm(time, day);
    }
    snooze() {
        if (this.model.snoozeCount < 3) {
            const [hour, minute] = this.model.time.split(':').map(Number);
            let newMinute = (minute + 5) % 60;
            let newHour = hour + Math.floor((minute + 5) / 60);
            newHour = newHour < 24 ? newHour : newHour - 24; // Adjust for 24-hour wraparound
            this.model.time = `${newHour}:${newMinute < 10 ? '0' : ''}${newMinute}`;
            this.model.incrementSnoozeCount();
            console.log(`Alarm snoozed to ${this.model.time}`);
        }
        else {
            console.log('Max snooze limit reached.');
        }
    }
    resetSnooze() {
        this.model.resetSnoozeCount();
    }
    get time() {
        return this.model.time;
    }
    get day() {
        return this.model.day;
    }
}
exports.Alarm = Alarm;
