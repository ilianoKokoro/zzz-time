export class Time {
    hour: number;
    minute: number;

    constructor() {
        const today = new Date();
        this.hour = today.getHours();
        this.minute = today.getMinutes();
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
