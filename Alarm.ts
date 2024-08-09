import { ModelAlarm } from './ModelAlarm';

export class Alarm {
    private model: ModelAlarm;

    constructor(time: string, day: string) {
        this.model = new ModelAlarm(time, day);
    }

    snooze(): void {
        if (this.model.snoozeCount < 3) {
            const [hour, minute] = this.model.time.split(':').map(Number);
            let newMinute = (minute + 5) % 60;
            let newHour = hour + Math.floor((minute + 5) / 60);
            newHour = newHour < 24 ? newHour : newHour - 24; // Adjust for 24-hour wraparound
            this.model.time = `${newHour}:${newMinute < 10 ? '0' : ''}${newMinute}`;
            this.model.incrementSnoozeCount();
            console.log(`Alarm snoozed to ${this.model.time}`);
        } else {
            console.log('Max snooze limit reached.');
        }
    }

    resetSnooze(): void {
        this.model.resetSnoozeCount();
    }

    get time(): string {
        return this.model.time;
    }

    get day(): string {
        return this.model.day;
    }
}
