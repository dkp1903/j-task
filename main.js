const readline = require('readline');

class Alarm {
    constructor(time, day) {
        this.time = time;  // Expected in 'HH:MM' 24-hour format
        this.day = day;    // Expected in 'Monday', 'Tuesday', etc.
        this.snoozeCount = 0;
    }

    snooze() {
        if (this.snoozeCount < 3) {
            const [hour, minute] = this.time.split(':').map(Number);
            const newMinute = minute + 5;
            this.time = `${hour}:${newMinute < 10 ? '0' : ''}${newMinute % 60}`;
            this.snoozeCount++;
            console.log(`Alarm snoozed to ${this.time}`);
        } else {
            console.log('Max snooze limit reached.');
        }
    }

    resetSnooze() {
        this.snoozeCount = 0;
    }
}

class AlarmClock {
    constructor() {
        this.alarms = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    displayCurrentTime() {
        const now = new Date();
        console.log(`Current time: ${now.toLocaleTimeString()}`);
    }

    addAlarm(time, day) {
        const alarm = new Alarm(time, day);
        this.alarms.push(alarm);
        console.log(`Alarm set for ${day} at ${time}`);
    }

    deleteAlarm(time, day) {
        this.alarms = this.alarms.filter(alarm => !(alarm.time === time && alarm.day === day));
        console.log(`Alarm for ${day} at ${time} deleted.`);
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
        this.rl.question('Snooze the alarm? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
                alarm.snooze();
            } else {
                console.log('Alarm dismissed.');
                alarm.resetSnooze();
            }
        });
    }

    start() {
        this.displayCurrentTime();
        this.addAlarm("09:00", "Friday");
        this.addAlarm("10:30", "Monday");

        setInterval(() => {
            this.displayCurrentTime();
            this.checkAlarms();
        }, 60000); // Check every minute
    }
}

const myAlarmClock = new AlarmClock();
myAlarmClock.start();
