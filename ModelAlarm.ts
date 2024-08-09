// ModelAlarm.ts
export class ModelAlarm {
    private _time: string;
    private _day: string;
    private _snoozeCount: number;

    constructor(time: string, day: string) {
        this._time = time;
        this._day = day;
        this._snoozeCount = 0;
    }

    get time(): string {
        return this._time;
    }

    set time(newTime: string) {
        this._time = newTime;
    }

    get day(): string {
        return this._day;
    }

    set day(newDay: string) {
        this._day = newDay;
    }

    get snoozeCount(): number {
        return this._snoozeCount;
    }

    incrementSnoozeCount(): void {
        if (this._snoozeCount < 3) {
            this._snoozeCount++;
        } else {
            console.log('Max snooze limit reached.');
        }
    }

    resetSnoozeCount(): void {
        this._snoozeCount = 0;
    }
}
