export class Time {
    hour: number;
    minute: number;
    private timestamp?: number;

    constructor(hour?: number, minute?: number, timestamp?: number) {
        if (hour !== undefined && minute !== undefined) {
            this.hour = hour;
            this.minute = minute;
        } else {
            this.hour = 0;
            this.minute = 0;
        }

        this.timestamp = timestamp;
    }

    public getSecondsUntilNext(): number {
        const now = Date.now();

        if (this.timestamp !== undefined) {
            return Math.max(0, Math.floor((this.timestamp - now) / 1000));
        }

        const target = new Date(now);
        target.setHours(this.hour, this.minute, 0, 0);

        if (target.getTime() <= now) {
            target.setDate(target.getDate() + 1);
        }

        return Math.floor((target.getTime() - now) / 1000);
    }
}
