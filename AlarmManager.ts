// AlarmManager.ts
import { Alarm } from './Alarm';
import { isValidTimeFormat, isValidDay } from './utils';
import * as readlineSync from "readline-sync";

export class AlarmManager {
    private alarms: Alarm[] = [];

    addAlarm(time: string, day: string): void {
        const alarm = new Alarm(time, day);
        this.alarms.push(alarm);
        console.log(`Alarm set for ${day} at ${time}`);
    }

    deleteAlarm(time: string, day: string): void {
        const initialLength = this.alarms.length;
        this.alarms = this.alarms.filter(alarm => !(alarm.time === time && alarm.day === day));
        if (this.alarms.length === initialLength) {
            console.log(`No alarm found for ${day} at ${time}`);
        } else {
            console.log(`Alarm for ${day} at ${time} deleted.`);
        }
    }

    viewAlarms(): void {
        if (this.alarms.length === 0) {
            console.log('No alarms set.');
        } else {
            console.log('Alarms:');
            this.alarms.forEach(alarm => {
                console.log(`- ${alarm.day} at ${alarm.time}`);
            });
        }
    }

    checkAlarms(): void {
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

    handleAlarm(alarm: Alarm): void {
        const answer = readlineSync.question('Snooze the alarm? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            alarm.snooze();
        } else {
            console.log('Alarm dismissed.');
            alarm.resetSnooze();
        }
    }

    showMenu(): void {
        console.log(`
        Select an option:
        a) Set a new alarm
        b) Delete an alarm
        c) View alarms
        d) Display current time
        e) Exit
        `);
    }

    promptUser(): void {
        const choice = readlineSync.question('Enter your choice: ');
        switch (choice.toLowerCase()) {
            case 'a':
                const time = readlineSync.question('Enter alarm time (HH:MM): ');
                if (!isValidTimeFormat(time)) {
                    console.log('Invalid time format. Please enter a valid time (HH:MM) between 00:00 and 23:59.');
                    this.promptUser();
                    return;
                }
                const day = readlineSync.question('Enter day of the week (e.g., Monday): ');
                if (!isValidDay(day)) {
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

    start(): void {
        this.showMenu();
        this.promptUser();
        setInterval(() => {
            this.displayCurrentTime();
            this.checkAlarms();
        }, 60000); // Check every minute
    }

    displayCurrentTime(): void {
        const now = new Date();
        console.log(`Current time: ${now.toLocaleTimeString()}`);
    }
}
