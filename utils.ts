// utils.ts
export function isValidTimeFormat(time: string): boolean {
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

export function isValidDay(day: string): boolean {
    const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return validDays.includes(day);
}
