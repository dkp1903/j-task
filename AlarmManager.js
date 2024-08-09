"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmManager = void 0;
// AlarmManager.ts
const Alarm_1 = require("./Alarm");
const utils_1 = require("./utils");
const readlineSync = __importStar(require("readline-sync"));
class AlarmManager {
    constructor() {
        this.alarms = [];
    }
    addAlarm(time, day) {
        const alarm = new Alarm_1.Alarm(time, day);
        this.alarms.push(alarm);
        console.log(`Alarm set for ${day} at ${time}`);
    }
    deleteAlarm(time, day) {
        const initialLength = this.alarms.length;
        this.alarms = this.alarms.filter(alarm => !(alarm.time === time && alarm.day === day));
        if (this.alarms.length === initialLength) {
            console.log(`No alarm found for ${day} at ${time}`);
        }
        else {
            console.log(`Alarm for ${day} at ${time} deleted.`);
        }
    }
    viewAlarms() {
        if (this.alarms.length === 0) {
            console.log('No alarms set.');
        }
        else {
            console.log('Alarms:');
            this.alarms.forEach(alarm => {
                console.log(`- ${alarm.day} at ${alarm.time}`);
            });
        }
    }
    checkAlarms() {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        const currentDay = now.toLocaleString('en-us', { weekday: 'long' });
        this.alarms.forEach(alarm => {
            if (alarm.time === currentTime && alarm.day === currentDay) {
                console.log(`Alarm ringing for ${alarm.day} at ${alarm.time}`);
                this.handleAlarm(alarm);
            }
        });
    }
    handleAlarm(alarm) {
        const answer = readlineSync.question('Snooze the alarm? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            alarm.snooze();
        }
        else {
            console.log('Alarm dismissed.');
            alarm.resetSnooze();
        }
    }
    showMenu() {
        console.log(`
        Select an option:
        a) Set a new alarm
        b) Delete an alarm
        c) View alarms
        d) Display current time
        e) Exit
        `);
    }
    promptUser() {
        const choice = readlineSync.question('Enter your choice: ');
        switch (choice.toLowerCase()) {
            case 'a':
                const time = readlineSync.question('Enter alarm time (HH:MM): ');
                if (!(0, utils_1.isValidTimeFormat)(time)) {
                    console.log('Invalid time format. Please enter a valid time (HH:MM) between 00:00 and 23:59.');
                    this.promptUser();
                    return;
                }
                const day = readlineSync.question('Enter day of the week (e.g., Monday): ');
                if (!(0, utils_1.isValidDay)(day)) {
                    console.log('Invalid day. Please enter a correct day of the week.');
                    this.promptUser();
                    return;
                }
                this.addAlarm(time, day);
                this.promptUser();
                break;
            case 'b':
                const timeToDelete = readlineSync.question('Enter alarm time to delete (HH:MM): ');
                const dayToDelete = readlineSync.question('Enter day of the week (e.g., Monday): ');
                this.deleteAlarm(timeToDelete, dayToDelete);
                this.promptUser();
                break;
            case 'c':
                this.viewAlarms();
                this.promptUser();
                break;
            case 'd':
                this.displayCurrentTime();
                this.promptUser();
                break;
            case 'e':
                console.log('Exiting program...');
                process.exit();
                break;
            default:
                console.log('Invalid choice, please try again.');
                this.promptUser();
                break;
        }
    }
    start() {
        this.showMenu();
        this.promptUser();
        setInterval(() => {
            this.displayCurrentTime();
            this.checkAlarms();
        }, 60000); // Check every minute
    }
    displayCurrentTime() {
        const now = new Date();
        console.log(`Current time: ${now.toLocaleTimeString()}`);
    }
}
exports.AlarmManager = AlarmManager;
