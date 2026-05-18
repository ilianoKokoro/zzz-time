import { Time } from "@/models/time";

export function formatTime(time: Time): string {
    return [
        time.hour.toString().padStart(2, "0"),
        time.minute.toString().padStart(2, "0"),
    ].join(":");
}
