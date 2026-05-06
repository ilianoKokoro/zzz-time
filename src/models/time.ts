export class Time {
    hour: number;
    minute: number;

    constructor(hour?: number, minute?: number) {
        if (hour !== undefined && minute !== undefined) {
            this.hour = hour;
            this.minute = minute;
        } else {
            this.hour = 0;
            this.minute = 0;
        }
    }

    public getSecondsUntilNext(): number {
        const now = new Date();

        const target = new Date(now);
        target.setHours(this.hour, this.minute, 0, 0);

        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }

        return Math.floor((target.getTime() - now.getTime()) / 1000);
    }
}
